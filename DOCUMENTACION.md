# 📚 DOCUMENTACIÓN TÉCNICA Y OPERATIVA — FLORERÍA ROUSS

**Plataforma Web Oficial:** [https://floreriarouss.com](https://floreriarouss.com)  
**Titular & Marca:** Florería Rouss By Jharol Baldeón  
**Sede Principal:** Av. Alameda Sur cruce con Av. Los Incas, Chorrillos, Lima - Perú  
**WhatsApp Oficial:** [+51 941 493 471](https://wa.me/51941493471)  
**Repositorio GitHub:** [https://github.com/lovableprojectscx/Rouss.git](https://github.com/lovableprojectscx/Rouss.git)  

---

## 1. 🏗️ Arquitectura del Sistema

```
                               ┌─────────────────────────────────────────┐
                               │       FLORERÍA ROUSS FRONTEND           │
                               │  React 18 + Vite + Pure SVG (0 KB)      │
                               │  https://floreriarouss.com              │
                               └────────────────────┬────────────────────┘
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 │                                                                     │
                 ▼                                                                     ▼
  ┌─────────────────────────────┐                                       ┌─────────────────────────────┐
  │   SUPABASE MULTI-TENANT     │                                       │   WHATSAPP DIRECT COMMERCE  │
  │   Project: mypes            │                                       │   +51 941 493 471           │
  │   Tenant ID:                │                                       │   Pedidos con código,       │
  │   a0eebc99-9c0b-4ef8-...    │                                       │   producto y precio         │
  └──────────────┬──────────────┘                                       └─────────────────────────────┘
                 │
    ┌────────────┴────────────┬────────────────────────┬────────────────────────┐
    ▼                         ▼                        ▼                        ▼
┌──────────────┐       ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ reclamaciones│       │ reservations │         │   products   │         │  categories  │
│  (INDECOPI)  │       │(Cotizaciones)│         │(56 Arreglos) │         │ (Colecciones)│
└──────────────┘       └──────────────┘         └──────────────┘         └──────────────┘
```

---

## 2. 🗄️ Conexión Multi-Tenant a Base de Datos (Supabase)

La plataforma opera bajo un modelo de arquitectura **Multi-Tenant** compartida y aislada por `tenant_id`, permitiendo escalabilidad y seguridad con **Row Level Security (RLS)**.

### Configuración del Tenant:
- **Supabase URL:** `https://llasbukvdjlvwlgofgke.supabase.co`
- **Tenant ID (Florería Rouss):** `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`
- **Tenant Slug:** `rouss`
- **Archivo de Conexión:** `src/lib/supabase.js`

### Tablas y Esquemas en Supabase:

#### A. Tabla `public.reclamaciones` (Libro de Reclamaciones Virtual INDECOPI)
Diseñada conforme a la **Ley N° 29571** y **D.S. N° 011-2011-PCM**:
* `id` (UUID, Primary Key)
* `tenant_id` (UUID, Foreign Key a `tenants.id`)
* `codigo_reclamacion` (VARCHAR, Unique - Ej: `ROUSS-LR-2026-8942`)
* `tipo_documento` (DNI / CE / RUC / Pasaporte)
* `numero_documento` (VARCHAR)
* `nombre_completo` (VARCHAR)
* `email` (VARCHAR - Notificaciones oficiales)
* `telefono` (VARCHAR)
* `departamento`, `provincia`, `distrito`, `direccion` (Domicilio del reclamante)
* `es_menor_edad` (BOOLEAN) / `nombre_apoderado` (VARCHAR)
* `tipo_bien` (Producto / Servicio)
* `monto_reclamado` (NUMERIC)
* `descripcion_bien` (TEXT)
* `tipo_reclamacion` (Reclamo vs Queja)
* `detalle_reclamacion` (TEXT)
* `pedido_consumidor` (TEXT)
* `estado` (PENDIENTE, EN_REVISION, ATENDIDO, RECHAZADO)
* `fecha_respuesta` (TIMESTAMPTZ - Plazo legal de 15 días hábiles según Ley N° 31435)

#### B. Tabla `public.reservations` (Cotizaciones y Pedidos a Medida)
* `id` (UUID, Primary Key)
* `tenant_id` (UUID)
* `name`, `phone`, `delivery_date`, `notes`, `message`, `dedication`
* `tracking_code` (VARCHAR - Ej: `RS-4821`)
* `payment_method` (`WhatsApp`)
* `status` (`pendiente`)

#### C. Tablas de Catálogo y Contenido
* `products`: 56 arreglos florales activos con fotos, precios en Soles, descripciones y badges.
* `categories`: Tulipanes, Ramos Buchones, Rosas, Coronas, Pastel, Combos, Propuestas.
* `banners`, `testimonios`, `tenant_settings`.

---

## 3. ⚖️ Cumplimiento Legal Peruano (INDECOPI & Privacidad)

1. **Libro de Reclamaciones Virtual:**
   - Botón oficial con isotipo de INDECOPI en el pie de página.
   - Formulario por pasos con validación de DNI (8 dígitos).
   - Generación automática de código correlativo único `ROUSS-LR-YYYY-XXXX`.
   - **📥 Generador de Hoja de Reclamación (PDF):** El consumidor puede descargar o imprimir su Hoja de Reclamación membretada en formato oficial de forma inmediata.
   - **📲 Notificación a WhatsApp:** Envío de constancia con código al florista.
   - **Plazo Improrrogable:** 15 días hábiles conforme a la Ley N° 31435.
2. **Ley de Protección de Datos Personales (Ley N° 29733):**
   - Modal interactivo con políticas de privacidad y derechos ARCO.
   - Consentimiento explícito obligatorio en formularios.

---

## 4. 🤖 Ecosistema GEO (Generative Engine Optimization) & SEO Local

Archivos estandarizados en la raíz para indexación en Google y motores de Inteligencia Artificial (ChatGPT, Perplexity, Gemini, Claude, Copilot):

| Archivo | Ruta | Propósito |
|---|---|---|
| **`llms.txt`** | `/llms.txt` | Estándar de IA: Resumen, sede Chorrillos, distritos de delivery, pagos y catálogo |
| **`llms-full.txt`** | `/llms-full.txt` | Contexto completo: 56 productos detallados con precios en PEN y preguntas frecuentes |
| **`robots.txt`** | `/robots.txt` | Permite rastreo de bots tradicionales (Googlebot) y bots de IA (GPTBot, ClaudeBot) |
| **`sitemap.xml`** | `/sitemap.xml` | Mapa del sitio con deep links por categoría e imágenes en alta resolución |
| **Schema JSON-LD** | `index.html` | `@type: "Florist"`, GPS `-12.1812, -77.0142`, distritos y horario 08:00 - 22:00 |

---

## 5. 📱 Experiencia Móvil & Deep Linking

1. **Cuadrícula de 2 Columnas:** 2 productos por fila en celulares (`aspect-ratio: 1/1`), evitando el scroll infinito y acelerando la compra.
2. **Deep Links por Categoría:**
   - `floreriarouss.com/catalogo?categoria=rosas`
   - `floreriarouss.com/catalogo?categoria=tulipanes`
   - `floreriarouss.com/catalogo?categoria=buchones`
   - `floreriarouss.com/catalogo?categoria=coronas`
   - `floreriarouss.com/catalogo?categoria=combos`
   - `floreriarouss.com/catalogo?categoria=pastel`
   - `floreriarouss.com/catalogo?categoria=propuestas`

---

## 6. 🧪 Guía de Comandos y Verificación de Pruebas

### Servidor de Desarrollo Local
```bash
npm run dev
# Disponible en: http://localhost:3000
```

### Ejecutar Pruebas Unitarias & Integración (Vitest)
```bash
npm test
# Ejecuta 14 pruebas: multi-tenant, catálogo, SEO y Libro de Reclamaciones
```

### Ejecutar Pruebas End-to-End (Playwright)
```bash
npx playwright test
# Ejecuta 12 pruebas completas en Desktop Chromium y Mobile Safari (iOS)
```

### Compilar para Producción (Build)
```bash
npm run build
# Genera el bundle optimizado en /dist (1.36s, 127 KB gzip)
```

---

## 7. 📞 Contacto y Soporte
- **Desarrollo & Mantenimiento:** IDENZA / Equipo de Ingeniería
- **Cliente:** Florería Rouss By Jharol Baldeón
- **Ubicación:** Chorrillos, Lima - Perú
