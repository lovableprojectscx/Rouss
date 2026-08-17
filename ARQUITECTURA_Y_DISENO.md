# 🌸 Documentación Exhaustiva de Arquitectura, Funciones, Botones y Sistema de Diseño — Florería Rouss

---

## 1. 🏗️ Arquitectura Técnica del Frontend

### 1.1 Stack Tecnológico Core
- **Framework**: React 18 + Vite (SPA de alto rendimiento con Hot Module Replacement).
- **Estilos**: **Vanilla CSS nativo** estructurado mediante CSS Custom Properties (`:root`), sin frameworks CSS pesados.
- **Tipografía**: **Poppins** (Google Fonts: 400, 500, 600, 700) aplicada globalmente.
- **Iconografía**: Módulo vectorial SVG nativo parametrizable (`PremiumIcons.jsx`), escalable y sin pérdida de nitidez.
- **Enrutamiento**: HTML5 History API (`window.history.pushState` y escucha `popstate`) sincronizado con rutas `/` e `/catalogo`.

---

## 2. ⚙️ Catálogo Completo de Funciones y Manejadores (Handlers)

En [`src/App.jsx`](file:///c:/Users/JACK%20FRANKLIN/Downloads/Floreria%20rouss/src/App.jsx), todas las interacciones se gestionan mediante funciones puras y reactivas:

### 2.1 Gestión de Estados React (`useState` / `useRef`)
| Estado / Referencia | Tipo | Descripción y Alcance |
| :--- | :--- | :--- |
| `currentPage` | `string` (`'inicio'` \| `'catalogo'`) | Controla la vista activa; se inicializa leyendo `window.location.pathname` o `hash`. |
| `activeCategory` | `string` | Categoría seleccionada para el filtrado (`'todos'`, `'propuestas'`, `'coronas'`, etc.). |
| `searchQuery` | `string` | Texto del buscador en vivo para filtrar productos por título o descripción. |
| `selectedItem` | `object \| null` | Almacena el producto o foto de galería abierto en el Lightbox Modal. |
| `mobileMenuOpen` | `boolean` | Controla la visibilidad del menú desplegable (*Drawer*) en dispositivos móviles. |
| `formData` | `object` | Almacena los campos del formulario de cotización personalizada. |
| `sliderRef` | `useRef` | Referencia al nodo DOM del contenedor de la Galería de Momentos para desplazamiento táctil. |

---

### 2.2 Funciones y Métodos del Sistema

#### 1. `navigateToPage(page: string): void`
- **Objetivo**: Transicionar entre la vista de `inicio` y `catalogo`.
- **Acciones ejecutadas**:
  1. Actualiza el estado reactivo `currentPage`.
  2. Cierra automáticamente el menú móvil (`setMobileMenuOpen(false)`).
  3. Ejecuta scroll suave hasta el tope superior (`window.scrollTo({ top: 0, behavior: 'smooth' })`).
  4. Sincroniza la barra de direcciones del navegador mediante `window.history.pushState`.

#### 2. `handleWhatsAppOrder(productName: string): void`
- **Objetivo**: Iniciar una conversación de compra directa por WhatsApp con el nombre del producto.
- **Acciones ejecutadas**:
  - Genera una URL codificada (`encodeURIComponent`) con el mensaje: `Hola Florería Rouss, me gustaría solicitar información y disponibilidad de: *[productName]*.`
  - Abre la ventana hacia `https://wa.me/51921585977`.

#### 3. `handleFormSubmit(e: FormEvent): void`
- **Objetivo**: Procesar la cotización personalizada y enviarla formateada por WhatsApp.
- **Acciones ejecutadas**:
  1. Ejecuta `e.preventDefault()` para evitar recargas de página.
  2. Extrae `nombre`, `telefono`, `ocasion`, `presupuesto`, `fechaEntrega` y `mensaje`.
  3. Construye una plantilla con emojis y viñetas profesionales:
     ```
     Hola Florería Rouss, solicito una cotización personalizada:
     📌 Nombre: [nombre]
     📱 Teléfono: [telefono]
     🌹 Ocasión: [ocasion]
     💰 Presupuesto: [presupuesto]
     📅 Fecha de Entrega: [fechaEntrega]
     💬 Detalles / Dedicatoria: [mensaje]
     ```
  4. Redirige al WhatsApp oficial `+51 921 585 977`.

#### 4. `scrollSlider(direction: 'left' | 'right'): void`
- **Objetivo**: Desplazar el carrusel de testimonios/momentos en móviles y tablets.
- **Acciones ejecutadas**:
  - Aplica un desplazamiento relativo de `+280px` o `-280px` con animación `behavior: 'smooth'` sobre `sliderRef.current`.

#### 5. `handlePopState(): void` (Efecto Global)
- **Objetivo**: Escuchar los eventos del historial del navegador (botones Atrás y Adelante).
- **Acciones ejecutadas**:
  - Lee dinámicamente si la URL contiene `/catalogo` o `#catalogo` y conmuta la vista sin recargar la página.

#### 6. `filteredProducts: Array<Product>` (Cálculo Derivado)
- **Objetivo**: Computar en tiempo real los arreglos a mostrar en la grilla.
- **Acciones ejecutadas**:
  - Aplica doble condición: pertenencia a `activeCategory` y coincidencia de subcadena con `searchQuery` en título o descripción.

---

## 3. 🔘 Mapeo Exhaustivo de Botones y Elementos Interactivos

| # | Elemento / Botón | Clase CSS | Evento | Función / Comportamiento |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Cintillo Marquesina** | `.top-promo-ticker` | `onMouseEnter` / `onMouseLeave` | Pausa y reanuda la animación infinita CSS al pasar el cursor. |
| 2 | **Logo Principal** | `.logo-link` | `onClick` | Invoca `navigateToPage('inicio')` para volver a la portada. |
| 3 | **Pestaña Inicio (Header)** | `.nav-button` | `onClick` | Invoca `navigateToPage('inicio')`. |
| 4 | **Pestaña Catálogo (Header)**| `.nav-button` | `onClick` | Invoca `navigateToPage('catalogo')`. |
| 5 | **Anclas de Menú (Header)** | `.nav-button` | `href="#id"` | Desplazamiento nativo hacia `#clientes`, `#cotizacion` o `#nosotros`. |
| 6 | **Botón Pedir WhatsApp Header** | `.btn-whatsapp-solid` | `onClick` | Invoca `handleWhatsAppOrder('Consulta General')`. |
| 7 | **Botón Hamburguesa Móvil** | `.mobile-toggle-btn` | `onClick` | Invierte el booleano `mobileMenuOpen` (muestra `☰` o `✕`). |
| 8 | **Enlaces Menú Drawer** | `.mobile-drawer-link` | `onClick` | Ejecuta la navegación y cierra el panel lateral. |
| 9 | **Banner Hero Panorámico** | `.hero-banner-full-card` | `onClick` / `onKeyDown` | Invoca `navigateToPage('catalogo')` al hacer clic o presionar Enter. |
| 10 | **Franja Poética de Banner**| `.banner-hint-bar` | `onClick` | Invoca `navigateToPage('catalogo')`. |
| 11 | **Botón Callout Parallax** | `.btn-solid-gold` | `onClick` | Invoca `navigateToPage('catalogo')` para ver la colección. |
| 12 | **Flecha Carrusel Izquierda**| `.slider-arrow-left` | `onClick` | Invoca `scrollSlider('left')`. |
| 13 | **Flecha Carrusel Derecha** | `.slider-arrow-right` | `onClick` | Invoca `scrollSlider('right')`. |
| 14 | **Tarjeta de Momento/Cliente**| `.client-card-solid` | `onClick` | Asigna `selectedItem` y abre el Lightbox Modal con foto ampliada. |
| 15 | **Input Buscador Catálogo** | `.search-input` | `onChange` | Actualiza `searchQuery` en tiempo real. |
| 16 | **Botón Limpiar Búsqueda** | `button (CloseIcon)` | `onClick` | Limpia `searchQuery` (`setSearchQuery('')`). |
| 17 | **Píldoras Filtro Desktop** | `.pill-btn` | `onClick` | Asigna `setActiveCategory(id)`. |
| 18 | **Selector Filtro Móvil** | `.mobile-category-select` | `onChange` | Asigna `setActiveCategory(e.target.value)` sin desbordes. |
| 19 | **Imagen de Tarjeta Producto**| `.product-img-wrapper` | `onClick` | Abre el Lightbox Modal con la ficha técnica completa. |
| 20 | **Botón Pedir en Producto** | `.btn-order-wa-solid` | `onClick` | Invoca `handleWhatsAppOrder(product.title)`. |
| 21 | **Formulario de Cotización**| `form` | `onSubmit` | Dispara `handleFormSubmit` y envía el pedido estructurado a WhatsApp. |
| 22 | **Enlaces del Footer** | `.footer-links button` | `onClick` | Navega a secciones específicas o abre el catálogo con filtros preseleccionados. |
| 23 | **Enlace a Instagram** | `.contact-item a` | `href` | Abre `@rouss8439` en Instagram con `target="_blank"`. |
| 24 | **Botón Flotante WhatsApp** | `.floating-wa-btn` | `href` | Abre WhatsApp directamente desde cualquier punto de la navegación. |
| 25 | **Backdrop del Modal** | `.modal-backdrop` | `onClick` | Cierra el modal (`setSelectedItem(null)`). |
| 26 | **Contenido del Modal** | `.modal-content` | `onClick` | Ejecuta `e.stopPropagation()` para no cerrarse al hacer clic adentro. |
| 27 | **Botón Cerrar Modal (✕)** | `.modal-close-btn` | `onClick` | Cierra el modal (`setSelectedItem(null)`). |
| 28 | **Botón WhatsApp en Modal** | `.btn-whatsapp-solid` | `onClick` | Invoca `handleWhatsAppOrder(selectedItem.title)`. |

---

## 4. 🎨 Colorimetría y Sistema de Diseño (`index.css`)

### 4.1 Paleta de Colores Oficial

| Token | Código Hex | Rol en la Interfaz |
| :--- | :--- | :--- |
| **`--bg-main`** | `#FAF8F5` | Fondo marfil claro general. |
| **`--bg-surface`** | `#FFFFFF` | Fondo blanco de tarjetas, campos y cabecera. |
| **`--bg-card`** | `#FDFBF7` | Fondo cálido para sección de momentos y tarjetas. |
| **`--bg-dark`** | `#121110` | Negro obsidiana para Footer, Franja del Banner y Marquesina. |
| **`--brand-gold`** | `#C59B27` | Oro imperial cálido para bordes, tags y acentos. |
| **`--brand-gold-bright`** | `#D4AF37` | Oro metálico luminoso para textos sobre negro. |
| **`--brand-gold-dark`** | `#96761A` | Oro profundo para precios y títulos de categorías. |
| **`--brand-gold-light`** | `#F8F3E6` | Tono champagne suave para píldoras y badges. |
| **`--whatsapp-solid`** | `#25D366` | Verde oficial WhatsApp (Color plano y sólido, sin brillos ni degradados). |
| **`--whatsapp-solid-hover`**| `#1EBE5D` | Estado hover de botones de WhatsApp. |
| **`--text-primary`** | `#121110` | Tipografía principal (Poppins Bold/Semibold). |
| **`--text-secondary`** | `#4A4641` | Párrafos y descripciones de arreglos. |
| **`--text-muted`** | `#8C857B` | Metadatos y etiquetas secundarias. |
| **`--border-light`** | `#EBE5DC` | Líneas divisorias y marcos de tarjetas. |
| **`--border-gold`** | `rgba(197, 155, 39, 0.4)` | Bordes acentuados de lujo. |

---

## 5. ☁️ Infraestructura en la Nube y Base de Datos

- **Despliegue Frontend**: Vercel Edge conectado a GitHub [`lovableprojectscx/Rouss.git`](https://github.com/lovableprojectscx/Rouss.git) (Rama `main`).
- **Enrutamiento SPA**: [`vercel.json`](file:///c:/Users/JACK%20FRANKLIN/Downloads/Floreria%20rouss/vercel.json) con rewrites automáticos para evitar errores 404 al recargar `/catalogo`.
- **Servicios en Supabase (Región `sa-east-1`)**:
  1. `Floreria-pasarela-pagos` (`sdrkiomeesoctsxeidmu` - Activo): Reservas y pasarela de pagos.
  2. `mypes` (`llasbukvdjlvwlgofgke` - Activo): Base de datos multi-tenant para comercio electrónico con 14 tablas relacionales (`tenants`, `products`, `categories`, `reservations`, `tenant_settings`, `ocasiones`, `variantes`, `extras`, `banners`, `colecciones`, `testimonios`).
