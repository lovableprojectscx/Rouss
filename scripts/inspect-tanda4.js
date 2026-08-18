import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('Productos Rouss/tanda 4')
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'))

console.log(`Found ${files.length} images in ${inputDir}:`)

let html = `<!DOCTYPE html><html><head><style>
body { font-family: sans-serif; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 20px; background: #f0f0f0; }
.card { background: white; border-radius: 8px; overflow: hidden; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
img { width: 100%; height: 320px; object-fit: cover; border-radius: 4px; }
h3 { font-size: 14px; word-break: break-all; margin: 10px 0 5px; }
</style></head><body>`

for (const file of files) {
  const filePath = path.join(inputDir, file)
  const meta = await sharp(filePath).metadata()
  const base64 = fs.readFileSync(filePath).toString('base64')
  console.log(`File: "${file}" -> ${meta.width}x${meta.height}, format: ${meta.format}, size: ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`)
  
  html += `<div class="card">
    <img src="data:image/jpeg;base64,${base64}" />
    <h3>${file}</h3>
  </div>`
}
html += `</body></html>`
fs.writeFileSync('scripts/preview-tanda4.html', html)
console.log('Saved preview-tanda4.html')
