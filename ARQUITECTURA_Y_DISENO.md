# 🌸 Documentación Exhaustiva de Arquitectura, Funciones, Catálogo y Sistema de Diseño — Florería Rouss

---

## 1. 🏗️ Arquitectura Técnica del Frontend

### 1.1 Stack Tecnológico Core
- **Framework**: React 18 + Vite (SPA de alto rendimiento con Hot Module Replacement).
- **Estilos**: **Vanilla CSS nativo** estructurado mediante CSS Custom Properties (`:root`), sin frameworks CSS invasivos ni dependencias pesadas.
- **Tipografía**: **Poppins** (Google Fonts: 400, 500, 600, 700) aplicada globalmente.
- **Iconografía**: Módulo vectorial SVG nativo parametrizable (`PremiumIcons.jsx`), escalable y sin pérdida de nitidez.
- **Enrutamiento**: HTML5 History API (`window.history.pushState` y escucha `popstate`) sincronizado con rutas `/` e `/catalogo`.
- **Optimización de Imágenes**: Convertidor de imágenes de alta fidelidad **WebP** (`imageOptimizer.js` y `convert-to-webp.js` / `convert-tanda2.js` / `convert-tanda3.js`) 100% compatible con **iOS (Safari iOS 14+)**, **Android** y navegadores de escritorio.
- **Testing**: Suite completa de pruebas con **Vitest** (pruebas unitarias y de componentes) y **Playwright** (pruebas End-to-End en Desktop Chromium y Mobile Safari iOS).

---

## 2. 🌹 Catálogo Oficial en Supabase (`mypes`)

Se cargaron los **44 arreglos florales oficiales** enviados directamente por el dueño vía WhatsApp (Tanda 1, Tanda 2 y Tanda 3), estructurados con descripciones profesionales de alta gama sin emojis informales:

### Tanda 1 (14 Arreglos de Alta Gama & Formato Buchón)
| # | Título Oficial del Arreglo | Categoría | Precio (S/) | Formato |
| :- | :--- | :--- | :--- | :--- |
| 1 | **Ramo Buchón "Sol Radiante" (12 Girasoles)** | Ramos Buchones & Girasoles | S/ 180.00 | WebP + JPG |
| 2 | **Ramo Buchón Imperial 50 Rosas & Trío de Helio** | Ramos Buchones & Girasoles | S/ 300.00 | WebP + JPG |
| 3 | **Maxi Ramo Buchón 80 Rosas & 6 Girasoles** | Ramos Buchones & Girasoles | S/ 450.00 | WebP + JPG |
| 4 | **Ramo Buchón "Reina Imperial" (80 Rosas)** | Ramos Buchones & Girasoles | S/ 400.00 | WebP + JPG |
| 5 | **Ramo Buchón "Corona de Reina" (50 Rosas)** | Cumpleaños & Coronales | S/ 300.00 | WebP + JPG |
| 6 | **Ramo Buchón Élite 50 Rosas** | Ramos Buchones & Girasoles | S/ 250.00 | WebP + JPG |
| 7 | **Ramo Buchón 40 Rosas & Mariposas de Oro** | Ramos Buchones & Girasoles | S/ 200.00 | WebP + JPG |
| 8 | **Ramo Buchón Pasión 30 Rosas** | Rosas Premium | S/ 170.00 | WebP + JPG |
| 9 | **Combo Ternura 20 Rosas, Peluche & Lirio** | Detalles & Combos Especiales | S/ 230.00 | WebP + JPG |
| 10 | **Bouquet Conservación 20 Rosas & Hidratación** | Rosas Premium | S/ 150.00 | WebP + JPG |
| 11 | **Bouquet Armonía 12 Rosas & Astromelias** | Rosas Premium | S/ 160.00 | WebP + JPG |
| 12 | **Bouquet Esencial 15 Rosas Hidratadas** | Rosas Premium | S/ 100.00 | WebP + JPG |
| 13 | **Bouquet Imperial de Lirios Blancos** | Delicadeza Pastel & Lirios | S/ 150.00 | WebP + JPG |
| 14 | **Bouquet Romance 3 Lirios & Rosas Pastel** | Delicadeza Pastel & Lirios | S/ 160.00 | WebP + JPG |

### Tanda 2 (15 Arreglos: Ramos Normales, Cucuruchos, Anturios & Boxes)
| # | Título Oficial del Arreglo | Categoría | Precio (S/) | Formato |
| :- | :--- | :--- | :--- | :--- |
| 15 | **Cucurucho Pasión 8 Rosas Rojas** | Rosas Premium | S/ 80.00 | WebP + JPG |
| 16 | **Bouquet Delicadeza 12 Rosas Rosa Pastel** | Delicadeza Pastel & Lirios | S/ 90.00 | WebP + JPG |
| 17 | **Bouquet Multicolor Fiesta de Primavera** | Detalles & Combos Especiales | S/ 90.00 | WebP + JPG |
| 18 | **Mini Bouquet 4 Rosas & Astromelias** | Rosas Premium | S/ 55.00 | WebP + JPG |
| 19 | **Bouquet Exótico 5 Rosas & Anturio Rosa** | Delicadeza Pastel & Lirios | S/ 85.00 | WebP + JPG |
| 20 | **Bouquet Imperial 20 Rosas & Doble Anturio** | Rosas Premium | S/ 190.00 | WebP + JPG |
| 21 | **Bouquet Clásico 12 Rosas Rojas** | Rosas Premium | S/ 80.00 | WebP + JPG |
| 22 | **Mini Bouquet Lirio Oriental & Astromelias** | Delicadeza Pastel & Lirios | S/ 55.00 | WebP + JPG |
| 23 | **Bouquet Distinción 8 Claveles Importados** | Delicadeza Pastel & Lirios | S/ 90.00 | WebP + JPG |
| 24 | **Ramo Exclusivo Orquídea Real & Estrellitas de Belén** | Propuestas & Bodas | S/ 150.00 | WebP + JPG |
| 25 | **Bouquet Radiante 6 Girasoles & Margaritas** | Ramos Buchones & Girasoles | S/ 80.00 | WebP + JPG |
| 26 | **Bouquet Silvestre Romance Pastel** | Delicadeza Pastel & Lirios | S/ 65.00 | WebP + JPG |
| 27 | **Sombrerera Floral Box Girasoles & Rosas** | Detalles & Combos Especiales | S/ 100.00 | WebP + JPG |
| 28 | **Bouquet Dulzura Lirio Rosado & Conejitos** | Delicadeza Pastel & Lirios | S/ 120.00 | WebP + JPG |
| 29 | **Ramo Princesa 12 Rosas Durazno & Tiara de Cristal** | Cumpleaños & Coronales | S/ 200.00 | WebP + JPG |

