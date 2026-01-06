# GitHub Pages Deployment Setup

This project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

## 🚀 Automatic Deployment

Every push to the `main` branch triggers:
1. **Build**: Vite builds the production bundle
2. **Deploy**: Artifact is deployed to GitHub Pages
3. **Live**: Game is accessible at your GitHub Pages URL

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

### 3. Push to Main Branch

```bash
git add .
git commit -m "chore: setup GitHub Pages deployment"
git push origin main
```

### 4. Access Your Game

After the workflow completes (2-3 minutes), your game will be live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## 📋 Deployment Workflow

- **File**: `.github/workflows/deploy.yml`
- **Trigger**: Push to `main` branch or manual dispatch
- **Build Command**: `npm run build`
- **Output**: `dist/` folder

## 🔄 Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab on GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select `main` branch
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

- The workflow only runs on pushes to `main` branch
- Development branches won't trigger deployment
- First deployment may take 5-10 minutes
- Subsequent deployments are faster (2-3 minutes)
