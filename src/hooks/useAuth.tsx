import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services';

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  phone?: string;
  address?: any;
  organizationName?: string;
  verified: boolean;
  impactScore: number;
}

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, role: string, organizationName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          // Verify token is still valid by fetching user
          const response = await authService.getMe();
          const userData = response.data;
          setUser(userData);
          setUserRole(userData.role);
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          setUser(null);
          setUserRole(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      const { user: userData, token, refreshToken } = response.data;

      // Store tokens and user
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setUserRole(userData.role);

      return { error: null };
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || 'Login failed'
        }
      };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: string,
    organizationName?: string
  ) => {
    try {
      const response = await authService.register({
        email,
        password,
        fullName,
        role,
        organizationName,
      });
      const { user: userData, token, refreshToken } = response.data;

      // Store tokens and user
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setUserRole(userData.role);

      return { error: null };
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.message || 'Registration failed'
        }
      };
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      setUser(null);
      setUserRole(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

