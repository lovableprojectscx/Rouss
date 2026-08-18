import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('Productos Rouss/tanda 3')
const outputDir = path.resolve('public/images/products')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const TANDA3_MAPPING = [
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.32 PM.jpeg',
    targetName: 'ramo-princesa-2-gerberas-follaje-rosa',
    title: 'Ramo Princesa 2 Gerberas & Follaje Rosa'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.32 PM (1).jpeg',
    targetName: 'bouquet-armonia-1-lirio-3-rosas-lilas',
    title: 'Bouquet Armonía 1 Lirio & 3 Rosas Lilas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.32 PM (2).jpeg',
    targetName: 'bouquet-silvestre-1-lirio-3-rosas',
    title: 'Bouquet Silvestre 1 Lirio & 3 Rosas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.33 PM.jpeg',
    targetName: 'bouquet-duo-imperial-lirios-orientales',
    title: 'Bouquet Dúo Imperial de Lirios Orientales'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.33 PM (1).jpeg',
    targetName: 'bouquet-fusion-6-rosas-4-girasoles',
    title: 'Bouquet Fusión 6 Rosas & 4 Girasoles'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.33 PM (2).jpeg',
    targetName: 'estructura-geometrica-2-lirios-10-rosas-claveles',
    title: 'Estructura Geométrica 2 Lirios, 10 Rosas & Claveles'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.33 PM (3).jpeg',
    targetName: 'bouquet-ternura-1-lirio-rosado-3-rosas',
    title: 'Bouquet Ternura 1 Lirio Rosado & 3 Rosas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.33 PM (4).jpeg',
    targetName: 'bouquet-elegance-8-rosas-pastel-perlas',
    title: 'Bouquet Elegance 8 Rosas Pastel & Perlas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.34 PM.jpeg',
    targetName: 'bouquet-pasion-8-rosas-rojas',
    title: 'Bouquet Pasión 8 Rosas Rojas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.34 PM (1).jpeg',
    targetName: 'bouquet-sublime-1-lirio-oriental-3-rosas',
    title: 'Bouquet Sublime 1 Lirio Oriental & 3 Rosas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.34 PM (2).jpeg',
    targetName: 'bouquet-rustico-chic-1-lirio-follaje',
    title: 'Bouquet Rústico Chic 1 Lirio & Follaje'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.34 PM (3).jpeg',
    targetName: 'bouquet-fortuna-12-rosas-blush-lirios',
    title: 'Bouquet Fortuna 12 Rosas Blush & Lirios'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.34 PM (4).jpeg',
    targetName: 'bouquet-royal-6-rosas-azules-detalles-plateados',
    title: 'Bouquet Royal 6 Rosas Azules & Detalles Plateados'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.35 PM.jpeg',
    targetName: 'bouquet-solar-6-rosas-amarillas-astromelias',
    title: 'Bouquet Solar 6 Rosas Amarillas & Astromelias'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.35 PM (1).jpeg',
    targetName: 'bouquet-silvestre-1-lirio-rosado-astromelias',
    title: 'Bouquet Silvestre 1 Lirio Rosado & Astromelias'
  }
]

console.log(`Starting WebP conversion for ${TANDA3_MAPPING.length} products of Tanda 3...`)

for (const item of TANDA3_MAPPING) {
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

console.log('\nTanda 3 images converted successfully!')
