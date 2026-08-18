import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://floreriarouss.com'
const currentDate = new Date().toISOString().split('T')[0]

// 56 Official Product Slugs
const productSlugs = [
  'ramo-buchon-12-girasoles-sol-radiante',
  'ramo-buchon-50-rosas-globos-helio',
  'maxi-ramo-buchon-80-rosas-6-girasoles',
  'ramo-buchon-reina-imperial-80-rosas',
  'ramo-buchon-corona-reina-50-rosas',
  'ramo-buchon-sol-de-amor-3-girasoles',
  'ramo-buchon-corona-dorada-24-rosas',
  'ramo-buchon-corona-imperial-50-rosas',
  'ramo-buchon-aurora-3-girasoles',
  'ramo-buchon-magico-12-rosas-girasol',
  'combo-cumpleanos-buchon-50-rosas',
  'combo-reina-buchon-corona-globos',
  'combo-imperial-buchon-girasoles-vino',
  'combo-pasional-24-rosas-vino-globo',
  'cucurucho-pasion-8-rosas-rojas',
  'cucurucho-rosa-delicadeza-8-rosas',
  'cucurucho-dulzura-8-rosas-rosa',
  'cucurucho-encanto-8-rosas-fucsia',
  'cucurucho-primavera-8-rosas-blancas',
  'cucurucho-girasol-radiante-3-rosas',
  'mini-bouquet-ternura-3-rosas-rojas',
  'mini-bouquet-dulce-amor-3-rosas-rosa',
  'mini-bouquet-sol-de-verano-girasol',
  'mini-bouquet-pasion-express-2-rosas',
  'mini-bouquet-girasol-single-alegria',
  'exotic-box-anturio-rojo-rosas',
  'tropical-box-anturio-exotico-girasoles',
  'elegance-box-anturio-blanco-lirios',
  'sweet-box-anturio-rosa-rosas-pastel',
  'ramo-princesa-2-gerberas-follaje-rosa',
  'ramo-reina-gerberas-rosas-pastel',
  'bouquet-frescura-gerberas-fucsia-rosas',
  'bouquet-primaveral-gerberas-rosas-blancas',
  'box-geometrico-gerberas-fucsia-rosas',
  'box-geometrico-gerberas-rosa-rosas',
  'box-geometrico-girasol-rosas-rojas',
  'box-geometrico-lirios-rosas-pastel',
  'ramo-dulce-armonia-lirios-rosas-rosadas',
  'ramo-pureza-imperial-lirios-rosas-blancas',
  'ramo-pasion-lirios-rosas-rojas',
  'bouquet-royal-rosas-azules-papel-coreano',
  'bouquet-zafiro-rosas-azules-girasol',
  'cucurucho-azul-infinito-rosas-azules',
  'box-imperial-rosas-azules-corona-dorada',
  'maxi-bouquet-imperial-12-tulipanes-rosa-holandes',
  'bouquet-alta-costura-6-tulipanes-rojos',
  'bouquet-gala-6-tulipanes-rosas',
  'cucurucho-tulipanes-rojos-girasoles-cinta-dorada',
  'cucurucho-tulipanes-amarillos-girasoles',
  'cucurucho-tulipanes-rosa-pastel-delicadeza',
  'cucurucho-tulipanes-bicolor-amor-eterno',
  'wood-floral-box-tulipanes-rojos-rosas-rojas',
  'wood-floral-box-tulipanes-rosa-rosas-pastel',
  'wood-floral-box-tulipanes-amarillos-girasoles',
  'wood-floral-box-tulipanes-bicolor-flores-silvestres',
  'wood-floral-box-tulipanes-blancos-rosas-blancas'
]

const categories = [
  'tulipanes',
  'buchones',
  'coronas',
  'rosas',
  'pastel',
  'combos',
  'propuestas'
]

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- PÁGINA PRINCIPAL -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- CATÁLOGO GENERAL -->
  <url>
    <loc>${BASE_URL}/catalogo</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`

for (const slug of productSlugs) {
  xml += `  <url>
    <loc>${BASE_URL}/catalogo?producto=${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
}

xml += `</urlset>\n`

const outputPath = path.resolve('public/sitemap.xml')
fs.writeFileSync(outputPath, xml, 'utf8')
console.log(`✓ Sitemap generado exitosamente con ${productSlugs.length + 2} URLs en: ${outputPath}`)
