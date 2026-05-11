#!/bin/bash
# Generates all required Tauri icon sizes from logo-15d.svg
# Requires: npm install -g @aspect-ratio/svg-to-png OR brew install librsvg
# Usage: Run this script from the project root

ICONS_DIR="src-tauri/icons"
SVG="$ICONS_DIR/logo-15d.svg"

# Try rsvg-convert first, fall back to sips via qlmanage
if command -v rsvg-convert &> /dev/null; then
  rsvg-convert -w 32 -h 32 "$SVG" > "$ICONS_DIR/32x32.png"
  rsvg-convert -w 128 -h 128 "$SVG" > "$ICONS_DIR/128x128.png"
  rsvg-convert -w 256 -h 256 "$SVG" > "$ICONS_DIR/128x128@2x.png"
  rsvg-convert -w 512 -h 512 "$SVG" > "$ICONS_DIR/icon.png"
  echo "Icons generated with rsvg-convert"
elif command -v qlmanage &> /dev/null; then
  qlmanage -t -s 512 -o "$ICONS_DIR" "$SVG" 2>/dev/null
  mv "$ICONS_DIR/logo-15d.svg.png" "$ICONS_DIR/icon.png"
  sips -z 256 256 "$ICONS_DIR/icon.png" --out "$ICONS_DIR/128x128@2x.png" >/dev/null
  sips -z 128 128 "$ICONS_DIR/icon.png" --out "$ICONS_DIR/128x128.png" >/dev/null
  sips -z 32 32 "$ICONS_DIR/icon.png" --out "$ICONS_DIR/32x32.png" >/dev/null
  echo "Icons generated with qlmanage + sips"
else
  echo "Error: No SVG rasterizer found. Install librsvg: brew install librsvg"
  exit 1
fi

# Generate .icns for macOS
if command -v iconutil &> /dev/null; then
  ICONSET="$ICONS_DIR/icon.iconset"
  mkdir -p "$ICONSET"
  sips -z 16 16 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_16x16.png" >/dev/null
  sips -z 32 32 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_16x16@2x.png" >/dev/null
  sips -z 32 32 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_32x32.png" >/dev/null
  sips -z 64 64 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_32x32@2x.png" >/dev/null
  sips -z 128 128 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_128x128.png" >/dev/null
  sips -z 256 256 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_128x128@2x.png" >/dev/null
  sips -z 256 256 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_256x256.png" >/dev/null
  sips -z 512 512 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_256x256@2x.png" >/dev/null
  sips -z 512 512 "$ICONS_DIR/icon.png" --out "$ICONSET/icon_512x512.png" >/dev/null
  cp "$ICONS_DIR/icon.png" "$ICONSET/icon_512x512@2x.png"
  iconutil -c icns "$ICONSET" -o "$ICONS_DIR/icon.icns"
  rm -rf "$ICONSET"
  echo "icon.icns generated"
fi

echo "Done! Icons are in $ICONS_DIR"
