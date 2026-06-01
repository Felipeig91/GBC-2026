#!/bin/bash

echo "=============================================="
echo " QA AUDIT - DETAILED LINK VERIFICATION"
echo "=============================================="
echo ""

# Check bcode-analytics.html for dropdowns
echo "🔍 CHECKING bcode-analytics.html for dropdown:"
if grep -q "menu-item-dropdown" html/soluciones/bcode-analytics.html; then
  echo "   ✅ Has dropdown menus"
else
  echo "   ⚠️  NO dropdown menus found!"
  echo "   This might be intentional or needs to be added"
fi

echo ""
echo "🖼️  CHECKING IMAGE FILES:"
ls -lah img/ 2>/dev/null | tail -20

echo ""
echo "❌ CHECKING FOR og-image.png:"
find . -name "*og-image*" -o -name "*og*image*" 2>/dev/null | head -10

echo ""
echo "📌 CHECKING FOOTER SOLUCIONES LINKS IN EACH PAGE:"
echo ""

# Create a detailed check
for file in index.html html/contacto.html html/nosotros.html html/soluciones/bcode-analytics.html html/casos/retail.html; do
  if [ -f "$file" ]; then
    echo "📄 $file:"
    # Extract the footer section
    awk '/footer-grid/,/\/footer/' "$file" | grep -A 20 'Soluciones' | head -6 | sed 's/^/   /'
    echo ""
  fi
done

echo ""
echo "🔗 CHECKING FOR BROKEN HREF PATTERNS:"
echo ""

for file in html/*.html html/*/*.html; do
  if [ -f "$file" ]; then
    # Look for empty href or problematic patterns
    if grep -E 'href="[[:space:]]*"' "$file" > /dev/null; then
      echo "   ⚠️  $file has empty href attributes"
      grep -n 'href="[[:space:]]*"' "$file" | head -2
    fi
    
    # Look for href="#" with no function
    href_hash=$(grep -c 'href="#"' "$file" 2>/dev/null)
    if [ "$href_hash" -gt 0 ]; then
      echo "   ⚠️  $file has $href_hash href=\"#\" links (placeholder links)"
    fi
  fi
done

