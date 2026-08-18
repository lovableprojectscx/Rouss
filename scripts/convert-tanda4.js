import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('Productos Rouss/tanda 4')
const outputDir = path.resolve('public/images/products')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const TANDA4_MAPPING = [
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.35 PM.jpeg',
    targetName: 'bouquet-duo-lirios-orientales-corona-floral',
    title: 'Bouquet Dúo Lirios Orientales & Corona Floral'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.35 PM (1).jpeg',
    targetName: 'wood-floral-box-7-rosas-lirios-silvestres',
    title: 'Wood Floral Box 7 Rosas & Lirios Silvestres'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.22 PM.jpeg',
    targetName: 'maxi-bouquet-imperial-12-tulipanes-rosa-holandes',
    title: 'Maxi Bouquet Imperial 12 Tulipanes Rosa Holandés'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.24 PM.jpeg',
    targetName: 'bouquet-alta-costura-6-tulipanes-rojos',
    title: 'Bouquet Alta Costura 6 Tulipanes Rojos'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.24 PM (1).jpeg',
    targetName: 'bouquet-delicadeza-5-tulipanes-rosados',
    title: 'Bouquet Delicadeza 5 Tulipanes Rosados'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.24 PM (2).jpeg',
    targetName: 'bouquet-solar-3-tulipanes-amarillos-margaritas',
    title: 'Bouquet Solar 3 Tulipanes Amarillos & Margaritas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.24 PM (3).jpeg',
    targetName: 'bouquet-black-white-6-tulipanes-rosa-pastel',
    title: 'Bouquet Black & White 6 Tulipanes Rosa Pastel'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.24 PM (4).jpeg',
    targetName: 'bouquet-gold-chic-6-tulipanes-rosa-pastel',
    title: 'Bouquet Gold Chic 6 Tulipanes Rosa Pastel'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.25 PM.jpeg',
    targetName: 'maxi-ramo-12-tulipanes-rojos-de-gala',
    title: 'Maxi Ramo 12 Tulipanes Rojos de Gala'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.25 PM (1).jpeg',
    targetName: 'bouquet-imperial-10-tulipanes-bicolores-rojo-rosa',
    title: 'Bouquet Imperial 10 Tulipanes Bicolores Rojo & Rosa'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.25 PM (2).jpeg',
    targetName: 'bouquet-primavera-3-tulipanes-blancos-girasoles',
    title: 'Bouquet Primavera 3 Tulipanes Blancos & Girasoles'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 7.51.25 PM (3).jpeg',
    targetName: 'bouquet-royal-8-tulipanes-purpura-imperial',
    title: 'Bouquet Royal 8 Tulipanes Púrpura Imperial'
  }
]

console.log(`Starting WebP conversion for ${TANDA4_MAPPING.length} products of Tanda 4...`)

for (const item of TANDA4_MAPPING) {
  const inputPath = path.join(inputDir, item.source)
  if (!fs.existsSync(inputPath)) {
    console.error(`Source file missing: ${item.source}`)
    continue
  }

  const webpOutputPath = path.join(outputDir, `${item.targetName}.webp`)
  const jpgOutputPath = path.join(outputDir, `${item.targetName}.jpg`)

  // 1. High-Fidelity WebP conversion
  await sharp(inputPath)
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .toColorspace('srgb')
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(webpOutputPath)

  // 2. High-Fidelity Fallback JPG
  await sharp(inputPath)
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .toColorspace('srgb')
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(jpgOutputPath)

  const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(1)
  const webpSize = (fs.statSync(webpOutputPath).size / 1024).toFixed(1)
  const jpgSize = (fs.statSync(jpgOutputPath).size / 1024).toFixed(1)

  console.log(`✓ ${item.title}:`)
  console.log(`   Original: ${originalSize} KB -> WebP: ${webpSize} KB | JPG: ${jpgSize} KB`)
}

console.log('\nTanda 4 images converted successfully!')
