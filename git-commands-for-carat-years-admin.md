# Git Commands to Fetch/Pull Updates for 'carat-years-admin' Only (Using Company Git)

## SSH Configuration Setup

Your SSH config (`~/.ssh/config` or `C:/Users/ASUS/.ssh/config`) is set up with:

- **Personal GitHub** (default): `github.com` → uses `id_ed25519_personal`
- **Company GitHub** (alias): `github-company` → uses `id_ed25519_company`

When setting up the company remote, use the `github-company` alias in the repository URL.

---

## Initial Setup: Adding Company Remote

If you haven't set up the company remote yet:

```powershell
# Add company remote using the SSH alias
git remote add company git@github-company:company-username/repository-name.git

# Verify the remote was added
git remote -v
```

**Example:**

```powershell
git remote add company git@github-company:your-company/carat-year.git
```

---

## PowerShell-Compatible Commands

### Quick One-Liner (Most Common Scenario)

If your repository is already set up and you just want the latest carat-years-admin files from company git:

```powershell
git fetch company; git checkout company/main -- carat-years-admin/
```

**Note:** In PowerShell, use `;` instead of `&&` to chain commands.

### Alternative PowerShell Syntax (if semicolon doesn't work)

```powershell
git fetch company
git checkout company/main -- carat-years-admin/
```

---

## Scenario 1: carat-years-admin is part of a monorepo (recommended approach)

### Option A: Fetch and checkout only carat-years-admin files

```powershell
# Fetch latest changes from company remote
git fetch company

# Pull and checkout only the carat-years-admin directory from remote branch
git checkout company/main -- carat-years-admin/
# OR if your branch is named differently (master, develop, etc.)
# git checkout company/master -- carat-years-admin/
# git checkout company/develop -- carat-years-admin/
```

### Option B: Using sparse checkout (if you want to work only with carat-years-admin)

```powershell
# Enable sparse checkout
git config core.sparseCheckout true

# Tell git to only track carat-years-admin directory
"carat-years-admin/*" | Out-File -FilePath .git/info/sparse-checkout -Encoding utf8

# Update working directory
git read-tree -m -u HEAD

# Then fetch and pull as usual
git fetch company
git pull company main
```

### Option C: Fetch specific path using git's partial checkout

```powershell
# Fetch all refs from company remote
git fetch company

# Checkout only the carat-years-admin directory from the remote branch
git checkout company/main -- carat-years-admin/
```

---

## Scenario 2: carat-years-admin is a separate git repository/submodule

```powershell
# Navigate to carat-years-admin directory
cd carat-years-admin

# Fetch latest changes from company remote
git fetch company

# Pull updates from remote (replace 'main' with your branch name if different)
git pull company main
```

---

## Scenario 3: If you need to initialize the repository first

```powershell
# If not already initialized, first initialize git
git init

# Add company remote repository using the SSH alias
# Replace 'company-username' and 'repository-name' with actual values
git remote add company git@github-company:company-username/repository-name.git

# Example:
# git remote add company git@github-company:your-company/carat-year.git

# Fetch from company remote
git fetch company

# Then use one of the methods above to get carat-years-admin only
```

### Updating Existing Remote to Use Company SSH

If you already have a remote but need to switch it to use the company SSH:

```powershell
# Remove existing remote (if needed)
git remote remove company

# Add company remote with SSH alias
git remote add company git@github-company:company-username/repository-name.git

# Or update existing remote URL
git remote set-url company git@github-company:company-username/repository-name.git
```

---

## Bash/Unix Commands (for reference)

If you're using Git Bash or a Unix-like terminal:

```bash
git fetch company && git checkout company/main -- carat-years-admin/
```

---

**Important Notes:**

- Replace `main` with your actual branch name (could be `master`, `develop`, etc.)
- All commands use `company` remote instead of `origin`
- PowerShell uses `;` for command chaining, not `&&`
- **Use `git@github-company:` instead of `git@github.com:`** in repository URLs to use the company SSH key
- The SSH alias `github-company` automatically uses `id_ed25519_company` key for authentication
