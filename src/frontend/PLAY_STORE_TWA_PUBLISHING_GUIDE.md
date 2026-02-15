# Google Play Store Publishing Guide (TWA/Bubblewrap)

This comprehensive guide explains how to publish the Science Quiz App to the Google Play Store using a **Trusted Web Activity (TWA)** via **Bubblewrap**.

## What is a TWA?

A Trusted Web Activity (TWA) is a way to package your existing web app as a native Android app without rewriting it. The app opens your website in a full-screen Chrome Custom Tab with no browser UI, making it feel like a native app.

**Production Web Origin:** `https://sciquiztn-knowledgebyte.in`

This custom domain is configured for Internet Computer hosting. See `frontend/CUSTOM_DOMAIN_DEPLOYMENT.md` and `frontend/public/.well-known/ic-domains` for domain verification details.

---

## Prerequisites

Before you begin, ensure you have:

### 1. Software Requirements

- **Node.js** (v16 or higher): [Download here](https://nodejs.org/)
- **Java Development Kit (JDK)** 11 or higher: [Download here](https://adoptium.net/)
- **Android SDK** (via Android Studio): [Download here](https://developer.android.com/studio)
  - After installing Android Studio, open SDK Manager and ensure you have:
    - Android SDK Build-Tools (latest version)
    - Android SDK Platform-Tools
    - Android SDK Command-line Tools
  - **Set environment variable:**
    ```bash
    export ANDROID_HOME=~/Android/Sdk  # Linux/Mac
    # or
    export ANDROID_SDK_ROOT=~/Android/Sdk
    ```
    On Windows:
    ```cmd
    set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
    ```
- **jq** (JSON processor): Required for manifest generation
  ```bash
  # Ubuntu/Debian
  sudo apt-get install jq
  
  # macOS
  brew install jq
  
  # Windows (via Chocolatey)
  choco install jq
  ```

### 2. Accounts & Fees

- **Google Play Developer Account**: [Sign up here](https://play.google.com/console/signup)
  - One-time registration fee: $25 USD (~₹2,000 INR)
  - Required for publishing any app to the Play Store
  - Account approval can take 24-48 hours

### 3. Domain & App

- Your web app must be live at: **`https://sciquiztn-knowledgebyte.in`**
- HTTPS is required (HTTP will not work)
- Verify the app is accessible and functional at this URL before proceeding

### 4. Web/PWA Assets Checklist

Before packaging your TWA, ensure these assets are in place:

- ✅ **PWA Manifest** (`frontend/public/manifest.webmanifest`) - defines app identity, icons, colors
  - **IMPORTANT:** `start_url` and `scope` must remain `https://sciquiztn-knowledgebyte.in/`
  - This is the source of truth for the TWA configuration
- ✅ **App Icons** - 512×512px icon at `frontend/public/assets/generated/playstore-icon.dim_512x512.png`
- ✅ **Digital Asset Links** (`frontend/public/.well-known/assetlinks.json`) - for TWA verification
- ✅ **Custom Domain Verification** (`frontend/public/.well-known/ic-domains`) - for IC hosting

All these files are included in this repository and will be deployed with your app.

---

## Quick Start: One-Command AAB Build

This repository includes a pre-configured Bubblewrap/TWA setup and a single script to build your release AAB.

### Step 1: Generate Your Signing Key (First Time Only)

If you don't already have a keystore file, generate one:

