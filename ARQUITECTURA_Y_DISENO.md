# 🌸 Documentación de Arquitectura, Infraestructura y Sistema de Diseño — Florería Rouss

---

## 1. 🏗️ Arquitectura Técnica del Frontend

### 1.1 Stack Tecnológico Core
- **Framework**: React 18 + Vite (SPA con Hot Module Replacement).
- **Estilos**: **Vanilla CSS nativo** mediante CSS Custom Properties (`:root`), sin dependencias pesadas ni frameworks invasivos.
- **Tipografía**: **Poppins** (Google Fonts: 400, 500, 600, 700) aplicada globalmente con jerarquía visual estricta.
- **Iconografía**: Componentes vectoriales SVG nativos parametrizables (`PremiumIcons.jsx`), optimizados para resolución Retina.
- **Enrutamiento**: HTML5 History API (`window.history.pushState` y escucha de eventos `popstate`) sincronizado con rutas `/` e `/catalogo`.

### 1.2 Estructura de Directorios del Proyecto
```
Floreria rouss/
├── .gitignore               # Exclusiones para git (node_modules, dist)
├── index.html               # Punto de entrada HTML con meta tags SEO y Poppins
├── package.json             # Dependencias y scripts de construcción (build, dev)
├── vercel.json              # Reglas de reescritura SPA para despliegue en Vercel
├── vite.config.js           # Configuración del servidor de desarrollo Vite
├── public/
│   └── images/              # Assets estáticos de alta resolución
│       ├── banner.png           # Banner panorámico de impacto
│       ├── logo-header.png      # Logo transparente letras negras + corona dorada
│       ├── logo-footer.png      # Logo transparente letras blancas + corona dorada
│       ├── client-1.jpg a 4.jpg # Fotos de entregas y momentos de clientes
│       └── product-*.jpg        # Fotos de productos en primer plano (close-ups)
└── src/
    ├── main.jsx             # Render de React en el DOM
    ├── App.jsx              # Aplicación principal y gestión de vistas
    ├── index.css            # Sistema de diseño, tokens, breakpoints y animaciones
    └── components/
        └── PremiumIcons.jsx # Sistema de iconos SVG vectoriales
```

---

## 2. 🎨 Sistema de Diseño y Colorimetría (Design Tokens)

La paleta de color está inspirada en la **alta floristería y el lujo minimalista**, combinando fondos marfil cálidos con detalles en oro imperial y negro obsidiana.

### 2.1 Paleta de Colores (`:root`)

| Nombre del Token | Valor Hex / RGB | Rol en la Interfaz |
| :--- | :--- | :--- |
| `--bg-main` | `#FAF8F5` | Fondo general cálido (Marfil suave) |
| `--bg-surface` | `#FFFFFF` | Superficie de tarjetas y barra de navegación |
| `--bg-card` | `#FDFBF7` | Contenedores secundarios y galerías |
| `--bg-dark` | `#121110` | Fondos de alto contraste (Footer, Banner Bar, Marquesina) |
| `--brand-gold` | `#C59B27` | Oro imperial para bordes, tags y botones secundarios |
| `--brand-gold-bright` | `#D4AF37` | Oro metálico brillante para textos sobre fondo oscuro |
| `--brand-gold-dark` | `#96761A` | Oro profundo para precios y acentos de texto |
| `--brand-gold-light` | `#F8F3E6` | Fondo champagne sutil para píldoras y badges |
| `--whatsapp-solid` | `#25D366` | Verde oficial WhatsApp plano (CTA primario sin degradados) |
| `--whatsapp-solid-hover`| `#1EBE5D` | Estado hover de botones de WhatsApp |
| `--text-primary` | `#121110` | Tipografía principal (Negro carbón de máxima legibilidad) |
| `--text-secondary` | `#4A4641` | Párrafos y subtítulos descriptivos |
| `--text-muted` | `#8C857B` | Etiquetas secundarias y metadatos |
| `--border-light` | `#EBE5DC` | Separadores y bordes sutiles |
| `--border-gold` | `rgba(197, 155, 39, 0.4)` | Bordes acentuados de lujo |

