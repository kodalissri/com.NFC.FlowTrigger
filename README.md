# NFC Flow Trigger for Homey Pro

Trigger Homey flows by scanning NFC tags with your mobile phone. This app creates a webhook endpoint that can be triggered by NFC-enabled smartphones.

## Features

- 🏷️ **Manage NFC Tags**: Configure and name your NFC tags in the app settings
- 📱 **Mobile Phone Integration**: Use your smartphone to scan NFC tags
- 🔄 **Flow Cards**: Two trigger cards to create automations
  - "NFC tag scanned" - Triggers for any tag (with optional filter)
  - "Specific NFC tag scanned" - Triggers for a specific configured tag
- 🔗 **Webhook API**: Public API endpoint for triggering from NFC apps
- 💾 **Tag Storage**: Store tag IDs with friendly names

## Installation

### Option 1: Install from Homey App Store
1. Search for "NFC Flow Trigger" in the Homey App Store
2. Click Install

### Option 2: Install from CLI (Development)
1. Clone or download this repository
2. Install Homey CLI: `npm install -g homey`
3. Navigate to the app directory
4. Run `homey app install`

## Setup Guide

### 1. Configure the App

1. Open the Homey app
2. Go to Settings → Apps → NFC Flow Trigger
3. Copy the webhook URL shown at the top

### 2. Setup NFC Tags with Your Phone

#### For Android:
1. Install **NFC Tools** or **Trigger** app from Play Store
2. Open the app and create a new NFC task
3. Select "Web Request" or "URL" action
4. Enter the webhook URL with your tag ID:
   ```
   https://YOUR-HOMEY-URL/api/app/com.yourdomain.nfc-flow-trigger/trigger?tag_id=bedroom
   ```
5. Write this to your NFC tag by holding your phone to it

#### For iOS:
1. Install **NFC Tools** from the App Store
2. Go to "Write" tab
3. Add a record → URL/URI
4. Enter the webhook URL with your tag ID
5. Tap "Write" and hold your phone to the NFC tag

### 3. Configure Tags in Homey

1. In the app settings, scroll to "Configured NFC Tags"
2. Enter the Tag ID (e.g., "bedroom")
3. Enter a friendly name (e.g., "Bedroom")
4. Click "Add Tag"

### 4. Create Flows

1. Create a new Flow in Homey
2. Add a trigger card:
   - **"NFC tag scanned"** - Triggers for any tag
   - **"Specific NFC tag scanned"** - Select a specific configured tag
3. Add your desired actions

## Flow Card Examples

### Example 1: Turn on lights when bedroom tag is scanned
- **When**: Specific NFC tag scanned (Bedroom)
- **Then**: Turn on bedroom lights

### Example 2: Log all NFC scans
- **When**: NFC tag scanned
- **Then**: Create notification with tag name

### Example 3: Different actions for different tags
Create multiple flows with "Specific NFC tag scanned" trigger, each configured for a different tag.

## Webhook API

### Trigger Endpoint
```
POST/GET https://YOUR-HOMEY-URL/api/app/com.yourdomain.nfc-flow-trigger/trigger
```

**Parameters:**
- `tag_id` (required): The ID of the NFC tag

**Example:**
```bash
curl "https://YOUR-HOMEY-URL/api/app/com.yourdomain.nfc-flow-trigger/trigger?tag_id=bedroom"
```

**Response:**
```json
{
  "success": true,
  "message": "Tag bedroom triggered successfully",
  "data": {
    "success": true,
    "tag_id": "bedroom",
    "tag_name": "Bedroom"
  }
}
```

## Flow Tokens

Both trigger cards provide these tokens:

- **Tag ID**: The unique identifier of the scanned tag
- **Tag Name**: The friendly name configured in settings (or "Unknown Tag")

## Troubleshooting

### Tag not triggering flows?
- Verify the webhook URL is correct
- Check that the tag ID in the NFC tag matches the configuration
- Ensure your Homey is accessible from your network
- Check the app logs in Homey

### Can't access webhook URL?
- Make sure Homey is connected to your network
- If using Homey Cloud, the URL should work anywhere
- For local Homey, ensure your phone is on the same network

### NFC tag not writing?
- Make sure your phone supports NFC and it's enabled
- Hold the phone steady on the tag for a few seconds
- Try a different NFC app if one doesn't work

## Privacy & Security

- The webhook endpoint is public to allow NFC tag triggers
- Only triggers flows, doesn't expose other Homey data
- Consider using unique, random tag IDs for better security

## Support

For issues, questions, or feature requests, please visit:
[Your support URL or GitHub issues page]

## Changelog

### v1.0.0 (Initial Release)
- NFC tag triggering via webhook
- Tag configuration and management
- Two flow trigger cards
- Settings page for tag management

## License

MIT License - See LICENSE file for details

## Author

Your Name - your.email@example.com
