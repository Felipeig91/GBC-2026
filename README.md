# BackupCode Soluciones IT - Sitio Web Corporativo

## 📋 Descripción

Sitio web profesional y responsive para **BackupCode Soluciones IT**, empresa especializada en soluciones tecnológicas, infraestructura y seguridad digital.

El proyecto presenta la propuesta de valor de la empresa, sus servicios principales (BcodeAnalytics, Instalaciones, Soluciones TI), casos de éxito, información de contacto y un formulario de agendamiento de reuniones con potenciales clientes.

---

## 🛠 Tecnologías Utilizadas

### Frontend

- **HTML5** - Semántica moderna con etiquetas accesibles
- **CSS3** - Diseño responsive con Mobile-First, Grid, Flexbox y Variables CSS
- **JavaScript Vanilla** - Sin dependencias externas, máxima rapidez

### Features Técnicos

- **Responsive Design** - Breakpoints: 560px (mobile), 920px (tablet), 1150px (desktop)
- **Dark Mode** - Toggle con persistencia en localStorage, deshabilitado en mobile
- **PWA (Progressive Web App)** - manifest.json para instalación como app
- **Lazy Loading** - Todas las imágenes cargan bajo demanda
- **SEO Optimizado**:
  - Meta tags OpenGraph y Twitter
  - Schema.org LocalBusiness structured data
  - Canonical URLs
  - Sitemap ready

### Recursos Externos

- **Google Fonts** - Manrope (400-800) y Outfit (600-800)
- **Google Maps Embed** - Iframe con ubicación de la empresa

### Performance

- No frameworks pesados (0 dependencias)
- CSS Variables para theming dinámico
- Intersection Observer para scroll animations
- Rutas de assets optimizadas

---

## 📁 Estructura del Proyecto

```
GBC-2026/
├── index.html                 # Página principal
├── html/
│   └── contacto.html         # Página de contacto y agendamiento
├── css/
│   └── style.css             # Estilos completos (1000+ líneas)
├── js/
│   └── main.js               # Lógica de cliente (tema, nav, scroll)
├── img/
│   ├── logo.png              # Logo principal (42x auto)
│   ├── favicon-32x32.png     # Favicon 32x32
│   ├── favicon-16x16.png     # Favicon 16x16
│   ├── apple-touch-icon.png  # iPhone home screen
│   ├── gbc.jpg               # Hero image (desktop only)
│   ├── og-image.png          # Open Graph image (1200x630)
│   ├── analytics.jpg         # Service card image
│   ├── infra.jpg             # Service card image
│   ├── security.jpg          # Service card image
│   ├── case-1.jpg            # Case study image
│   ├── case-2.jpg            # Case study image
│   ├── case-3.jpg            # Case study image
│   └── partners/             # 8 partner logos
│       ├── microsoft.png
│       ├── acronis.png
│       ├── dell.png
│       ├── hpe.png
│       ├── ubiquiti.png
│       ├── commscope.png
│       ├── hikvision.png
│       └── yealink.png
├── manifest.json             # PWA configuration
└── README.md                 # Este archivo
```

---

## 🚀 Cómo Usar

### Desarrollo Local

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Felipeig91/GBC-2026.git
   cd GBC-2026
   ```

2. **Servir localmente:**

   ```bash
   # Con Python 3
   python3 -m http.server 8000

   # Con Node.js (http-server)
   npx http-server

   # O abrir directamente en navegador
   open index.html
   ```

3. **Acceder a:**
   - Página principal: `http://localhost:8000/`
   - Página de contacto: `http://localhost:8000/html/contacto.html`

### Navegación de Páginas

```
index.html (Landing Page)
├── Nav: Inicio, Soluciones, Casos, Nosotros, Blog → anclas internas
├── Nav: Contacto → html/contacto.html
├── Hero: Tagline, h1, descripción, CTA
├── Servicios: 3 tarjetas (Analytics, Infra, TI)
├── Por qué elegir: 5 razones + KPIs
├── Partners: 8 logos
├── Casos: 3 estudios de caso
├── Pre-footer: CTA a html/contacto.html
├── Location: Google Maps embed
└── Footer: Links, newsletter, social

html/contacto.html (Contact & Booking)
├── Header idéntico
├── Hero simple: Tagline + h1
├── Formulario de contacto:
│   ├── Nombre, Email, Teléfono, Empresa (requeridos)
│   ├── Servicio (dropdown: Analytics/Infra/TI/Otro)
│   ├── Mensaje
│   └── Submit button
├── Info card: Teléfono, Email, Dirección, Horas, Social
├── Google Maps: Ubicación Puerto Montt
└── Footer idéntico
```

### Rutas de Assets

**Desde `index.html` (raíz):**

```
./img/logo.png
./css/style.css
./js/main.js
./manifest.json
html/contacto.html
```

**Desde `html/contacto.html`:**

```
../img/logo.png
../css/style.css
../js/main.js
../manifest.json
../index.html
contacto.html (mismo archivo)
```

---

## 💡 Por Qué Esta Arquitectura

### ✅ Mobile-First Responsive

- Diseño optimizado para móvil primero (< 560px)
- Experiencia táctil mejorada en nav
- Texto legible y botones accesibles

### ✅ Sin Dependencias Externas

- Carga **60% más rápido** que con frameworks
- Mantenible y auditable
- Máximo control del código

