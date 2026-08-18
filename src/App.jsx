import React, { useState, useEffect, useRef } from 'react'
import { 
  CrownPremiumIcon,
  FlowerSparkleIcon,
  HeartMinimalIcon,
  ArrowRightGoldIcon,
  SearchMinimalIcon,
  CloseMinimalIcon,
  InstagramGoldIcon,
  MapPinGoldIcon,
  PhoneGoldIcon,
  WhatsAppGoldIcon
} from './components/PremiumIcons'
import { fetchRoussData, createReservation } from './lib/supabase'

// 14 Official Products from Florería Rouss Owner + Signature Models
const INITIAL_PRODUCTS = [
  {
    id: 'ba000001-0000-4000-a000-000000000011',
    title: 'Ramo Buchón "Sol Radiante" (12 Girasoles)',
    category: 'buchones',
    categories: ['buchones'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 180.00',
    tag: 'Más Vendido',
    image: '/images/products/ramo-buchon-12-girasoles-sol-radiante.webp',
    imageFallback: '/images/products/ramo-buchon-12-girasoles-sol-radiante.jpg',
    description: 'Espectacular bouquet buchón de 12 girasoles frescos seleccionados de tallo largo, envueltos en papel coreano negro de alta costura con cinta satinada y dedicatoria personalizada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000012',
    title: 'Ramo Buchón Imperial 50 Rosas & Trío de Helio',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 300.00',
    tag: 'Edición Especial',
    image: '/images/products/ramo-buchon-50-rosas-globos-helio.webp',
    imageFallback: '/images/products/ramo-buchon-50-rosas-globos-helio.jpg',
    description: 'Imponente ramo buchón compuesto por 50 rosas rojas de exportación en cúpula perfecta, acompañado por tres globos metalizados con helio premium y lazo de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000013',
    title: 'Maxi Ramo Buchón 80 Rosas & 6 Girasoles',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 450.00',
    tag: 'Formato Maxi',
    image: '/images/products/maxi-ramo-buchon-80-rosas-6-girasoles.webp',
    imageFallback: '/images/products/maxi-ramo-buchon-80-rosas-6-girasoles.jpg',
    description: 'Creación monumental de alta floristería que fusiona 80 rosas rojas aterciopeladas con 6 radiantes girasoles centrales en envoltura coreana plisada de máxima elegancia.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000014',
    title: 'Ramo Buchón "Reina Imperial" (80 Rosas)',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 400.00',
    tag: 'Alta Gama',
    image: '/images/products/ramo-buchon-reina-imperial-80-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-reina-imperial-80-rosas.jpg',
    description: 'Majestuoso arreglo buchón de 80 rosas rojas premium en estructura esférica perfecta, decorado con delicadas mariposas doradas y fina envoltura en tono blanco marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000022',
    title: 'Ramo Buchón "Corona de Reina" (50 Rosas)',
    category: 'coronas',
    categories: ['coronas', 'buchones'],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 300.00',
    tag: 'Corona Imperial',
    image: '/images/products/ramo-buchon-corona-reina-50-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-corona-reina-50-rosas.jpg',
    description: 'Ramo buchón de 50 rosas rojas seleccionadas con tiara imperial dorada de cristal brillante, cinta personalizada y acabado de alta gama.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000017',
    title: 'Ramo Buchón Élite 50 Rosas',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 250.00',
    tag: 'Personalizable',
    image: '/images/products/ramo-buchon-elite-50-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-elite-50-rosas.jpg',
    description: 'Distinguido ramo esférico de 50 rosas selectas en armoniosa combinación de tonalidades, diseñado para celebraciones de alto impacto (personalización de billetes opcional).'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000018',
    title: 'Ramo Buchón 40 Rosas & Mariposas de Oro',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 200.00',
    tag: 'Detalle Dorado',
    image: '/images/products/ramo-buchon-40-rosas-mariposas-oro.webp',
    imageFallback: '/images/products/ramo-buchon-40-rosas-mariposas-oro.jpg',
    description: 'Exclusivo bouquet de 40 rosas rojas de invernadero con detalles de mariposas troqueladas en pan de oro y envoltura de seda blanca.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000021',
    title: 'Ramo Buchón Pasión 30 Rosas',
    category: 'rosas',
    categories: ['rosas', 'buchones'],
    categoryName: 'Rosas Premium',
    price: 'S/ 170.00',
    tag: 'Pasión Rouss',
    image: '/images/products/ramo-buchon-pasion-30-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-pasion-30-rosas.jpg',
    description: 'Clásico y apasionado arreglo de 30 rosas rojas frescas con follaje fino, envuelto en papel negro de alta densidad y lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000019',
    title: 'Combo Ternura 20 Rosas, Peluche & Lirio',
    category: 'combos',
    categories: ['combos', 'pastel'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 230.00',
    tag: 'Combo Exclusivo',
    image: '/images/products/combo-ternura-20-rosas-peluche-lirio.webp',
    imageFallback: '/images/products/combo-ternura-20-rosas-peluche-lirio.jpg',
    description: 'Exquisito arreglo en tonalidades pastel con 20 rosas frescas, un lirio aromático y un tierno oso de peluche de colección en envoltura lila.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000020',
    title: 'Bouquet Conservación 20 Rosas & Hidratación',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 150.00',
    tag: 'Larga Duración',
    image: '/images/products/bouquet-conservacion-20-rosas-hidratacion.webp',
    imageFallback: '/images/products/bouquet-conservacion-20-rosas-hidratacion.jpg',
    description: 'Arreglo de 20 rosas rojas con tecnología de esponja floral hidratante en la base para prolongar la vida y frescura de cada pétalo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000016',
    title: 'Bouquet Armonía 12 Rosas & Astromelias',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 160.00',
    tag: 'Diseño Fresco',
    image: '/images/products/bouquet-armonia-12-rosas-astromelias.webp',
    imageFallback: '/images/products/bouquet-armonia-12-rosas-astromelias.jpg',
    description: 'Combinación fresca y vibrante de 12 rosas rojas selectas enmarcada por un delicado contorno de astromelias y follaje silvestre.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000023',
    title: 'Bouquet Esencial 15 Rosas Hidratadas',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 100.00',
    tag: 'Detalle Ideal',
    image: '/images/products/bouquet-esencial-15-rosas-hidratadas.webp',
    imageFallback: '/images/products/bouquet-esencial-15-rosas-hidratadas.jpg',
    description: 'Detalle compacto y distinguido de 15 rosas rojas con base de agua absorbente que garantiza frescura continua en todo momento.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000015',
    title: 'Bouquet Imperial de Lirios Blancos',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 150.00',
    tag: 'Fragancia Sublime',
    image: '/images/products/bouquet-imperial-lirios-blancos.webp',
    imageFallback: '/images/products/bouquet-imperial-lirios-blancos.jpg',
    description: 'Elegante bouquet de 4 varas de lirios orientales blancos de intenso aroma, acompañados de follaje fino y envoltura estructural en papel coreano.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000024',
    title: 'Bouquet Romance 3 Lirios & Rosas Pastel',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 160.00',
    tag: 'Romance Soft',
    image: '/images/products/bouquet-romance-3-lirios-rosas-pastel.webp',
    imageFallback: '/images/products/bouquet-romance-3-lirios-rosas-pastel.jpg',
    description: 'Romántica sinfonía floral compuesta por 3 lirios orientales rosados y rosas en tonos suaves, envueltas en pliegues de papel de seda marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000001',
    title: 'Ramo Propuesta "Corazón & Corona"',
    category: 'propuestas',
    categories: ['propuestas', 'coronas'],
    categoryName: 'Propuestas & Bodas',
    price: 'S/ 280.00',
    tag: 'Firma Rouss',
    image: '/images/product-proposal-crown.jpg',
    imageFallback: '/images/product-proposal-crown.jpg',
    description: 'Espectacular domo de rosas rojas seleccionadas con cinta personalizada "¿Quieres casarte conmigo?", tiara imperial dorada y mariposas de oro refinadas.'
  }
];

// CLIENT GALLERY
const INITIAL_CLIENT_GALLERY = [
  {
    id: 'fa000001-0000-4000-a000-000000000001',
    image: '/images/client-4.jpg',
    title: 'Momentos de Alegría Rouss',
    quote: '"Donde florece el amor, la sonrisa ilumina cada instante."',
    arrangement: 'Combo Girasoles & Oso'
  },
  {
    id: 'fa000001-0000-4000-a000-000000000002',
    image: '/images/client-1.jpg',
    title: 'Entregas Románticas Inolvidables',
    quote: '"Expresando los sentimientos más profundos con la elegancia de nuestras rosas de autor."',
    arrangement: 'Maxi Ramo de Rosas'
  },
  {
    id: 'fa000001-0000-4000-a000-000000000003',
    image: '/images/client-2.jpg',
    title: 'Detalles Exclusivos & Únicos',
    quote: '"Arreglos de alta costura diseñados para celebrar momentos inolvidables."',
    arrangement: 'Rosas Azules Royal'
  },
  {
    id: 'fa000001-0000-4000-a000-000000000004',
    image: '/images/client-3.jpg',
    title: 'Sonrisas & Flores de Autor',
    quote: '"El regalo perfecto para llenar de luz y calidez el día de alguien especial."',
    arrangement: 'Bouquet Radiante de Girasoles'
  }
];

const CATEGORY_NAMES_MAP = {
  'buchones': 'Ramos Buchones & Girasoles',
  'coronas': 'Cumpleaños & Coronales',
  'rosas': 'Rosas Premium',
  'pastel': 'Delicadeza Pastel & Lirios',
  'combos': 'Detalles & Combos Especiales',
  'propuestas': 'Propuestas & Bodas'
};

const CATEGORIES_TABS = [
  { id: 'todos', label: 'Todos los Arreglos' },
  { id: 'buchones', label: 'Ramos Buchones' },
  { id: 'coronas', label: 'Cumpleaños & Coronas' },
  { id: 'rosas', label: 'Rosas Premium' },
  { id: 'pastel', label: 'Lirios & Pastel' },
  { id: 'combos', label: 'Combos & Peluches' },
  { id: 'propuestas', label: 'Propuestas & Bodas' }
];

export default function App() {
  // Dynamic State synchronized with Supabase
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [galleryList, setGalleryList] = useState(INITIAL_CLIENT_GALLERY);
  const [heroBanner, setHeroBanner] = useState({
    imagen: '/images/banner.png',
    subtitulo: '"Cada pétalo cuenta una historia inolvidable" · Explora la Colección Imperial',
    link: '/catalogo'
  });

  // Page state initialized from URL path / hash
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('catalogo') || hash.includes('catalogo')) {
        return 'catalogo';
      }
    }
    return 'inicio';
  });

  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ocasion: 'Ramo Buchón de Impacto',
    presupuesto: 'S/ 200 - S/ 350',
    fechaEntrega: '',
    mensaje: ''
  });

  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Fetch real-time data from Supabase 'mypes' database
  useEffect(() => {
    let isMounted = true;
    async function loadSupabaseData() {
      const data = await fetchRoussData();
      if (!isMounted) return;

      // Update Banner from Supabase
      if (data.banners && data.banners.length > 0) {
        const primaryBanner = data.banners[0];
        setHeroBanner({
          imagen: primaryBanner.imagen || '/images/banner.png',
          subtitulo: primaryBanner.subtitulo || '"Cada pétalo cuenta una historia inolvidable" · Explora la Colección Imperial',
          link: primaryBanner.link || '/catalogo'
        });
      }

      // Update Products from Supabase
      if (data.products && data.products.length > 0) {
        const mappedProducts = data.products.map(p => {
          const catArray = Array.isArray(p.category) && p.category.length > 0 ? p.category : [p.slug || 'rosas'];
          const primaryCat = catArray[0];
          return {
            id: p.id,
            title: p.title,
            category: primaryCat,
            categories: catArray,
            categoryName: CATEGORY_NAMES_MAP[primaryCat] || 'Colección Rouss',
            price: `S/ ${parseFloat(p.price || p.precio_base || 0).toFixed(2)}`,
            tag: p.badge || 'Exclusivo',
            image: p.image || '/images/products/ramo-buchon-12-girasoles-sol-radiante.webp',
            imageFallback: p.image ? p.image.replace('.webp', '.jpg') : '/images/product-red-roses.jpg',
            description: p.description || p.descripcion_corta || ''
          };
        });
        setProductsList(mappedProducts);
      }

      // Update Testimonios / Moments from Supabase
      if (data.testimonios && data.testimonios.length > 0) {
        const mappedTestimonios = data.testimonios.map(t => ({
          id: t.id,
          image: t.imagen || '/images/client-1.jpg',
          title: t.nombre || 'Momento Rouss',
          quote: t.texto || '',
          arrangement: t.ocasion || 'Arreglo de Autor'
        }));
        setGalleryList(mappedTestimonios);
      }
    }

    loadSupabaseData();
    return () => { isMounted = false; };
  }, []);

  // Switch page and update browser address bar URL cleanly (/catalogo)
  const navigateToPage = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'catalogo') {
      window.history.pushState({ page: 'catalogo' }, '', '/catalogo');
    } else {
      window.history.pushState({ page: 'inicio' }, '', '/');
    }
  };

  // Sync browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('catalogo') || hash.includes('catalogo')) {
        setCurrentPage('catalogo');
      } else {
        setCurrentPage('inicio');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filter products by search text and category (supports array category matching)
  const filteredProducts = productsList.filter(p => {
    const productCategories = p.categories || [p.category];
    const matchesCategory = activeCategory === 'todos' || 
                            p.category === activeCategory || 
                            productCategories.includes(activeCategory);
                            
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // WhatsApp Handlers (+51 921 585 977)
  const handleWhatsAppOrder = (productName) => {
    const message = encodeURIComponent(`Hola Florería Rouss, me gustaría solicitar información y disponibilidad de: *${productName}*.`);
    window.open(`https://wa.me/51921585977?text=${message}`, '_blank');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { nombre, telefono, ocasion, presupuesto, fechaEntrega, mensaje } = formData;
    
    // Save to Supabase 'reservations' asynchronously
    createReservation({ nombre, telefono, ocasion, presupuesto, fechaEntrega, mensaje });

    const messageText = `Hola Florería Rouss, solicito una cotización personalizada:
📌 *Nombre*: ${nombre || 'No especificado'}
📱 *Teléfono*: ${telefono || 'No especificado'}
🌹 *Ocasión*: ${ocasion}
💰 *Presupuesto*: ${presupuesto}
📅 *Fecha de Entrega*: ${fechaEntrega || 'Por coordinar'}
💬 *Detalles / Dedicatoria*: ${mensaje || 'Sin mensaje especificado'}`;

    window.open(`https://wa.me/51921585977?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <div className="site-wrapper">

      {/* TOP INFINITE AUTO-SCROLLING TICKER MARQUEE */}
      <div className="top-promo-bar-wrapper">
        <div className="top-promo-ticker">
          <div className="promo-ticker-track">
            <div className="promo-item">
              <span>✨ Envíos Express de Rosas Premium en Lima & Callao</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>👑 Ramos Buchones & Arreglos Imperiales con Tiaras</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>💬 WhatsApp: <strong>+51 921 585 977</strong></span>
            </div>
            <span className="promo-divider">|</span>

            {/* Loop Duplicate Track */}
            <div className="promo-item">
              <span>✨ Envíos Express de Rosas Premium en Lima & Callao</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>👑 Ramos Buchones & Arreglos Imperiales con Tiaras</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>💬 WhatsApp: <strong>+51 921 585 977</strong></span>
            </div>
            <span className="promo-divider">|</span>
          </div>
        </div>
      </div>
      
      {/* 1. HEADER & NAVIGATION */}
      <header className="site-header">
        <div className="container header-container">
          <div className="logo-link" onClick={() => navigateToPage('inicio')}>
            <img 
              src="/images/logo-header.png" 
              alt="Florería Rouss Logo" 
              className="logo-img" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-wrapper">
            <ul className="nav-menu">
              <li>
                <button 
                  className={`nav-button ${currentPage === 'inicio' ? 'active' : ''}`}
                  onClick={() => navigateToPage('inicio')}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  className={`nav-button ${currentPage === 'catalogo' ? 'active' : ''}`}
                  onClick={() => navigateToPage('catalogo')}
                >
                  Catálogo Exclusivo
                </button>
              </li>
              {currentPage === 'inicio' && (
                <>
                  <li><a href="#clientes" className="nav-button">Galería Rouss</a></li>
                  <li><a href="#cotizacion" className="nav-button">Cotizar a Medida</a></li>
                  <li><a href="#nosotros" className="nav-button">Sobre Rouss</a></li>
                </>
              )}
            </ul>
          </nav>

          <div className="header-actions">
            <button 
              onClick={() => handleWhatsAppOrder('Consulta General')} 
              className="btn-whatsapp-solid"
              title="Pedir por WhatsApp"
            >
              <WhatsAppGoldIcon size={18} color="#FFFFFF" />
              <span>Pedir por WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Menú de Navegación"
            >
              {mobileMenuOpen ? <CloseMinimalIcon size={22} /> : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="mobile-drawer-link"
          onClick={() => navigateToPage('inicio')}
        >
          Inicio
        </button>
        <button 
          className="mobile-drawer-link"
          onClick={() => navigateToPage('catalogo')}
        >
          Catálogo Exclusivo
        </button>
        {currentPage === 'inicio' && (
          <>
            <a href="#clientes" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Galería Rouss</a>
            <a href="#cotizacion" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Cotizar a Medida</a>
            <a href="#nosotros" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Sobre Rouss</a>
          </>
        )}
        <button 
          onClick={() => { handleWhatsAppOrder('Consulta General'); setMobileMenuOpen(false); }} 
          className="btn-whatsapp-solid"
          style={{ width: '100%', borderRadius: 'var(--radius-full)', marginTop: '0.5rem', padding: '0.8rem' }}
        >
          <WhatsAppGoldIcon size={20} color="#FFFFFF" />
          <span style={{ display: 'inline' }}>Contactar por WhatsApp</span>
        </button>
      </div>

      {/* RENDER PAGE: INICIO VS DEDICATED CATALOG PAGE */}
      {currentPage === 'inicio' ? (
        <main>
          {/* FULL-WIDTH HERO BANNER - DYNAMIC FROM SUPABASE */}
          <section className="hero-banner-section-full">
            <div 
              className="hero-banner-full-card"
              onClick={() => navigateToPage('catalogo')}
              role="button"
              tabIndex={0}
              title="Explorar Colección de Productos"
              onKeyDown={(e) => e.key === 'Enter' && navigateToPage('catalogo')}
            >
              <img 
                src={heroBanner.imagen} 
                alt="Florería Rouss Banner Full Width" 
                className="hero-banner-full-img"
              />
            </div>

            {/* CLEAN POETIC BANNER BAR - DYNAMIC FROM SUPABASE */}
            <div 
              className="banner-hint-bar" 
              onClick={() => navigateToPage('catalogo')}
              title="Explorar la Colección Imperial Rouss"
            >
              <span>{heroBanner.subtitulo}</span>
            </div>
          </section>

          {/* SECTION 2: FEATURES WITH HIGH-RES THUMBNAILS */}
          <section className="features-section">
            <div className="container">
              <div className="features-grid">
                <div className="feature-card-image">
                  <picture>
                    <source srcSet="/images/products/ramo-buchon-12-girasoles-sol-radiante.webp" type="image/webp" />
                    <img 
                      src="/images/products/ramo-buchon-12-girasoles-sol-radiante.jpg" 
                      alt="Ramos Buchones de Lujo" 
                      className="feature-img-thumb"
                    />
                  </picture>
                  <h3 className="feature-title">Ramos Buchones de Lujo</h3>
                  <p className="feature-desc">Arreglos monumentales desde 12 hasta 80 rosas y girasoles con envoltura coreana de alta costura.</p>
                </div>

                <div className="feature-card-image">
                  <picture>
                    <source srcSet="/images/products/ramo-buchon-corona-reina-50-rosas.webp" type="image/webp" />
                    <img 
                      src="/images/products/ramo-buchon-corona-reina-50-rosas.jpg" 
                      alt="Diseños de Autor Únicos" 
                      className="feature-img-thumb"
                    />
                  </picture>
                  <h3 className="feature-title">Diseños de Autor Únicos</h3>
                  <p className="feature-desc">Creaciones exclusivas firmadas por Jharol Baldeón con tiaras imperiales, mariposas doradas y globos de helio.</p>
                </div>

                <div className="feature-card-image">
                  <picture>
                    <source srcSet="/images/products/bouquet-conservacion-20-rosas-hidratacion.webp" type="image/webp" />
                    <img 
                      src="/images/products/bouquet-conservacion-20-rosas-hidratacion.jpg" 
                      alt="Envío Express Puntual" 
                      className="feature-img-thumb"
                    />
                  </picture>
                  <h3 className="feature-title">Envío Express & Hidratación</h3>
                  <p className="feature-desc">Tecnología de esponja absorbente para máxima conservación y entregas cuidadosas en Lima y Callao.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: DRAMATIC DARK FLORAL BACKGROUND EFFECT */}
          <section className="catalog-callout-bg-img">
            <div className="container">
              <div className="catalog-callout-content">
                <span className="section-tag" style={{ background: 'rgba(197, 155, 39, 0.25)', color: '#D4AF37', border: '1px solid #D4AF37', marginBottom: '1rem' }}>
                  Colección Rouss
                </span>
                <h2>Alta Floristería a tu Alcance</h2>
                <p>
                  Explora nuestra colección oficial de ramos buchones, coronas de cristal y arreglos de autor.
                </p>
                
                <button 
                  onClick={() => navigateToPage('catalogo')} 
                  className="btn-solid-gold"
                >
                  <span>Ver Catálogo Completo ({productsList.length} Arreglos)</span>
                  <ArrowRightGoldIcon size={18} color="#121110" />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 4: GALERÍA ROUSS */}
          <section id="clientes" className="clients-section">
            <div className="container">
              <div className="text-center">
                <span className="section-tag">
                  <HeartMinimalIcon size={14} color="#C59B27" /> Momentos & Frases
                </span>
                <h2 className="section-title">Galería de Momentos Rouss</h2>
                <p className="section-subtitle">
                  Expresiones de amor y alegría plasmadas en nuestros arreglos florales de autor.
                </p>
              </div>

              <div className="slider-container-mobile">
                <button 
                  className="slider-arrow-btn slider-arrow-left"
                  onClick={() => scrollSlider('left')}
                  title="Anterior"
                >
                  ‹
                </button>

                <div className="slider-wrapper-flex" ref={sliderRef}>
                  {galleryList.map((item) => (
                    <div key={item.id} className="slider-item-card">
                      <div 
                        className="client-card-solid"
                        onClick={() => setSelectedItem(item)}
                        title="Haz clic para ampliar la foto"
                      >
                        <div className="client-img-wrapper">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="client-img" 
                          />
                          <div className="client-card-overlay-solid">
                            <span className="client-tag">{item.arrangement}</span>
                            <p className="client-quote">{item.quote}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="slider-arrow-btn slider-arrow-right"
                  onClick={() => scrollSlider('right')}
                  title="Siguiente"
                >
                  ›
                </button>
              </div>

            </div>
          </section>

          {/* SECTION 5: PROFESSIONAL QUOTE FORM */}
          <section id="cotizacion" className="custom-quote-section">
            <div className="container">
              <div className="text-center" style={{ marginBottom: '1.5rem' }}>
                <span className="section-tag">
                  <CrownPremiumIcon size={14} color="#C59B27" /> Cotización Exclusiva
                </span>
                <h2 className="section-title">Diseña tu Arreglo a la Medida</h2>
                <p className="section-subtitle">
                  Completa este sencillo formulario para recibir una propuesta personalizada directa a tu WhatsApp por <strong>Jharol Baldeón</strong>.
                </p>
              </div>

              <div className="quote-form-card">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-grid-2col">
                    
                    <div className="form-group">
                      <label className="form-label">Nombre Completo *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. Luciana García" 
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Teléfono / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Ej. +51 987 654 321" 
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tipo de Arreglo u Ocasión</label>
                      <select 
                        value={formData.ocasion}
                        onChange={(e) => setFormData({...formData, ocasion: e.target.value})}
                        className="form-select"
                      >
                        <option value="Ramo Buchón de Rosas & Girasoles">Ramo Buchón de Rosas & Girasoles</option>
                        <option value="Cumpleaños con Tiara de Cristal">Cumpleaños con Tiara de Cristal</option>
                        <option value="Propuesta de Matrimonio">Propuesta de Matrimonio</option>
                        <option value="Aniversario Romántico">Aniversario Romántico</option>
                        <option value="Bouquet de Lirios & Rosas Pastel">Bouquet de Lirios & Rosas Pastel</option>
                        <option value="Combo Especial con Peluche">Combo Especial con Peluche</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Presupuesto Estimado</label>
                      <select 
                        value={formData.presupuesto}
                        onChange={(e) => setFormData({...formData, presupuesto: e.target.value})}
                        className="form-select"
                      >
                        <option value="S/ 100 - S/ 180">S/ 100 - S/ 180</option>
                        <option value="S/ 180 - S/ 300">S/ 180 - S/ 300</option>
                        <option value="S/ 300 - S/ 450 (Formato Maxi)">S/ 300 - S/ 450 (Formato Maxi)</option>
                        <option value="S/ 450+ Arreglo Monumental">S/ 450+ Arreglo Monumental</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Fecha Deseada de Entrega</label>
                      <input 
                        type="date" 
                        value={formData.fechaEntrega}
                        onChange={(e) => setFormData({...formData, fechaEntrega: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Mensaje / Dedicatoria / Detalles Especiales</label>
                      <textarea 
                        rows="3"
                        placeholder="Escribe aquí si deseas incluir una frase especial en la cinta satinada, globos de helio o una nota personalizada..." 
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        className="form-textarea"
                      ></textarea>
                    </div>

                  </div>

                  <button type="submit" className="btn-submit-form">
                    <WhatsAppGoldIcon size={20} color="#FFFFFF" />
                    <span>Enviar Solicitud por WhatsApp</span>
                  </button>
                </form>
              </div>

            </div>
          </section>

          {/* SOBRE FLORERIA ROUSS */}
          <section id="nosotros" className="about-section">
            <div className="container">
              <div className="about-grid">
                <div className="about-showcase-frame">
                  <picture>
                    <source srcSet="/images/products/ramo-buchon-reina-imperial-80-rosas.webp" type="image/webp" />
                    <img 
                      src="/images/products/ramo-buchon-reina-imperial-80-rosas.jpg" 
                      alt="Arreglo de Autor Rouss by Jharol Baldeón" 
                      className="about-img"
                    />
                  </picture>
                </div>

                <div className="about-text">
                  <span className="section-tag">
                    <CrownPremiumIcon size={14} color="#C59B27" /> Marca de Autor
                  </span>
                  <h2>Elegancia & Sofisticación en Cada Pétalo</h2>
                  <p>
                    <strong>Florería Rouss by Jharol Baldeón</strong> es una marca registrada de alta floristería especializada en ramos buchones, rosas de exportación y arreglos con tiaras imperiales de cristal.
                  </p>
                  <p>
                    Cada obra floral es concebida con técnicas exclusivas de diseño para aniversarios, cumpleaños, propuestas de matrimonio y momentos que perduran para siempre.
                  </p>

                  <div className="about-stats">
                    <div className="stat-item">
                      <span className="stat-number">100%</span>
                      <span className="stat-label">Flores Selectas</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">+1000</span>
                      <span className="stat-label">Momentos Felices</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">★ 5.0</span>
                      <span className="stat-label">Valoración Clientes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* DEDICATED EXCLUSIVE CATALOG PAGE (WITH NO HORIZONTAL SCROLL) */
        <div className="catalog-page-wrapper">
          <div className="container">
            
            <div className="catalog-header-minimal">
              <span className="section-tag">
                <FlowerSparkleIcon size={14} color="#C59B27" /> Catálogo Oficial
              </span>
              <h1>Colección Imperial Rouss</h1>
              <p>
                {productsList.length} diseños de autor elaborados con las mejores rosas y flores frescas. Selecciona tu arreglo favorito para solicitarlo directamente vía WhatsApp.
              </p>
            </div>

            {/* SEARCH & CATEGORY SELECT BAR */}
            <div className="catalog-bar-minimal">
              <div className="search-input-wrapper">
                <SearchMinimalIcon size={18} color="#C59B27" />
                <input 
                  type="text" 
                  placeholder="Buscar arreglo (ej. Buchón, Girasoles, Corona, Lirios)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <CloseMinimalIcon size={16} color="#8C857B" />
                  </button>
                )}
              </div>

              {/* Desktop Filter Pills */}
              <div className="catalog-filter-pills desktop-pills-flex">
                {CATEGORIES_TABS.map(cat => (
                  <button 
                    key={cat.id}
                    className={`pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Mobile Category Dropdown Selector */}
              <div className="mobile-category-selector-wrapper">
                <select 
                  value={activeCategory} 
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="mobile-category-select"
                >
                  <option value="todos">🌹 Todos los Arreglos ({productsList.length})</option>
                  <option value="buchones">👑 Ramos Buchones & Girasoles</option>
                  <option value="coronas">💎 Cumpleaños & Coronas</option>
                  <option value="rosas">💐 Rosas Premium</option>
                  <option value="pastel">🌸 Lirios & Pastel</option>
                  <option value="combos">🧸 Combos & Peluches</option>
                  <option value="propuestas">💍 Propuestas & Bodas</option>
                </select>
              </div>

            </div>

            {/* PRODUCTS GRID */}
            <div className="products-grid-minimal">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card-minimal">
                  <div className="product-img-wrapper" onClick={() => setSelectedItem(product)}>
                    <picture>
                      {product.image && product.image.endsWith('.webp') && (
                        <source srcSet={product.image} type="image/webp" />
                      )}
                      <img 
                        src={product.imageFallback || product.image} 
                        alt={product.title} 
                        className="product-img" 
                        loading="lazy"
                      />
                    </picture>
                    <span className="product-badge">{product.tag}</span>
                  </div>
                  
                  <div className="product-content">
                    <span className="product-category">{product.categoryName}</span>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-desc">{product.description}</p>
                    
                    <div className="product-footer">
                      <div className="product-price">
                        <span className="price-value">{product.price}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleWhatsAppOrder(product.title)}
                      className="btn-order-wa-solid"
                    >
                      <WhatsAppGoldIcon size={18} color="#FFFFFF" />
                      <span>Pedir por WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ fontSize: '1.1rem', color: '#8C857B', marginBottom: '1rem' }}>
                  No se encontraron arreglos para "{searchQuery}".
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                  className="btn-solid-gold"
                  style={{ fontSize: '0.875rem', padding: '0.6rem 1.5rem' }}
                >
                  Ver Todos los Arreglos
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/images/logo-footer.png" alt="Rouss Logo" className="footer-logo" />
              <p className="footer-desc">
                Florería Rouss - Especialistas en ramos buchones, rosas de exportación y flores premium. Diseños de alta costura para momentos inolvidables.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Navegación</h4>
              <ul className="footer-links">
                <li>
                  <button onClick={() => navigateToPage('inicio')}>Inicio</button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('catalogo')}>Catálogo Exclusivo</button>
                </li>
                {currentPage === 'inicio' && (
                  <>
                    <li><a href="#clientes">Galería Rouss</a></li>
                    <li><a href="#cotizacion">Cotizar a Medida</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Colecciones</h4>
              <ul className="footer-links">
                <li>
                  <button onClick={() => { navigateToPage('catalogo'); setActiveCategory('buchones'); }}>
                    Ramos Buchones
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo'); setActiveCategory('coronas'); }}>
                    Cumpleaños & Coronas
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo'); setActiveCategory('rosas'); }}>
                    Rosas Premium
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo'); setActiveCategory('pastel'); }}>
                    Lirios & Pastel
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Atención Directa</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <PhoneGoldIcon size={18} color="#C59B27" />
                  <span>+51 921 585 977 (WhatsApp)</span>
                </div>
                <div className="contact-item">
                  <InstagramGoldIcon size={18} color="#C59B27" />
                  <a href="https://instagram.com/rouss8439" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                    @rouss8439
                  </a>
                </div>
                <div className="contact-item">
                  <MapPinGoldIcon size={18} color="#C59B27" />
                  <span>Código de Atención: 15067 | Lima, Perú</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Florería Rouss. Todos los derechos reservados.</p>
            <p>Rouss By Jharol Baldeón</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/51921585977?text=Hola%20Florer%C3%ADa%20Rouss,%20deseo%20consultar%20por%20sus%20arreglos%20florales" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-wa-btn"
        title="Consultar por WhatsApp con Florería Rouss"
      >
        <WhatsAppGoldIcon size={30} color="#FFFFFF" />
      </a>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedItem(null)}>
              <CloseMinimalIcon size={18} color="#FFFFFF" />
            </button>
            
            <div className="modal-img-wrapper">
              <picture>
                {selectedItem.image && selectedItem.image.endsWith('.webp') && (
                  <source srcSet={selectedItem.image} type="image/webp" />
                )}
                <img src={selectedItem.imageFallback || selectedItem.image} alt={selectedItem.title} className="modal-img" />
              </picture>
            </div>

            <div className="modal-info">
              <span className="section-tag" style={{ marginBottom: '0.85rem' }}>
                <FlowerSparkleIcon size={14} color="#C59B27" /> {selectedItem.categoryName || 'Detalle Exclusivo'}
              </span>
              
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                {selectedItem.title}
              </h3>
              
              {selectedItem.quote ? (
                <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: '#57534E', marginBottom: '1.25rem' }}>
                  {selectedItem.quote}
                </p>
              ) : (
                <>
                  <p style={{ color: '#57534E', marginBottom: '0.85rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {selectedItem.description}
                  </p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#96761A', marginBottom: '1.25rem' }}>
                    {selectedItem.price}
                  </p>
                </>
              )}

              <button 
                onClick={() => handleWhatsAppOrder(selectedItem.title)} 
                className="btn-whatsapp-solid"
                style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}
              >
                <WhatsAppGoldIcon size={20} color="#FFFFFF" />
                <span style={{ display: 'inline' }}>Pedir este arreglo por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
