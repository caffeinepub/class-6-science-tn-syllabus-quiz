#!/bin/bash
set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   SciQuiz TN - Android AAB Release Build Script${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

# Change to frontend directory
cd "$(dirname "$0")/.."
echo -e "${GREEN}✓${NC} Working directory: $(pwd)"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 0: Questions Integrity Check
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 0: Running questions integrity check...${NC}"
echo ""

if ! node scripts/check-questions-integrity.ts; then
  echo ""
  echo -e "${RED}════════════════════════════════════════════════════════${NC}"
  echo -e "${RED}   ❌ QUESTIONS INTEGRITY CHECK FAILED${NC}"
  echo -e "${RED}════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "${YELLOW}The question data files contain errors that must be fixed before building.${NC}"
  echo ""
  echo -e "${YELLOW}Please review the error messages above and fix the indicated issues in:${NC}"
  echo -e "  • frontend/src/data/questions.js (Class 6)"
  echo -e "  • frontend/src/data/questions_class7.js (Class 7)"
  echo -e "  • frontend/src/data/questions_class8.js (Class 8)"
  echo -e "  • frontend/src/data/questions_class9.js (Class 9)"
  echo -e "  • frontend/src/data/questions_class10.js (Class 10)"
  echo ""
  echo -e "${YELLOW}After fixing the errors, run this script again.${NC}"
  echo ""
  exit 1
fi

echo ""
echo -e "${GREEN}✓${NC} Questions integrity check passed!"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 1: Prerequisites Check
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"
echo ""

# Check for required commands
MISSING_DEPS=()

if ! command -v node &> /dev/null; then
  MISSING_DEPS+=("node")
fi

if ! command -v npm &> /dev/null; then
  MISSING_DEPS+=("npm")
fi

if ! command -v bubblewrap &> /dev/null; then
  MISSING_DEPS+=("bubblewrap")
fi

if ! command -v jq &> /dev/null; then
  MISSING_DEPS+=("jq")
fi

if [ ${#MISSING_DEPS[@]} -ne 0 ]; then
  echo -e "${RED}✗ Missing required dependencies:${NC}"
  for dep in "${MISSING_DEPS[@]}"; do
    echo -e "  - $dep"
  done
  echo ""
  echo -e "${YELLOW}Please install missing dependencies:${NC}"
  echo "  • Node.js: https://nodejs.org/"
  echo "  • npm: (included with Node.js)"
  echo "  • Bubblewrap: npm install -g @bubblewrap/cli"
  echo "  • jq: https://stedolan.github.io/jq/download/"
  echo ""
  exit 1
fi

echo -e "${GREEN}✓${NC} All prerequisites installed"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 2: Version Input
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 2: Version configuration${NC}"
echo ""

read -p "Enter version name (e.g., 1.0.0): " VERSION_NAME
if [ -z "$VERSION_NAME" ]; then
  echo -e "${RED}✗ Version name is required${NC}"
  exit 1
fi

read -p "Enter version code (integer, e.g., 1): " VERSION_CODE
if [ -z "$VERSION_CODE" ]; then
  echo -e "${RED}✗ Version code is required${NC}"
  exit 1
fi

# Validate version code is a number
if ! [[ "$VERSION_CODE" =~ ^[0-9]+$ ]]; then
  echo -e "${RED}✗ Version code must be an integer${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✓${NC} Version: $VERSION_NAME (code: $VERSION_CODE)"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 3: Signing Configuration
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 3: Signing configuration${NC}"
echo ""

read -p "Enter path to keystore file: " KEYSTORE_PATH
if [ ! -f "$KEYSTORE_PATH" ]; then
  echo -e "${RED}✗ Keystore file not found: $KEYSTORE_PATH${NC}"
  exit 1
fi

read -p "Enter keystore password: " -s KEYSTORE_PASSWORD
echo ""
if [ -z "$KEYSTORE_PASSWORD" ]; then
  echo -e "${RED}✗ Keystore password is required${NC}"
  exit 1
fi

read -p "Enter key alias: " KEY_ALIAS
if [ -z "$KEY_ALIAS" ]; then
  echo -e "${RED}✗ Key alias is required${NC}"
  exit 1
fi

read -p "Enter key password: " -s KEY_PASSWORD
echo ""
if [ -z "$KEY_PASSWORD" ]; then
  echo -e "${RED}✗ Key password is required${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✓${NC} Signing configuration validated"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 4: Generate Temporary Manifest
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 4: Generating temporary manifest...${NC}"
echo ""

TEMP_MANIFEST="twa/twa-manifest.temp.json"

# Read base manifest and update version fields
jq --arg vname "$VERSION_NAME" --arg vcode "$VERSION_CODE" \
  '.versionName = $vname | .versionCode = ($vcode | tonumber)' \
  twa/twa-manifest.json > "$TEMP_MANIFEST"

echo -e "${GREEN}✓${NC} Temporary manifest created: $TEMP_MANIFEST"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 5: Bubblewrap Init
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 5: Initializing Bubblewrap project...${NC}"
echo ""

# Remove old Android project if exists
if [ -d "twa/android-project" ]; then
  echo "Removing old Android project..."
  rm -rf twa/android-project
fi

# Run bubblewrap init with temporary manifest
bubblewrap init --manifest="$TEMP_MANIFEST"

echo ""
echo -e "${GREEN}✓${NC} Bubblewrap project initialized"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 6: Build Signed Release AAB
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 6: Building signed release AAB...${NC}"
echo ""

bubblewrap build \
  --signingKeyPath="$KEYSTORE_PATH" \
  --signingKeyAlias="$KEY_ALIAS" \
  --signingKeyStorePassword="$KEYSTORE_PASSWORD" \
  --signingKeyPassword="$KEY_PASSWORD"

echo ""
echo -e "${GREEN}✓${NC} AAB build completed"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 7: Locate and Display AAB Path
# ═══════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}Step 7: Locating AAB file...${NC}"
echo ""

AAB_FILE=$(find twa/android-project -name "*.aab" | head -n 1)

if [ -z "$AAB_FILE" ]; then
  echo -e "${RED}✗ AAB file not found${NC}"
  exit 1
fi

AAB_ABSOLUTE_PATH=$(realpath "$AAB_FILE")

echo -e "${GREEN}✓${NC} AAB file created successfully!"
echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   ✓ BUILD SUCCESSFUL${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}AAB Location:${NC}"
echo -e "  $AAB_ABSOLUTE_PATH"
echo ""

# ═══════════════════════════════════════════════════════════════════════════
# STEP 8: Optional - Extract SHA-256 and Update assetlinks.json
# ═══════════════════════════════════════════════════════════════════════════
echo ""
read -p "Do you want to extract SHA-256 fingerprint and update assetlinks.json? (y/n): " UPDATE_ASSETLINKS

if [[ "$UPDATE_ASSETLINKS" =~ ^[Yy]$ ]]; then
  echo ""
  echo -e "${BLUE}Step 8: Extracting SHA-256 fingerprint...${NC}"
  echo ""
  
  # Extract package name from temporary manifest
  PACKAGE_NAME=$(jq -r '.packageId' "$TEMP_MANIFEST")
  
  # Extract SHA-256 fingerprint
  SHA256_FINGERPRINT=$(keytool -list -v -keystore "$KEYSTORE_PATH" -alias "$KEY_ALIAS" -storepass "$KEYSTORE_PASSWORD" 2>/dev/null | grep "SHA256:" | awk '{print $2}')
  
  if [ -z "$SHA256_FINGERPRINT" ]; then
    echo -e "${RED}✗ Failed to extract SHA-256 fingerprint${NC}"
  else
    echo -e "${GREEN}✓${NC} SHA-256 Fingerprint: $SHA256_FINGERPRINT"
    echo ""
    
    # Update assetlinks.json
    ASSETLINKS_FILE="public/.well-known/assetlinks.json"
    
    if [ -f "$ASSETLINKS_FILE" ]; then
      echo "Updating $ASSETLINKS_FILE..."
      
      # Create updated assetlinks.json
      cat > "$ASSETLINKS_FILE" << EOF
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "$PACKAGE_NAME",
    "sha256_cert_fingerprints": ["$SHA256_FINGERPRINT"]
  }
}]
EOF
      
      echo -e "${GREEN}✓${NC} assetlinks.json updated successfully"
      echo ""
      echo -e "${YELLOW}Important:${NC} Deploy the updated assetlinks.json to your production domain:"
      echo "  https://sciquiztn-knowledgebyte.in/.well-known/assetlinks.json"
      echo ""
    else
      echo -e "${YELLOW}⚠${NC} assetlinks.json not found at $ASSETLINKS_FILE"
      echo "You can manually create it with:"
      echo ""
      echo "Package Name: $PACKAGE_NAME"
      echo "SHA-256 Fingerprint: $SHA256_FINGERPRINT"
      echo ""
    fi
  fi
fi

# ═══════════════════════════════════════════════════════════════════════════
# STEP 9: Cleanup
# ═══════════════════════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}Step 9: Cleaning up...${NC}"
echo ""

# Remove temporary manifest
if [ -f "$TEMP_MANIFEST" ]; then
  rm "$TEMP_MANIFEST"
  echo -e "${GREEN}✓${NC} Temporary manifest removed"
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   🎉 ALL DONE!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Test the AAB file on a device or emulator"
echo "  2. Upload to Google Play Console"
echo "  3. Ensure assetlinks.json is deployed to production"
echo ""
echo -e "${YELLOW}For detailed publishing instructions, see:${NC}"
echo "  frontend/PLAY_STORE_TWA_PUBLISHING_GUIDE.md"
echo ""
