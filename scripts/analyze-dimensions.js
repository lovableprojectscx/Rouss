import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

async function scanDir(dir) {
  const results = []
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const full = path.join(dir, item)
    if (fs.statSync(full).isDirectory()) {
      results.push(...await scanDir(full))
    } else if (item.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const meta = await sharp(full).metadata()
      results.push({
        file: item,
        width: meta.width,
        height: meta.height,
        ratio: (meta.width / meta.height).toFixed(2),
        aspect: meta.width === meta.height ? '1:1 (Cuadrada)' : meta.width < meta.height ? 'Vertical (Retrato)' : 'Horizontal (Paisaje)'
      })
    }
  }
  return results
}

const allImages = await scanDir(path.resolve('Productos Rouss'))
console.log(`Total source images analyzed: ${allImages.length}\n`)

const aspectCounts = {}
const ratios = []

for (const img of allImages) {
  aspectCounts[img.aspect] = (aspectCounts[img.aspect] || 0) + 1
  ratios.push(img.ratio)
  console.log(`${img.file} -> ${img.width}x${img.height} (Ratio: ${img.ratio}) [${img.aspect}]`)
}

console.log('\n--- RESUMEN DE PROPORCIONES ---')
console.log(aspectCounts)
