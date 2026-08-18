import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('Productos Rouss/tanda 2')
const outputDir = path.resolve('public/images/products')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const TANDA2_MAPPING = [
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.22 PM.jpeg',
    targetName: 'cucurucho-pasion-8-rosas-rojas',
    title: 'Cucurucho Pasión 8 Rosas Rojas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.22 PM (1).jpeg',
    targetName: 'bouquet-delicadeza-12-rosas-rosa-pastel',
    title: 'Bouquet Delicadeza 12 Rosas Rosa Pastel'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.23 PM.jpeg',
    targetName: 'bouquet-multicolor-fiesta-primavera',
    title: 'Bouquet Multicolor Fiesta de Primavera'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.24 PM.jpeg',
    targetName: 'mini-bouquet-4-rosas-astromelias',
    title: 'Mini Bouquet 4 Rosas & Astromelias'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.24 PM (1).jpeg',
    targetName: 'bouquet-exotico-5-rosas-anturio-rosa',
    title: 'Bouquet Exótico 5 Rosas & Anturio Rosa'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.30 PM.jpeg',
    targetName: 'bouquet-imperial-20-rosas-doble-anturio',
    title: 'Bouquet Imperial 20 Rosas & Doble Anturio'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.30 PM (1).jpeg',
    targetName: 'bouquet-clasico-12-rosas-rojas',
    title: 'Bouquet Clásico 12 Rosas Rojas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.30 PM (2).jpeg',
    targetName: 'mini-bouquet-lirio-oriental-astromelias',
    title: 'Mini Bouquet Lirio Oriental & Astromelias'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.31 PM.jpeg',
    targetName: 'bouquet-distincion-8-claveles-importados',
    title: 'Bouquet Distinción 8 Claveles Importados'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.31 PM (1).jpeg',
    targetName: 'ramo-exclusivo-orquidea-real-estrellitas-belen',
    title: 'Ramo Exclusivo Orquídea Real & Estrellitas de Belén'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.31 PM (2).jpeg',
    targetName: 'bouquet-radiante-6-girasoles-margaritas',
    title: 'Bouquet Radiante 6 Girasoles & Margaritas'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.32 PM.jpeg',
    targetName: 'bouquet-silvestre-romance-pastel',
    title: 'Bouquet Silvestre Romance Pastel'
  },
  {
    source: 'WhatsApp Image 2026-08-16 at 6.28.32 PM (1).jpeg',
    targetName: 'sombrerera-floral-box-girasoles-rosas',
    title: 'Sombrerera Floral Box Girasoles & Rosas'
  },
  {
    source: 'rep.jpeg',
    targetName: 'bouquet-dulzura-lirio-rosado-conejitos',
    title: 'Bouquet Dulzura Lirio Rosado & Conejitos'
  },
  {
    source: 'wasd.jpeg',
    targetName: 'ramo-princesa-12-rosas-durazno-tiara-cristal',
    title: 'Ramo Princesa 12 Rosas Durazno & Tiara de Cristal'
  }
]

console.log(`Starting WebP conversion for ${TANDA2_MAPPING.length} products of Tanda 2...`)

for (const item of TANDA2_MAPPING) {
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

console.log('\nTanda 2 images converted successfully!')
