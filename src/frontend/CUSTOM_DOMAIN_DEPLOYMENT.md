# Custom Domain Deployment Guide

This document describes how to deploy the Science Quiz App using the custom domain **sciquiztn-knowledgebyte.in**.

## Overview

The app is configured to be accessible via the custom domain `https://sciquiztn-knowledgebyte.in` instead of the default Internet Computer canister URL.

## Configuration File Location

The custom domain is configured in:

**`frontend/public/.well-known/ic-domains`**

This file contains exactly one line with the full domain name:
