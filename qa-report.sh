#!/bin/bash

echo "========================================"
echo "  BACKUPCODE - COMPREHENSIVE QA REPORT"
echo "========================================"
echo ""
echo "📋 CHECKLIST DE AUDITORÍA QA"
echo ""

# 1. CHECK NAVBAR LINKS ON EACH PAGE
echo "1️⃣  VERIFICANDO LINKS DE NAVBAR..."
echo ""

for file in index.html html/contacto.html html/nosotros.html html/soluciones/*.html html/casos/*.html; do
  if [ -f "$file" ]; then
    echo "   📄 $file"
    # Check if file has dropdown menus
    if grep -q "menu-item-dropdown" "$file"; then
      echo "      ✅ Tiene dropdowns"
    else
      echo "      ⚠️  No tiene dropdowns"
    fi
  fi
done

echo ""
echo "2️⃣  VERIFICANDO LINKS DE FOOTER..."
echo ""

# Check footer Soluciones links
echo "   Footer Soluciones links:"
for file in index.html html/contacto.html html/nosotros.html html/soluciones/bcode-analytics.html html/casos/retail.html; do
  if [ -f "$file" ]; then
    echo "   📄 $file:"
    grep -A 5 'Soluciones' "$file" | grep 'href=' | head -3 | sed 's/^/      /'
  fi
done

echo ""
echo "3️⃣  VERIFICANDO CSS..."
echo ""

# Check CSS file size and content
if [ -f "css/style.css" ]; then
  lines=$(wc -l < css/style.css)
  echo "   ✅ css/style.css - $lines líneas"
  echo "      Verificando clases principales:"
  for class in "dark-mode" "dropdown-menu" "responsive" "mobile" "dark"; do
    if grep -q "$class" css/style.css; then
      echo "         ✅ .$class encontrado"
    fi
  done
else
  echo "   ❌ css/style.css MISSING"
fi

echo ""
echo "4️⃣  VERIFICANDO JAVASCRIPT..."
echo ""

if [ -f "js/main.js" ]; then
  lines=$(wc -l < js/main.js)
  echo "   ✅ js/main.js - $lines líneas"
  echo "      Verificando funcionalidades:"
  for func in "toggleTheme" "dropdown" "Intersection" "form" "localStorage"; do
    if grep -q "$func" js/main.js; then
      echo "         ✅ $func encontrado"
    fi
  done
else
  echo "   ❌ js/main.js MISSING"
fi

echo ""
echo "5️⃣  VERIFICANDO IMÁGENES..."
echo ""

image_count=$(find img -type f 2>/dev/null | wc -l)
echo "   Imágenes en proyecto: $image_count archivos"

# Check for specific images
for img in logo.png og-image.png; do
  if [ -f "img/$img" ]; then
    size=$(ls -lh "img/$img" | awk '{print $5}')
    echo "      ✅ img/$img ($size)"
  else
    echo "      ❌ img/$img MISSING"
  fi
done

echo ""
echo "6️⃣  VERIFICANDO META TAGS..."
echo ""

echo "   index.html:"
grep -c "og:" index.html | xargs echo "      OpenGraph tags:"
grep -c "twitter:" index.html | xargs echo "      Twitter tags:"

echo ""
echo "7️⃣  VERIFICANDO FORMULARIOS..."
echo ""

for file in html/contacto.html; do
  echo "   📄 $file:"
  if grep -q 'contact-form' "$file"; then
    echo "      ✅ Formulario de contacto presente"
    inputs=$(grep -c '<input\|<textarea\|<select' "$file")
    echo "      ℹ️  Campos: $inputs"
  fi
done

echo ""
echo "8️⃣  VERIFICANDO PATHS DE ENLACES..."
echo ""

echo "   Detectando problemas de paths..."
# Check for problematic paths
for file in html/*.html html/*/*.html; do
  if [ -f "$file" ]; then
    # Check for href errors
    if grep -E 'href=".*\.\./\.\./\.\.' "$file" > /dev/null 2>&1; then
      echo "      ⚠️  $file tiene paths demasiado profundos"
    fi
  fi
done

