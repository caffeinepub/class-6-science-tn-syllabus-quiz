# Google Play Store Publishing Guide (TWA/Bubblewrap)

This guide explains how to publish the Science Quiz App to the Google Play Store using a **Trusted Web Activity (TWA)** via **Bubblewrap**.

## What is a TWA?

A Trusted Web Activity (TWA) is a way to package your existing web app (`https://sciquiztn-knowledgebyte.in`) as a native Android app without rewriting it. The app opens your website in a full-screen Chrome Custom Tab with no browser UI, making it feel like a native app.

## Prerequisites

Before you begin, ensure you have:

### 1. Software Requirements

- **Node.js** (v16 or higher): [Download here](https://nodejs.org/)
- **Java Development Kit (JDK)** 11 or higher: [Download here](https://adoptium.net/)
- **Android SDK** (via Android Studio): [Download here](https://developer.android.com/studio)

### 2. Accounts & Fees

- **Google Play Developer Account**: [Sign up here](https://play.google.com/console/signup)
  - One-time registration fee: $25 USD (~₹2,000 INR)
  - Required for publishing any app to the Play Store

### 3. Domain & App

- Your web app must be live at: `https://sciquiztn-knowledgebyte.in`
- HTTPS is required (HTTP will not work)

## Step 1: Install Bubblewrap

Bubblewrap is Google's official tool for creating TWAs.