### 2.2 Escala Tipográfica (Poppins)
- **H1 (Títulos Principales)**: `clamp(1.75rem, 6vw, 3.25rem)` / Weight 700 / Line-height 1.25.
- **H2 (Secciones)**: `clamp(1.85rem, 5.5vw, 3.25rem)` / Weight 700.
- **H3 (Tarjetas de Producto)**: `1.2rem` a `1.3rem` / Weight 600.
- **Subtítulos / Citas**: `1.05rem` / Italic / Line-height 1.45.
- **Body / Párrafos**: `0.9rem` a `0.95rem` / Regular 400.
- **Tags / Precios**: `0.75rem` (Uppercase, Tracking `0.08em`) / `1.2rem` (Bold 700).

### 2.3 Sistema de Elevación y Radios
- **Radios**: `--radius-sm: 8px`, `--radius-md: 14px`, `--radius-lg: 20px`, `--radius-full: 9999px`.
- **Sombras**:
  - `var(--shadow-sm)`: `0 2px 8px rgba(18, 17, 16, 0.06)`
  - `var(--shadow-md)`: `0 8px 20px rgba(18, 17, 16, 0.08)`
  - `var(--shadow-lg)`: `0 16px 40px rgba(18, 17, 16, 0.12)`

---

## 3. 📱 Arquitectura de Componentes y Vistas

```
App (Core)
 ├── Marquesina Automática Superior (.top-promo-bar)
 ├── Site Header (Logo Transparente Header + Menú Drawer Móvil)
 ├── Vista Inicio (/)
 │    ├── Hero Banner Panorámico Full Width
 │    ├── Franja Poética de Autor
 │    ├── Sección 2: 3 Pilares con Fotos Macro
 │    ├── Sección 3: Callout Parallax Oscuro
 │    ├── Sección 4: Galería de Momentos Rouss (Sin nombres falsos)
 │    ├── Sección 5: Cotizador a Medida por WhatsApp
 │    └── Sección 6: Sobre Rouss by Jharol Baldeón
 ├── Vista Catálogo (/catalogo)
 │    ├── Encabezado Colección Imperial
 │    ├── Buscador Instantáneo en Vivo
 │    ├── Selector Móvil (<select>) / Píldoras Desktop
 │    └── Grilla de Arreglos (Solo Fotos de Producto Puro)
 ├── Lightbox Modal (Zoom de fotografía y detalle)
 ├── Botón Flotante Directo de WhatsApp
 └── Pie de Página Oscuro (Logo Transparente Blanco + Credenciales)
```

### 3.1 Flujo de Conversión por WhatsApp
1. **Canal Centralizado**: Todas las interacciones de compra y cotización se dirigen al número **`+51 921 585 977`**.
2. **Mensajes Pre-formateados**:
   - **Consulta de Producto**: Mensaje directo con el nombre exacto del arreglo.
   - **Cotizador Personalizado**: Plantilla estructurada con Nombre, Teléfono, Ocasión, Presupuesto, Fecha de Entrega y Dedicatoria.

---

## 4. ☁️ Infraestructura en la Nube y Backend

- **Hosting & CDN**: Vercel Edge Network configurado con `vercel.json` para soporte SPA.
- **Control de Versiones**: Repositorio oficial en GitHub: `https://github.com/lovableprojectscx/Rouss.git` (rama `main`).
- **Base de Datos & Servicios Cloud (Supabase sa-east-1)**:
  1. `Floreria-pasarela-pagos` (`sdrkiomeesoctsxeidmu` - Activo): Reservas y pasarela de pagos.
  2. `mypes` (`llasbukvdjlvwlgofgke` - Activo): Core multi-tenant para comercios con 14 tablas relacionales (`tenants`, `products`, `categories`, `reservations`, `tenant_settings`, etc.).

---

## 5. ⚡ Optimización Móvil y Rendimiento
- **Zero Horizontal Overflow**: `overflow-x: hidden` a nivel `html, body`.
- **Selector de Categorías Adaptativo**: Menú desplegable nativo en pantallas <640px para evitar pestañas cortadas.
- **Marquesina Ticker GPU-Accelerated**: Animación CSS suave a 60fps con `will-change: transform` y pausa al cursor.
- **Tiempos de Carga**: Compilación en ~720ms y peso comprimido gzip de ~53KB.
