# Trusted Web Activity (TWA) Configuration

This directory contains the Bubblewrap configuration for generating an Android project that packages the Science Quiz web app as a Trusted Web Activity.

## Overview

The TWA configuration targets the production web origin:
**`https://sciquiztn-knowledgebyte.in`**

The Android project generated from this configuration will use the existing PWA manifest at `frontend/public/manifest.webmanifest` without modifying its `start_url` or `scope`.

## Configuration File

- **`twa-manifest.json`**: Bubblewrap configuration file that defines the Android project settings, package name, app identity, and web origin.

## Generated Android Project

When you run the Bubblewrap initialization and build commands (see `frontend/PLAY_STORE_TWA_PUBLISHING_GUIDE.md`), an Android project will be generated locally in:

