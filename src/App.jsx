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

// Fallback & Initial State Data - PURE PRODUCT CLOSE-UPS ONLY
const INITIAL_PRODUCTS = [
  {
    id: 'ba000001-0000-4000-a000-000000000001',
    title: 'Ramo Propuesta "Corazón & Corona"',
    category: 'propuestas',
    categoryName: 'Propuestas & Bodas',
    price: 'S/ 280.00',
    tag: 'Más Vendido',
    image: '/images/product-proposal-crown.jpg',
    description: 'Espectacular domo de rosas rojas seleccionadas con cinta personalizada "¿Quieres casarte conmigo?", tiara imperial dorada y mariposas de oro refinadas.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000002',
    title: 'Ramo de Cumpleaños Imperial',
    category: 'coronas',
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 240.00',
    tag: 'Edición Especial',
    image: '/images/product-birthday-crown.jpg',
    description: 'Arreglo estelar en rosas rojas intensas y flores blancas finas, coronado con una tiara de cristal brillante y lazo con dedicatoria "Feliz Cumpleaños".'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000003',
    title: 'Ramo Bouquet Rouss Clásico',
    category: 'rosas',
    categoryName: 'Rosas Premium',
    price: 'S/ 190.00',
    tag: 'Clásico Exclusivo',
    image: '/images/product-red-roses.jpg',
    description: 'Bouquet de rosas rojas de exportación con envoltura de alta costura en tonos oscuros, detalles en baby breath y tarjeta distintiva Rouss.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000004',
    title: 'Ramo Temático "Gol de Amor"',
    category: 'tematicos',
    categoryName: 'Diseños Únicos',
    price: 'S/ 220.00',
    tag: 'Diseño Exclusivo',
    image: '/images/product-soccer-roses.jpg',
    description: 'Creación original que combina el espíritu del fútbol con la elegancia de rosas rojas premium y follaje amarillo en envoltura geométrica negra.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000005',
    title: 'Bouquet Delicadeza de Lirios & Rosas',
    category: 'pastel',
    categoryName: 'Delicadeza Pastel',
    price: 'S/ 185.00',
    tag: 'Elegancia Soft',
    image: '/images/product-pastel-lilies.jpg',
    description: 'Combinación armoniosa de lirios orientales rosados, rosas pastel, gypsophila y fina envoltura en tono rosa rubor con lazo blanco de seda.'
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
  'propuestas': 'Propuestas & Bodas',
  'coronas': 'Cumpleaños & Coronales',
  'rosas': 'Rosas Premium',
  'tematicos': 'Diseños Únicos',
  'pastel': 'Delicadeza Pastel'
};

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
    ocasion: 'Propuesta de Matrimonio',
    presupuesto: 'S/ 250 - S/ 400',
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
          const catKey = Array.isArray(p.category) && p.category.length > 0 ? p.category[0] : (p.slug || 'rosas');
          return {
            id: p.id,
            title: p.title,
            category: catKey,
            categoryName: CATEGORY_NAMES_MAP[catKey] || 'Colección Rouss',
            price: `S/ ${parseFloat(p.price || p.precio_base || 0).toFixed(2)}`,
            tag: p.badge || 'Exclusivo',
            image: p.image || '/images/product-red-roses.jpg',
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

  // Filter products
  const filteredProducts = productsList.filter(p => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
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
              <span>👑 Arreglos Imperiales con Tiaras de Cristal</span>
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
              <span>👑 Arreglos Imperiales con Tiaras de Cristal</span>
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
                  <img 
                    src="/images/product-red-roses.jpg" 
                    alt="Flores Selectas Premium" 
                    className="feature-img-thumb"
                  />
                  <h3 className="feature-title">Flores Selectas Premium</h3>
                  <p className="feature-desc">Rosas de exportación de máxima frescura con garantía de durabilidad y fragancia sublime.</p>
                </div>

                <div className="feature-card-image">
                  <img 
                    src="/images/product-proposal-crown.jpg" 
                    alt="Diseños de Autor Únicos" 
                    className="feature-img-thumb"
                  />
                  <h3 className="feature-title">Diseños de Autor Únicos</h3>
                  <p className="feature-desc">Creaciones exclusivas firmadas por Jharol Baldeón con tiaras imperiales, mariposas y finos detalles.</p>
                </div>

                <div className="feature-card-image">
                  <img 
                    src="/images/product-pastel-lilies.jpg" 
                    alt="Envío Express Puntual" 
                    className="feature-img-thumb"
                  />
                  <h3 className="feature-title">Envío Express Puntual</h3>
                  <p className="feature-desc">Entregas personalizadas cuidadosas con tarjetas de dedicatoria impresas a mano.</p>
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
                  Explora nuestra selección exclusiva de arreglos imperiales y creaciones de autor.
                </p>
                
                <button 
                  onClick={() => navigateToPage('catalogo')} 
                  className="btn-solid-gold"
                >
                  <span>Ver Catálogo Exclusivo</span>
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
                      <label className="form-label">Ocasión Especial</label>
                      <select 
                        value={formData.ocasion}
                        onChange={(e) => setFormData({...formData, ocasion: e.target.value})}
                        className="form-select"
                      >
                        <option value="Propuesta de Matrimonio">Propuesta de Matrimonio</option>
                        <option value="Cumpleaños Imperial">Cumpleaños Imperial</option>
                        <option value="Aniversario Romántico">Aniversario Romántico</option>
                        <option value="Graduación / Evento Social">Graduación / Evento Social</option>
                        <option value="Detalle Sorpresa Exclusivo">Detalle Sorpresa Exclusivo</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Presupuesto Estimado</label>
                      <select 
                        value={formData.presupuesto}
                        onChange={(e) => setFormData({...formData, presupuesto: e.target.value})}
                        className="form-select"
                      >
                        <option value="S/ 150 - S/ 250">S/ 150 - S/ 250</option>
                        <option value="S/ 250 - S/ 400">S/ 250 - S/ 400</option>
                        <option value="S/ 400+ Formato Maxi Exclusivo">S/ 400+ Formato Maxi Exclusivo</option>
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
                        placeholder="Escribe aquí si deseas incluir una frase especial en la cinta dorada, globos o una nota personalizada..." 
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
                  <img 
                    src="/images/product-proposal-crown.jpg" 
                    alt="Arreglo de Autor Rouss by Jharol Baldeón" 
                    className="about-img"
                  />
                </div>

                <div className="about-text">
                  <span className="section-tag">
                    <CrownPremiumIcon size={14} color="#C59B27" /> Marca de Autor
                  </span>
                  <h2>Elegancia & Sofisticación en Cada Pétalo</h2>
                  <p>
                    <strong>Florería Rouss by Jharol Baldeón</strong> es una marca registrada de alta floristería especializada en rosas de exportación y arreglos con tiaras imperiales de cristal.
                  </p>
                  <p>
                    Cada obra floral es concebida con técnicas exclusivas de diseño para propuestas de matrimonio, bodas y eventos románticos que perduran en el recuerdo.
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
                Diseños de autor elaborados con las mejores rosas de exportación. Selecciona tu arreglo favorito para solicitarlo directamente vía WhatsApp.
              </p>
            </div>

            {/* SEARCH & CATEGORY SELECT BAR */}
            <div className="catalog-bar-minimal">
              <div className="search-input-wrapper">
                <SearchMinimalIcon size={18} color="#C59B27" />
                <input 
                  type="text" 
                  placeholder="Buscar arreglo (ej. Corona, Rosas, Girasoles)..." 
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
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'propuestas', label: 'Propuestas & Bodas' },
                  { id: 'coronas', label: 'Cumpleaños & Coronales' },
                  { id: 'rosas', label: 'Rosas Premium' },
                  { id: 'tematicos', label: 'Diseños Únicos' },
                  { id: 'pastel', label: 'Pastel' }
                ].map(cat => (
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
                  <option value="todos">🌹 Todas las Categorías</option>
                  <option value="propuestas">💍 Propuestas & Bodas</option>
                  <option value="coronas">👑 Cumpleaños & Coronales</option>
                  <option value="rosas">💐 Rosas Premium</option>
                  <option value="tematicos">⚽ Diseños Únicos</option>
                  <option value="pastel">🌸 Delicadeza Pastel</option>
                </select>
              </div>

            </div>

            {/* PRODUCTS GRID */}
            <div className="products-grid-minimal">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card-minimal">
                  <div className="product-img-wrapper" onClick={() => setSelectedItem(product)}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="product-img" 
                    />
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
                Florería Rouss - Especialistas en rosas y flores premium. Creación de arreglos y decoraciones únicas para momentos inolvidables.
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
                  <button onClick={() => { navigateToPage('catalogo'); setActiveCategory('propuestas'); }}>
                    Propuestas & Bodas
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo'); setActiveCategory('coronas'); }}>
                    Cumpleaños Imperiales
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo'); setActiveCategory('rosas'); }}>
                    Rosas Azules & Exclusivas
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
              <img src={selectedItem.image} alt={selectedItem.title} className="modal-img" />
            </div>

            <div className="modal-info">
              <span className="section-tag" style={{ marginBottom: '0.85rem' }}>
                <FlowerSparkleIcon size={14} color="#C59B27" /> Detalle de Fotografía
              </span>
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {selectedItem.title}
              </h3>
              
              {selectedItem.quote ? (
                <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: '#57534E', marginBottom: '1.25rem' }}>
                  {selectedItem.quote}
                </p>
              ) : (
                <>
                  <p style={{ color: '#57534E', marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                    {selectedItem.description}
                  </p>
                  <p style={{ fontSize: '1.35rem', fontWeight: 700, color: '#C59B27', marginBottom: '1.25rem' }}>
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
