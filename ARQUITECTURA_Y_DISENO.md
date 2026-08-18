# 🌸 Documentación Exhaustiva de Arquitectura, Funciones, Catálogo y Sistema de Diseño — Florería Rouss

---

## 1. 🏗️ Arquitectura Técnica del Frontend

### 1.1 Stack Tecnológico Core
- **Framework**: React 18 + Vite (SPA de alto rendimiento con Hot Module Replacement).
- **Estilos**: **Vanilla CSS nativo** estructurado mediante CSS Custom Properties (`:root`), sin frameworks CSS invasivos ni dependencias pesadas.
- **Tipografía**: **Poppins** (Google Fonts: 400, 500, 600, 700) aplicada globalmente.
- **Iconografía**: Módulo vectorial SVG nativo parametrizable en color dorado champagne (`PremiumIcons.jsx`), escalable y sin pérdida de nitidez. **Sin emojis informales para preservar una línea gráfica de alta gama.**
- **Enrutamiento**: HTML5 History API (`window.history.pushState` y escucha `popstate`) sincronizado con rutas `/` e `/catalogo`.
- **Optimización de Imágenes**: Convertidor de imágenes de alta fidelidad **WebP** (`imageOptimizer.js` y scripts de optimización `sharp`) 100% compatible con **iOS (Safari iOS 14+)**, **Android** y navegadores de escritorio.
- **Testing**: Suite completa de pruebas con **Vitest** (pruebas unitarias y de componentes) y **Playwright** (pruebas End-to-End en Desktop Chromium y Mobile Safari iOS).

---

## 2. 🌹 Catálogo Oficial en Supabase (`mypes`)

Se cargaron los **56 arreglos florales oficiales** enviados directamente por el dueño vía WhatsApp (Tandas 1, 2, 3 y 4), estructurados con descripciones profesionales de alta costura:

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

### Tanda 3 (15 Arreglos: Gerberas, Lirios, Estructura Geométrica & Rosas Azules)
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

### Tanda 4 (12 Arreglos: Colección Tulipanes Holandeses & Wood Floral Box)
| # | Título Oficial del Arreglo | Categoría | Precio (S/) | Formato |
| :- | :--- | :--- | :--- | :--- |
| 45 | **Bouquet Dúo Lirios Orientales & Corona Floral** | Delicadeza Pastel & Lirios | S/ 90.00 | WebP + JPG |
| 46 | **Wood Floral Box 7 Rosas & Lirios Silvestres** | Detalles & Combos Especiales | S/ 110.00 | WebP + JPG |
| 47 | **Maxi Bouquet Imperial 12 Tulipanes Rosa Holandés** | Tulipanes Holandeses & Flores de Lujo | S/ 350.00 | WebP + JPG |
| 48 | **Bouquet Alta Costura 6 Tulipanes Rojos** | Tulipanes Holandeses & Flores de Lujo | S/ 190.00 | WebP + JPG |
| 49 | **Bouquet Delicadeza 5 Tulipanes Rosados** | Tulipanes Holandeses & Flores de Lujo | S/ 160.00 | WebP + JPG |
| 50 | **Bouquet Solar 3 Tulipanes Amarillos & Margaritas** | Tulipanes Holandeses & Flores de Lujo | S/ 85.00 | WebP + JPG |
| 51 | **Bouquet Black & White 6 Tulipanes Rosa Pastel** | Tulipanes Holandeses & Flores de Lujo | S/ 200.00 | WebP + JPG |
| 52 | **Bouquet Gold Chic 6 Tulipanes Rosa Pastel** | Tulipanes Holandeses & Flores de Lujo | S/ 200.00 | WebP + JPG |
| 53 | **Maxi Ramo 12 Tulipanes Rojos de Gala** | Tulipanes Holandeses & Flores de Lujo | S/ 270.00 | WebP + JPG |
| 54 | **Bouquet Imperial 10 Tulipanes Bicolores Rojo & Rosa** | Tulipanes Holandeses & Flores de Lujo | S/ 280.00 | WebP + JPG |
| 55 | **Bouquet Primavera 3 Tulipanes Blancos & Girasoles** | Tulipanes Holandeses & Flores de Lujo | S/ 120.00 | WebP + JPG |
| 56 | **Bouquet Royal 8 Tulipanes Púrpura Imperial** | Tulipanes Holandeses & Flores de Lujo | S/ 200.00 | WebP + JPG |

---

## 3. 🖼️ Módulo Convertidor y Optimizador WebP

1. **Scripts CLI Automatizados**:
   - `npm run optimize:images` y scripts de tandas procesan lotes a **WebP 88% sRGB** con respaldos JPG.
2. **Utilidad de Navegador (`src/lib/imageOptimizer.js`)**:
   - Función `convertImageToWebP(file, options)` soportada en **iOS Safari 14+**, iPadOS, Chrome y Firefox.

---

## 4. 🧪 Suite de Pruebas Automatizadas

- **Vitest**: `npm test` ejecuta 7 pruebas unitarias (100% pasadas).
- **Playwright (E2E)**: `npx playwright test` ejecuta 6 pruebas en Desktop Chromium y Mobile Safari iOS (100% pasadas).
