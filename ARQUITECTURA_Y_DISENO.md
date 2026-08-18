# 🌸 Documentación Exhaustiva de Arquitectura, Funciones, Catálogo y Sistema de Diseño — Florería Rouss

---

## 1. 🏢 Información Oficial del Negocio Integrada

| Atributo | Detalle Oficial Registrado |
| :--- | :--- |
| **Marca / Razón Comercial** | Florería Rouss by Jharol Baldeón |
| **Teléfono / WhatsApp** | `+51 941 493 471` (`941493471`) |
| **Dirección Física** | Av. Alameda Sur cruce con Av. Los Incas, Chorrillos, Lima, Perú |
| **Años en el Rubro** | 3 Años de Trayectoria en Alta Floristería |
| **Pedidos Entregados** | +1,000 Pedidos Seguros Entregados |
| **Zonas de Delivery** | Envíos a todo Lima Metropolitana y Callao (tarifa acorde a la distancia) |
| **Instagram Oficial** | [@rouss8439](https://instagram.com/rouss8439) |
| **Facebook Oficial** | [Florería Rouss](https://www.facebook.com/share/18MDdziT14/) |

---

## 2. 🔗 Módulo de Compartir Producto & Enlaces Directos (Deep-Linking)

Se implementó el sistema de difusión viral y compartición individual por producto:

1. **Enlaces Directos Únicos por Producto**:
   - Cada producto cuenta con su URL personalizada: `/catalogo?producto=[slug]` (ejemplo: `/catalogo?producto=maxi-bouquet-imperial-12-tulipanes-rosa-holandes`).
   - Al abrir este enlace, la web abre automáticamente el modal con la fotografía en alta resolución, descripción y botón de WhatsApp listos.
2. **Web Share API Nativo (Móviles iOS / Android)**:
   - Al presionar el botón de compartir en celulares, se abre la hoja nativa de compartir para enviar directamente a WhatsApp, Instagram Stories, Facebook, Telegram, Messenger o SMS con título y precio preconfigurados.
3. **Copiado al Portapapeles con Notificación Toast (Desktop & Fallback)**:
   - Si se usa en computadoras, copia inmediatamente el enlace al portapapeles y despliega una notificación flotante dorada (*Toast*): `"¡Enlace del arreglo copiado al portapapeles!"`.
4. **Botones de Compartir**:
   - **En cada tarjeta del catálogo**: Botón circular dorado con icono vectorial `ShareMinimalIcon`.
   - **Dentro del modal Lightbox**: Botón estilizado *"Compartir este Arreglo / Copiar Enlace"*.

---

## 3. 🏗️ Arquitectura Técnica del Frontend

### 3.1 Stack Tecnológico Core
- **Framework**: React 18 + Vite (SPA de alto rendimiento con Hot Module Replacement).
- **Estilos**: **Vanilla CSS nativo** estructurado mediante CSS Custom Properties (`:root`), sin frameworks CSS invasivos ni dependencias pesadas.
- **Tipografía**: **Poppins** (Google Fonts: 400, 500, 600, 700) aplicada globalmente.
- **Iconografía**: Módulo vectorial SVG nativo parametrizable en color dorado champagne (`PremiumIcons.jsx`), escalable y sin pérdida de nitidez. **Sin emojis informales para preservar una línea gráfica de alta gama.**
- **Enrutamiento & Sincronización**: HTML5 History API (`window.history.pushState` y escucha `popstate`) sincronizado con rutas `/`, `/catalogo` y parámetros `?producto=slug`.
- **Optimización de Imágenes**: Convertidor de imágenes de alta fidelidad **WebP** (`imageOptimizer.js` y scripts de optimización `sharp`) 100% compatible con **iOS (Safari iOS 14+)**, **Android** y navegadores de escritorio.
- **Testing**: Suite completa de pruebas con **Vitest** (pruebas unitarias y de componentes) y **Playwright** (pruebas End-to-End en Desktop Chromium y Mobile Safari iOS).
