-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('donor', 'receiver', 'admin');

-- Create enum for donation status
CREATE TYPE public.donation_status AS ENUM ('available', 'claimed', 'completed', 'expired');

-- Create enum for item condition
CREATE TYPE public.item_condition AS ENUM ('new', 'like_new', 'good', 'fair');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create food_donations table
CREATE TABLE public.food_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  quantity TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  expire_at TIMESTAMPTZ NOT NULL,
  status donation_status NOT NULL DEFAULT 'available',
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create book_donations table
CREATE TABLE public.book_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  condition item_condition NOT NULL DEFAULT 'good',
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  description TEXT,
  image_url TEXT,
  status donation_status NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create cloth_donations table
CREATE TABLE public.cloth_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  size TEXT,
  gender TEXT,
  condition item_condition NOT NULL DEFAULT 'good',
  category TEXT,
  image_url TEXT,
  status donation_status NOT NULL DEFAULT 'available',
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cloth_donations ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  
  -- Add default role from metadata or default to 'donor'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'donor')
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_food_donations_updated_at
  BEFORE UPDATE ON public.food_donations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_book_donations_updated_at
  BEFORE UPDATE ON public.book_donations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cloth_donations_updated_at
  BEFORE UPDATE ON public.cloth_donations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view all roles"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for food_donations
CREATE POLICY "Anyone can view available food donations"
  ON public.food_donations FOR SELECT
  USING (status = 'available' OR donor_id = auth.uid() OR receiver_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Donors can create food donations"
  ON public.food_donations FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'donor') AND donor_id = auth.uid());

CREATE POLICY "Donors can update own donations"
  ON public.food_donations FOR UPDATE
  USING (donor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Receivers can claim donations"
  ON public.food_donations FOR UPDATE
  USING (public.has_role(auth.uid(), 'receiver') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for book_donations
CREATE POLICY "Anyone can view available books"
  ON public.book_donations FOR SELECT
  USING (status = 'available' OR donor_id = auth.uid() OR buyer_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Donors can create book donations"
  ON public.book_donations FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'donor') AND donor_id = auth.uid());

CREATE POLICY "Donors can update own book donations"
  ON public.book_donations FOR UPDATE
  USING (donor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for cloth_donations
CREATE POLICY "Anyone can view available clothes"
  ON public.cloth_donations FOR SELECT
  USING (status = 'available' OR donor_id = auth.uid() OR receiver_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Donors can create cloth donations"
  ON public.cloth_donations FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'donor') AND donor_id = auth.uid());

CREATE POLICY "Donors can update own cloth donations"
  ON public.cloth_donations FOR UPDATE
  USING (donor_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Create indexes for better performance
CREATE INDEX idx_food_donations_status ON public.food_donations(status);
CREATE INDEX idx_food_donations_donor ON public.food_donations(donor_id);
CREATE INDEX idx_food_donations_receiver ON public.food_donations(receiver_id);
CREATE INDEX idx_food_donations_expire ON public.food_donations(expire_at);

CREATE INDEX idx_book_donations_status ON public.book_donations(status);
CREATE INDEX idx_book_donations_donor ON public.book_donations(donor_id);
CREATE INDEX idx_book_donations_genre ON public.book_donations(genre);

CREATE INDEX idx_cloth_donations_status ON public.cloth_donations(status);
CREATE INDEX idx_cloth_donations_donor ON public.cloth_donations(donor_id);

CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);