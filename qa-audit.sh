#!/bin/bash

echo "========================================"
echo "    BACKUPCODE QA AUDIT REPORT"
echo "========================================"
echo ""

# Extract all links from all HTML files
echo "🔍 ANALYZING ALL LINKS IN HTML FILES..."
echo ""

for file in index.html html/*.html html/*/*.html; do
  if [ -f "$file" ]; then
    echo "📄 File: $file"
    echo "   Links found:"
    
    # Extract href and src attributes
    grep -o 'href="[^"]*"\|src="[^"]*"' "$file" | sed 's/href="\|src="\|"//g' | sort | uniq | sed 's/^/     - /'
    echo ""
  fi
done

echo ""
echo "========================================"
echo "    CHECKING ASSETS EXISTENCE"
echo "========================================"
echo ""

# Check if referenced assets exist
echo "Checking CSS files..."
[ -f "css/style.css" ] && echo "✅ css/style.css exists" || echo "❌ css/style.css MISSING"

echo "Checking JS files..."
[ -f "js/main.js" ] && echo "✅ js/main.js exists" || echo "❌ js/main.js MISSING"

echo "Checking manifest..."
[ -f "manifest.json" ] && echo "✅ manifest.json exists" || echo "❌ manifest.json MISSING"

echo ""
echo "Checking image files..."
find img/ -type f 2>/dev/null | head -20 | sed 's/^/  ✅ /'

