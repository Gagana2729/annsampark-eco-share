# Fix GitHub Authentication Error

## Problem
You're getting this error:
```
remote: Permission to Gagana2729/annsampark-eco-share.git denied to urstrulysujal.
fatal: unable to access 'https://github.com/Gagana2729/annsampark-eco-share.git/': The requested URL returned error: 403
```

**Reason**: You're logged in as `urstrulysujal` but trying to push to `Gagana2729`'s repository.

---

## Solution Options

### Option 1: Use GitHub Desktop (EASIEST)

1. **Download GitHub Desktop** (if not installed):
   - Go to https://desktop.github.com/
   - Download and install

2. **Sign in with Gagana2729 account**:
   - Open GitHub Desktop
   - File → Options → Accounts
   - Sign out of current account
   - Sign in with Gagana2729 credentials

3. **Add Repository**:
   - File → Add Local Repository
   - Choose: `E:\git project\annsampark-eco-share`
   - Click "Add Repository"

4. **Push Changes**:
   - You'll see your commits
   - Click "Push origin"
   - Done! ✅

---

### Option 2: Use Personal Access Token

1. **Generate Token**:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name: "AnnSampark Push"
   - Select scopes: ✅ `repo` (all)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Push with Token**:
   ```bash
   git push https://YOUR_TOKEN@github.com/Gagana2729/annsampark-eco-share.git main
   ```
   Replace `YOUR_TOKEN` with the token you copied.

3. **Or Update Remote URL**:
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/Gagana2729/annsampark-eco-share.git
   git push origin main
   ```

---

### Option 3: Clear Git Credentials and Re-authenticate

1. **Clear Cached Credentials**:
   ```bash
   git credential-cache exit
   ```
   
   Or on Windows:
   - Open "Credential Manager" from Windows search
   - Go to "Windows Credentials"
   - Find any GitHub entries
   - Remove them

2. **Push Again** (it will ask for credentials):
   ```bash
   git push origin main
   ```
   
3. **Enter Gagana2729 credentials** when prompted

---

### Option 4: Change Git Config for This Repo

1. **Set user for this repository only**:
   ```bash
   cd "E:\git project\annsampark-eco-share"
   git config user.name "Gagana2729"
   git config user.email "gagana2729@example.com"
   ```

2. **Then push**:
   ```bash
   git push origin main
   ```

---

### Option 5: Fork and Push (Alternative)

If you don't have access to Gagana2729 account:

1. **Fork the repository** to your account (urstrulysujal)
2. **Change remote**:
   ```bash
   git remote set-url origin https://github.com/urstrulysujal/annsampark-eco-share.git
   ```
3. **Push**:
   ```bash
   git push origin main
   ```
4. **Create Pull Request** from your fork to Gagana2729's repo

---

## Quick Check: Which Account Am I Using?

```bash
git config user.name
git config user.email
```

To see global config:
```bash
git config --global user.name
git config --global user.email
```

---

## Recommended Solution

**Use GitHub Desktop** - it's the easiest way to manage multiple GitHub accounts and avoid authentication issues!

---

## After Successful Push

You should see:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/Gagana2729/annsampark-eco-share.git
   abc1234..def5678  main -> main
```

Then verify on GitHub.com! 🎉
