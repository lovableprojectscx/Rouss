import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const imagesDir = path.resolve('public/images')

async function optimizeSiteAssets() {
  console.log('--- OPTIMIZING ALL PUBLIC SITE ASSETS TO WEBP ---')
  const files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(png|jpg|jpeg)$/i))

  let totalOriginalBytes = 0
  let totalOptimizedBytes = 0

  for (const file of files) {
    const inputPath = path.join(imagesDir, file)
    const baseName = path.basename(file, path.extname(file))
    const outputPath = path.join(imagesDir, `${baseName}.webp`)

    const stat = fs.statSync(inputPath)
    totalOriginalBytes += stat.size

    const image = sharp(inputPath)
    const metadata = await image.metadata()

    let transform = sharp(inputPath).toColorspace('srgb')

    // If banner or very large image, max width 1920
    if (metadata.width > 1920) {
      transform = transform.resize({ width: 1920, withoutEnlargement: true })
    }

    if (metadata.hasAlpha || file.endsWith('.png')) {
      await transform
        .webp({ quality: 90, effort: 6, alphaQuality: 95, lossless: false })
        .toFile(outputPath)
    } else {
      await transform
        .webp({ quality: 85, effort: 6, smartSubsample: true })
        .toFile(outputPath)
    }

    const outStat = fs.statSync(outputPath)
    totalOptimizedBytes += outStat.size

    const savedPercent = (((stat.size - outStat.size) / stat.size) * 100).toFixed(1)
    console.log(`✓ ${file} (${(stat.size / 1024).toFixed(1)} KB) -> ${baseName}.webp (${(outStat.size / 1024).toFixed(1)} KB) [Ahorro: -${savedPercent}%]`)
  }

  console.log('\n=============================================')
  console.log(`PESO ORIGINAL TOTAL: ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB`)
  console.log(`PESO OPTIMIZADO TOTAL: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB`)
  console.log(`AHORRO DE ANCHO DE BANDA: -${(((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1)}%`)
  console.log('=============================================')
}

optimizeSiteAssets().catch(console.error)
