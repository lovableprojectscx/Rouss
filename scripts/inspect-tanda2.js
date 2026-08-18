import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('Productos Rouss/tanda 2')
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'))

console.log(`Found ${files.length} images in ${inputDir}:`)

for (const file of files) {
  const filePath = path.join(inputDir, file)
  const meta = await sharp(filePath).metadata()
  console.log(`File: "${file}" -> ${meta.width}x${meta.height}, format: ${meta.format}, size: ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`)
}
