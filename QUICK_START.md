# Quick Start Guide

## ✅ What's Been Completed

Your NFC Flow Trigger app is now **fully functional** and ready for the Homey App Store!

### Fixed Issues:
1. ✅ App crash - Fixed API function signatures for SDK v3
2. ✅ Validation errors - Added required app store images
3. ✅ GitHub URLs - Updated to correct repository
4. ✅ CI/CD - Configured for automated releases with publish-level validation

### Current Status:
- **Repository**: https://github.com/kodalissri/com.NFC.FlowTrigger
- **Validation**: ✅ Passes at `publish` level
- **GitHub Actions**: ✅ Ready for automated releases

## 📝 Before First Release - Update These Values

### 1. App ID and Metadata
Edit `.homeycompose/app.json`:

```json
{
  "id": "com.yourdomain.nfc-flow-trigger",  // ⚠️ Change to your domain
  "author": {
    "name": "Your Name",                     // ⚠️ Add your name
    "email": "your.email@example.com"        // ⚠️ Add your email
  }
}
```

### 2. Package Name
Edit `package.json`:

```json
{
  "name": "com.yourdomain.nfc-flow-trigger",  // ⚠️ Match the app.json id
  "author": "Your Name"                        // ⚠️ Add your name
}
```

**Important**: The `id` in `app.json` must be unique in the Homey App Store. Use a domain you control (e.g., `com.kodalissri.nfc-flow-trigger`).

### 3. Rebuild After Changes

```bash
cd homey-nfc-flow-trigger
homey app build
homey app validate --level publish
git add .
git commit -m "chore: update app metadata with author info"
git push
```

## 🚀 Publishing to Homey App Store

### Step 1: Get Your Homey Token

1. Visit: https://tools.developer.homey.app/tools/tokens
2. Login with your Athom account
3. Click "Generate Token"
4. **Copy the token** (you won't see it again!)

### Step 2: Add Token to GitHub

1. Go to: https://github.com/kodalissri/com.NFC.FlowTrigger/settings/secrets/actions
2. Click "New repository secret"
3. Add:
   - **Name**: `HOMEY_TOKEN`
   - **Value**: [Paste your token]
4. Click "Add secret"

### Step 3: Create Your First Release

1. Go to: https://github.com/kodalissri/com.NFC.FlowTrigger/actions/workflows/release.yml
2. Click "Run workflow"
3. Fill in:
   - **Branch**: `main`
   - **Version type**: `patch` (will bump to 1.0.1)
   - **Changelog**:
     ```
     Initial release
     - NFC tag triggering via webhook
     - Tag configuration and management
     - Two flow trigger cards
     - Mobile phone integration
     ```
4. Click "Run workflow"

### What Happens Next

The GitHub Actions workflow will:
1. ✅ Bump version to 1.0.1
2. ✅ Update CHANGELOG.md
3. ✅ Update .homeychangelog.json for App Store
4. ✅ Build the app
5. ✅ Validate at publish level
6. ✅ Commit and tag the release
7. ✅ **Publish to Homey App Store**
8. ✅ Create GitHub release

## 🧪 Testing Locally

### Install on Your Homey

```bash
cd homey-nfc-flow-trigger
homey app install
```

### Check if Running

Open the Homey mobile app:
- Go to Settings → Apps
- Find "NFC Flow Trigger"
- Should show a running icon (not crashed)
- Click to open settings page

### Test the Webhook

1. Get your webhook URL from the app settings page
2. Test with curl:
   ```bash
   curl "https://YOUR-HOMEY-URL/api/app/com.yourdomain.nfc-flow-trigger/trigger?tag_id=test"
   ```
3. Should return: `{"success": true, ...}`

### Write NFC Tag

1. Install "NFC Tools" app on your phone (iOS/Android)
2. Create new task → Web Request
3. URL: `https://YOUR-HOMEY-URL/api/app/com.yourdomain.nfc-flow-trigger/trigger?tag_id=bedroom`
4. Write to NFC tag
5. Scan tag with phone → Should trigger flows!

## 📱 Creating Flows

### Example Flow 1: Turn on Lights

1. Create new Flow in Homey
2. **When**: NFC tag scanned → Select "Specific NFC tag scanned" → Choose "bedroom"
3. **Then**: Turn on bedroom lights

### Example Flow 2: Log All Scans

1. Create new Flow
2. **When**: NFC tag scanned (don't filter by ID)
3. **Then**: Create notification with text: "NFC tag {{tag_name}} ({{tag_id}}) was scanned"

## 🔧 Development Workflow

### Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... edit files ...

# Test locally
homey app build
homey app validate --level publish
homey app install

# Commit and push
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature

# Create pull request on GitHub
```

### Creating Releases

Just use the GitHub Actions workflow - no manual steps needed!

## 📚 Documentation

- **README.md** - App overview and features
- **DEPLOYMENT.md** - Detailed CI/CD guide
- **CONTRIBUTING.md** - Development guidelines
- **CHANGELOG.md** - Version history

## ⚠️ Important Notes

### App ID Must Be Unique
The `id` in `app.json` must be unique across the entire Homey App Store. Before publishing, make sure to:
1. Change `com.yourdomain.nfc-flow-trigger` to your own domain
2. Use reverse domain notation (e.g., `com.kodalissri.nfc-flow-trigger`)

### Homey API Permission
Your app uses `homey:manager:api` permission which requires more thorough review. This is normal and expected for webhook functionality.

## 🐛 Troubleshooting

### App Crashes on Homey
- ✅ Fixed! API signatures have been corrected
- Reinstall the app: `homey app install`

### Validation Fails
- Run: `homey app validate --level publish`
- Check the error messages
- All current validations pass ✅

### GitHub Actions Fail
- Check the workflow logs
- Verify `HOMEY_TOKEN` secret is set
- Ensure app validates locally first

## 🎯 You're Ready!

Everything is set up and working. Just:
1. Update app metadata (author, email, app ID)
2. Add `HOMEY_TOKEN` to GitHub secrets
3. Trigger a release workflow
4. Your app will be published to the Homey App Store!

Good luck with your app! 🚀
