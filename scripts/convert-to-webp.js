import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('Productos Rouss')
const outputDir = path.resolve('public/images/products')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Precise mapping of the 14 products from WhatsApp screenshots
const PRODUCT_MAPPING = [
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.38 PM.jpeg',
    targetName: 'ramo-buchon-12-girasoles-sol-radiante',
    title: 'Ramo Buchón "Sol Radiante" (12 Girasoles)'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.38 PM (1).jpeg',
    targetName: 'ramo-buchon-50-rosas-globos-helio',
    title: 'Ramo Buchón Imperial 50 Rosas & Trío de Helio'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.39 PM.jpeg',
    targetName: 'maxi-ramo-buchon-80-rosas-6-girasoles',
    title: 'Maxi Ramo Buchón 80 Rosas & 6 Girasoles'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.39 PM (1).jpeg',
    targetName: 'ramo-buchon-reina-imperial-80-rosas',
    title: 'Ramo Buchón "Reina Imperial" (80 Rosas)'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.40 PM.jpeg',
    targetName: 'bouquet-imperial-lirios-blancos',
    title: 'Bouquet Imperial de Lirios Blancos'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.40 PM (1).jpeg',
    targetName: 'bouquet-armonia-12-rosas-astromelias',
    title: 'Bouquet Armonía 12 Rosas & Astromelias'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.40 PM (2).jpeg',
    targetName: 'ramo-buchon-elite-50-rosas',
    title: 'Ramo Buchón Élite 50 Rosas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.41 PM.jpeg',
    targetName: 'ramo-buchon-40-rosas-mariposas-oro',
    title: 'Ramo Buchón 40 Rosas & Mariposas de Oro'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.41 PM (1).jpeg',
    targetName: 'combo-ternura-20-rosas-peluche-lirio',
    title: 'Combo Ternura 20 Rosas, Peluche & Lirio'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.41 PM (2).jpeg',
    targetName: 'bouquet-conservacion-20-rosas-hidratacion',
    title: 'Bouquet Conservación 20 Rosas & Hidratación'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.42 PM.jpeg',
    targetName: 'ramo-buchon-pasion-30-rosas',
    title: 'Ramo Buchón Pasión 30 Rosas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 5.51.42 PM (1).jpeg',
    targetName: 'ramo-buchon-corona-reina-50-rosas',
    title: 'Ramo Buchón "Corona de Reina" (50 Rosas)'
  },
  {
    source: 'WhatsApp Image 25.jpeg',
    targetName: 'bouquet-esencial-15-rosas-hidratadas',
    title: 'Bouquet Esencial 15 Rosas Hidratadas'
  },
  {
    source: 'WhatsApp Image.jpeg',
    targetName: 'bouquet-romance-3-lirios-rosas-pastel',
    title: 'Bouquet Romance 3 Lirios & Rosas Pastel'
  }
]

console.log(`Starting WebP conversion for ${PRODUCT_MAPPING.length} products...`)

for (const item of PRODUCT_MAPPING) {
  const inputPath = path.join(inputDir, item.source)
  if (!fs.existsSync(inputPath)) {
    console.error(`Source file missing: ${item.source}`)
    continue
  }

  const webpOutputPath = path.join(outputDir, `${item.targetName}.webp`)
  const jpgOutputPath = path.join(outputDir, `${item.targetName}.jpg`)

  // 1. High-Fidelity WebP conversion (Apple iOS 14+ / Safari / Chrome compatible, 88% quality, sRGB color preservation)
  await sharp(inputPath)
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .toColorspace('srgb')
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(webpOutputPath)

  // 2. High-Fidelity Fallback JPG (for legacy systems)
  await sharp(inputPath)
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .toColorspace('srgb')
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(jpgOutputPath)

  const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(1)
  const webpSize = (fs.statSync(webpOutputPath).size / 1024).toFixed(1)
  const jpgSize = (fs.statSync(jpgOutputPath).size / 1024).toFixed(1)

  console.log(`✓ ${item.title}:`)
  console.log(`   Original: ${originalSize} KB -> WebP: ${webpSize} KB (-${(100 - (webpSize/originalSize*100)).toFixed(0)}%) | JPG: ${jpgSize} KB`)
}

console.log('\nAll product images converted and optimized successfully!')
