import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('Productos Rouss/tanda 2')
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'))

// Let's create an html file that pairs each image with candidate labels and shows small thumbnails
let html = `<!DOCTYPE html><html><head><style>
body { font-family: sans-serif; padding: 20px; }
table { width: 100%; border-collapse: collapse; }
td, th { border: 1px solid #ccc; padding: 8px; text-align: left; vertical-align: middle; }
img { width: 140px; height: 160px; object-fit: cover; border-radius: 4px; }
</style></head><body><table>
<tr><th>#</th><th>Preview</th><th>Filename</th><th>Dimensions</th><th>Size</th></tr>`

files.forEach((file, index) => {
  const filePath = path.join(inputDir, file)
  const base64 = fs.readFileSync(filePath).toString('base64')
  const stat = fs.statSync(filePath)
  html += `<tr>
    <td>${index + 1}</td>
    <td><img src="data:image/jpeg;base64,${base64}" /></td>
    <td><strong>${file}</strong></td>
    <td>${(stat.size / 1024).toFixed(1)} KB</td>
    <td></td>
  </tr>`
})

html += `</table></body></html>`
fs.writeFileSync('scripts/table-tanda2.html', html)
console.log('Saved table-tanda2.html')