### Tanda 3 (15 Arreglos: Gerberas, Dúo de Lirios, Estructura Geométrica & Rosas Azules)
| # | Título Oficial del Arreglo | Categoría | Precio (S/) | Formato |
| :- | :--- | :--- | :--- | :--- |
| 30 | **Ramo Princesa 2 Gerberas & Follaje Rosa** | Delicadeza Pastel & Lirios | S/ 85.00 | WebP + JPG |
| 31 | **Bouquet Armonía 1 Lirio & 3 Rosas Lilas** | Delicadeza Pastel & Lirios | S/ 55.00 | WebP + JPG |
| 32 | **Bouquet Silvestre 1 Lirio & 3 Rosas** | Delicadeza Pastel & Lirios | S/ 65.00 | WebP + JPG |
| 33 | **Bouquet Dúo Imperial de Lirios Orientales** | Delicadeza Pastel & Lirios | S/ 80.00 | WebP + JPG |
| 34 | **Bouquet Fusión 6 Rosas & 4 Girasoles** | Ramos Buchones & Girasoles | S/ 90.00 | WebP + JPG |
| 35 | **Estructura Geométrica 2 Lirios, 10 Rosas & Claveles** | Cumpleaños & Coronales | S/ 160.00 | WebP + JPG |
| 36 | **Bouquet Ternura 1 Lirio Rosado & 3 Rosas** | Delicadeza Pastel & Lirios | S/ 70.00 | WebP + JPG |
| 37 | **Bouquet Elegance 8 Rosas Pastel & Perlas** | Rosas Premium | S/ 100.00 | WebP + JPG |
| 38 | **Bouquet Pasión 8 Rosas Rojas** | Rosas Premium | S/ 80.00 | WebP + JPG |
| 39 | **Bouquet Sublime 1 Lirio Oriental & 3 Rosas** | Delicadeza Pastel & Lirios | S/ 75.00 | WebP + JPG |
| 40 | **Bouquet Rústico Chic 1 Lirio & Follaje** | Delicadeza Pastel & Lirios | S/ 60.00 | WebP + JPG |
| 41 | **Bouquet Fortuna 12 Rosas Blush & Lirios** | Detalles & Combos Especiales | S/ 180.00 | WebP + JPG |
| 42 | **Bouquet Royal 6 Rosas Azules & Detalles Plateados** | Rosas Premium | S/ 70.00 | WebP + JPG |
| 43 | **Bouquet Solar 6 Rosas Amarillas & Astromelias** | Rosas Premium | S/ 65.00 | WebP + JPG |
| 44 | **Bouquet Silvestre 1 Lirio Rosado & Astromelias** | Delicadeza Pastel & Lirios | S/ 70.00 | WebP + JPG |

---

## 3. 🖼️ Módulo Convertidor y Optimizador WebP

1. **Scripts CLI Automatizados (`scripts/convert-to-webp.js`, `scripts/convert-tanda2.js`, `scripts/convert-tanda3.js`)**:
   - `npm run optimize:images`: Procesa todas las imágenes de la carpeta `Productos Rouss/`, escala a un máximo de 1200px (calidad 88%), preserva el espacio sRGB y genera tanto `.webp` como `.jpg` para compatibilidad total.
2. **Utilidad de Navegador (`src/lib/imageOptimizer.js`)**:
   - Función `convertImageToWebP(file, options)` que procesa imágenes mediante Canvas 2D en el cliente, soportada en **iOS Safari 14+**, iPadOS, Chrome y Firefox.

---

## 4. 🧪 Suite de Pruebas Automatizadas

- **Vitest**: `npm test` ejecuta 7 pruebas unitarias verificando:
  - Renderizado de productos y precios en Soles (`S/`).
  - Navegación a `/catalogo`.
  - Búsqueda y filtrado instantáneo en vivo (incluyendo búsqueda de Gerberas, Rosas Azules y Lirios de Tanda 3).
  - Enlaces dinámicos de WhatsApp con número oficial `+51 921 585 977`.
  - Apertura del Lightbox Modal con fotografía ampliada.
  - Conversión a WebP con `imageOptimizer.js`.
- **Playwright (E2E)**: `npx playwright test` ejecuta 6 pruebas automatizadas en paralelo:
  - **Desktop Chromium**: Navegación completa, modal y búsqueda.
  - **Mobile Safari (iOS iPhone 14)**: Validación de menús táctiles y responsive.
