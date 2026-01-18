# GitHub Actions Setup Guide

## Quick Setup Steps

### 1. Get Your Homey Token

1. Visit: https://tools.developer.homey.app/tools/tokens
2. Login with your Athom account
3. Click "Generate Token"
4. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### 2. Add Token to GitHub

1. Go to your repository on GitHub
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Enter:
   - **Name**: `HOMEY_TOKEN`
   - **Value**: [Paste your token here]
5. Click **"Add secret"**

### 3. You're Ready!

Now you can:
- **Automatic validation** on every push and PR
- **One-click releases** with version bumping and changelog

## How to Release

1. Go to **Actions** tab in your repository
2. Click **"Release and Publish"** workflow
3. Click **"Run workflow"**
4. Fill in:
   - **Version type**: patch/minor/major
   - **Changelog**: What changed in this release
5. Click **"Run workflow"**

That's it! The workflow will:
- ✓ Bump version
- ✓ Update changelog
- ✓ Build & validate
- ✓ Publish to Homey App Store
- ✓ Create GitHub release

## Need Help?

See the full [DEPLOYMENT.md](../../DEPLOYMENT.md) guide for detailed instructions.
