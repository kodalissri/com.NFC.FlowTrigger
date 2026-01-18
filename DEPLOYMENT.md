# Deployment Guide

This guide explains how to deploy the NFC Flow Trigger app using GitHub Actions.

## Prerequisites

### 1. GitHub Repository Setup

1. **Create a GitHub repository** (if not already done):
   ```bash
   # In your project directory
   git remote add origin https://github.com/yourusername/homey-nfc-flow-trigger.git
   git branch -M main
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

### 2. Get Homey Authentication Token

1. Go to [Homey Developer Tools](https://tools.developer.homey.app/tools/tokens)
2. Log in with your Athom account
3. Click "Generate Token"
4. Copy the generated token (you won't see it again!)

### 3. Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `HOMEY_TOKEN`
   - **Value**: Paste your Homey authentication token
5. Click **Add secret**

## Automated Deployment Workflow

### How It Works

The deployment is triggered manually through GitHub Actions with these steps:

1. **Version Bump** - Automatically updates version numbers
2. **Changelog Update** - Adds your changelog entry to documentation
3. **Build & Validate** - Ensures app builds correctly
4. **Publish** - Uploads to Homey App Store
5. **GitHub Release** - Creates a GitHub release with notes

### Triggering a Release

1. **Navigate to Actions Tab**
   - Go to your GitHub repository
   - Click on the **Actions** tab

2. **Select Release Workflow**
   - Click on **Release and Publish** workflow in the left sidebar

3. **Run Workflow**
   - Click **Run workflow** button (top right)
   - Fill in the form:
     - **Branch**: Select `main` (or your default branch)
     - **Version bump type**: Choose one:
       - `patch` - Bug fixes (1.0.0 → 1.0.1)
       - `minor` - New features (1.0.0 → 1.1.0)
       - `major` - Breaking changes (1.0.0 → 2.0.0)
     - **Changelog entry**: Describe what changed
       ```
       Example:
       - Fixed webhook timeout issue
       - Added support for multiple tag formats
       - Improved error handling in settings page
       ```
   - Click **Run workflow**

4. **Monitor Progress**
   - Watch the workflow run in real-time
   - Check for any errors
   - Verify successful completion

### Example Release Workflow Run

```
Input:
  Version type: minor
  Changelog: Added tag import/export feature and improved UI responsiveness

Result:
  ✓ Version bumped: 1.0.0 → 1.1.0
  ✓ Changelog updated
  ✓ App built and validated
  ✓ Published to Homey App Store
  ✓ GitHub release created: v1.1.0
```

## What Gets Updated

When you trigger a release, these files are automatically updated:

1. **package.json**
   - Version number bumped

2. **package-lock.json**
   - Version number synchronized

3. **.homeycompose/app.json**
   - Version number updated

4. **CHANGELOG.md**
   - New entry added with date and changes

5. **.homeychangelog.json**
   - New version entry for Homey App Store

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

### 1. Update Version

```bash
# Bump version
npm version patch  # or minor, or major

# Update .homeycompose/app.json manually
```

### 2. Update Changelogs

Edit `CHANGELOG.md` and `.homeychangelog.json` manually.

### 3. Build and Validate

```bash
homey app build
homey app validate
```

### 4. Login to Homey

```bash
homey login
```

### 5. Publish

```bash
homey app publish
```

### 6. Create Git Tag

```bash
git add .
git commit -m "chore: release v1.0.1"
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin main
git push origin v1.0.1
```

## Continuous Integration

### Validation on Pull Requests

Every PR automatically runs:
- Dependency installation
- App build
- App validation
- Linting (if configured)

This ensures code quality before merging.

### Branch Protection (Recommended)

Set up branch protection rules:

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✓ Require status checks to pass
   - ✓ Require branches to be up to date
   - Select: **Validate Homey App**

## Troubleshooting

### Build Fails

**Error**: `App did not validate`
- Check validation errors in workflow logs
- Fix issues locally with `homey app validate`
- Push fixes and re-run workflow

### Authentication Fails

**Error**: `Authentication failed`
- Verify `HOMEY_TOKEN` secret is set correctly
- Token may have expired - generate a new one
- Update the secret in GitHub Settings

### Version Conflict

**Error**: `Version already exists`
- You may have already published this version
- Choose a higher version bump type
- Or manually set version to next available

### Publish Fails

**Error**: `Failed to publish to App Store`
- Check Homey developer account status
- Ensure app ID is unique
- Verify all required fields in manifest
- Check Homey App Store guidelines

## Best Practices

1. **Test Locally First**
   - Always test changes with `homey app run`
   - Validate before pushing with `homey app validate`

2. **Meaningful Changelogs**
   - Be specific about what changed
   - Use bullet points for multiple changes
   - Include breaking changes prominently

3. **Version Appropriately**
   - Patch: Bug fixes only
   - Minor: New features, backward compatible
   - Major: Breaking changes

4. **Review Before Release**
   - Check all changed files
   - Verify changelog accuracy
   - Ensure version bump is correct

5. **Monitor After Release**
   - Check Homey App Store listing
   - Watch for user feedback
   - Monitor error reports

## Release Checklist

Before triggering a release:

- [ ] All changes tested locally
- [ ] App builds successfully
- [ ] App validates without errors
- [ ] Tested on actual Homey device
- [ ] README updated (if needed)
- [ ] Breaking changes documented
- [ ] Changelog entry prepared
- [ ] Version bump type decided
- [ ] GitHub secrets configured

## Getting Help

- **GitHub Actions Logs** - Check workflow run details
- **Homey CLI Docs** - https://apps.developer.homey.app/
- **Homey Community** - https://community.homey.app/
- **GitHub Issues** - Report problems in repository