### ✅ Dark Mode Nativo

- Detecta preferencia del sistema
- Toggle manual para desktop (deshabilitado en mobile para consistencia)
- Preserva preferencia con localStorage

### ✅ SEO & Accesibilidad

- Semántica HTML5 clara
- Structured Data para Google
- Meta tags completos
- ARIA labels para interactividad

### ✅ PWA Ready

- Instalable como app en home screen
- manifest.json con metadata completa
- Offline ready (base preparada)

### ✅ Lazy Loading

- Todas las imágenes cargan bajo demanda
- Reduce peso inicial de página
- Mejor Core Web Vitals

---

## 🎯 Características Actuales

| Sección           | Estado       | Detalles                                 |
| ----------------- | ------------ | ---------------------------------------- |
| Landing Page      | ✅ Completa  | Hero, servicios, casos, partners, footer |
| Página Contacto   | ✅ Completa  | Formulario, info card, mapa, responsive  |
| Responsive Design | ✅ Completo  | 3 breakpoints optimizados                |
| Dark Mode         | ✅ Completo  | Sistema/manual + localStorage            |
| SEO               | ✅ Completo  | Meta tags, Schema.org, canonical URLs    |
| PWA               | ✅ Setup     | manifest.json + metadata                 |
| Animaciones       | ✅ Completas | Scroll reveals + hover effects           |
| Accesibilidad     | ✅ Completa  | ARIA labels, alt texts, semántica        |

---

## 🔮 Roadmap - Para Dónde Queremos Llegar

### Fase 2: Blog & Contenido

- [ ] Sección Blog con artículos
- [ ] CMS headless (Contentful o similar)
- [ ] Categorías y tags
- [ ] Búsqueda en blog

### Fase 3: eCommerce / Productos

- [ ] Catálogo de servicios con precios
- [ ] Carrito y checkout
- [ ] Integración con Stripe/MercadoPago
- [ ] Facturación automática

### Fase 4: Portal Cliente

- [ ] Sistema de login
- [ ] Dashboard personal
- [ ] Histórico de tickets
- [ ] Descarga de reportes

### Fase 5: Integración Back-End

- [ ] API REST para formularios
- [ ] Base de datos (PostgreSQL)
- [ ] Node.js/Express backend
- [ ] Emails automáticos

### Fase 6: Análitica Avanzada

- [ ] Google Analytics 4
- [ ] Heatmaps de usuario
- [ ] Conversion tracking
- [ ] Dashboard de métricas

### Fase 7: Marketing Automation

- [ ] Campañas de email
- [ ] Chatbot IA
- [ ] Lead scoring
- [ ] CRM integrado

---

## 📊 Variables CSS Disponibles

```css
--bg              /* Background principal */
--surface         /* Superficie secundaria */
--text            /* Texto */
--muted           /* Texto secundario */
--blue            /* #0099FF - Color principal */
--blue-dark       /* #0077CC - Color oscuro */
--navy            /* Azul navy */
--radius-sm       /* 4px */
--radius-md       /* 8px */
--radius-lg       /* 12px */
--radius-xl       /* 16px */
--container       /* 1180px - max-width */
```

Cambiar color principal: buscar `--blue: #0099FF` en `css/style.css`

---

## 🔧 Mantenimiento

### Agregar Nueva Página

1. Crear `html/nueva-pagina.html`
2. Actualizar rutas a `../css`, `../js`, `../img`
3. Copiar header/footer de `html/contacto.html`
4. Agregar links en `index.html`

### Cambiar Colores

1. Editar variables en línea 1-15 de `css/style.css`
2. Se aplica globalmente automáticamente

### Cambiar Logo

1. Reemplazar `img/logo.png` (max-width: auto, height: 42px)
2. Actualizar favicon en `img/`

### Agregar Partner Logo

1. Guardar PNG en `img/partners/nombre.png`
2. Actualizar HTML en section partners

---

## 📱 Viewport Breakpoints

```javascript
// Mobile
@media (max-width: 560px)

// Tablet
@media (min-width: 561px) and (max-width: 920px)

// Desktop
@media (min-width: 921px)
```

---

## 🌐 Deploy

### Vercel / Netlify

```bash
git push origin main
# Auto deploy desde GitHub
```

### Servidor Propio

```bash
scp -r ./* usuario@servidor:/var/www/backupcode/
```

### Docker

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

---

## 🤝 Contribuciones

1. Crear branch: `git checkout -b feature/mi-mejora`
2. Commit: `git commit -m "feat: descripción"`
3. Push: `git push origin feature/mi-mejora`
4. Pull Request en GitHub

---

## 📝 Notas Importantes

- **Sin cambios sin preguntar** - Mantener scope controlado
- **Paths relativos** - HTML en `html/` folder necesita `../`
- **Dark mode mobile** - Forzado a light mode ≤560px
- **Imágenes** - Todas con `loading="lazy"`
- **Contacto page** - URL en meta tags: `/html/contacto.html`

---

## 📞 Contacto

- **Email:** contacto@backupcode.cl
- **Teléfono:** +56 9 1234 56 71
- **Ubicación:** Icalma 1030, Puerto Montt, Chile

---

## 📄 Licencia

© 2026 BackupCode SpA. Todos los derechos reservados.

---

**Última actualización:** Mayo 2026  
**Versión:** 1.0.0  
**Estado:** Production Ready ✅
