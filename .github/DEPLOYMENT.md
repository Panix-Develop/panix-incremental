# GitHub Pages Deployment Setup

This project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

## 🚀 Automatic Deployment

Every push to a `release/**` branch triggers:
1. **Build**: Vite builds the production bundle
2. **Deploy**: Artifact is deployed to GitHub Pages
3. **Live**: Game is accessible at your GitHub Pages URL

**Release Branch Format**: `release/vX.Y.Z`
- Example: `release/v1.0.0`, `release/v2.0.0`

## 🔧 Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. Save the settings

### 2. Update Base Path (if needed)

If your repository name is **not** `panix-incremental`, update `vite.config.js`:

```javascript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

Replace `YOUR-REPO-NAME` with your actual repository name.

### 3. Push to Release Branch

After completing a phase, create and push a release branch:

```bash
# Create release branch
git checkout -b release/v1.0.0

# Push to trigger deployment
git push origin release/v1.0.0

# Tag the release
git tag v1.0.0
git push origin v1.0.0
```

### 4. Access Your Game

After the workflow completes (2-3 minutes), your game will be live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## 📋 Deployment Workflow

- **File**: `.github/workflows/deploy.yml`
- **Trigger**: Push to `release/**` branch or manual dispatch
- **Build Command**: `npm run build`
- **Output**: `dist/` folder

## 🔄 Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab on GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select a `release/*` branch
5. Click "Run workflow"

## 🧪 Testing Locally

Before pushing, test the production build locally:

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

The preview will run at `http://localhost:4173/panix-incremental/`

## 🛠️ Troubleshooting

### Deployment Failed

- Check the **Actions** tab for error logs
- Ensure `npm ci` and `npm run build` work locally
- Verify repository permissions are set correctly

### 404 on Deployed Site

- Check the `base` path in `vite.config.js` matches your repo name
- Ensure assets are loading from correct paths
- Wait 5-10 minutes for DNS propagation

### Assets Not Loading

- Verify `base` is set correctly in `vite.config.js`
- Check browser console for 404 errors
- Ensure all asset imports use relative paths

## 📝 Notes

- The workflow only runs on pushes to `release/**` branches
- Development and task branches won't trigger deployment
- First deployment may take 5-10 minutes
- Subsequent deployments are faster (2-3 minutes)

## 🔀 Git Workflow

### Task Branches
Create a branch for each completed task:
```bash
git checkout -b task/1.1-fix-scrolling
# ... make changes ...
git commit -m "fix(ui): resolve scrolling issues in crafting panel"
git push origin task/1.1-fix-scrolling
```

### Release Branches
After completing a full phase:
```bash
# Merge all task branches into feature branch
git checkout feature/stage-2-enhancements
git merge task/1.1-fix-scrolling
git merge task/1.2-drone-deployment
# ... etc

# Create release branch
git checkout -b release/v2.0.0
git push origin release/v2.0.0

# Tag the release
git tag v2.0.0
git push origin v2.0.0
```

### Pre-Commit Checklist
Before committing any code:
- ✅ Run `npm run test` - ensure NO errors
- ✅ Verify 70%+ test coverage (if tests exist)
- ✅ Check for linting/compilation errors
- ✅ Test functionality manually
- ✅ Only commit error-free code
