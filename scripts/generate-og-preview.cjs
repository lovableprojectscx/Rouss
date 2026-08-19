const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateOgPreview() {
  const imagesDir = path.join(__dirname, '../public/images');
  const bannerPath = path.join(imagesDir, 'banner.png');

  console.log('Generating WhatsApp & Facebook Open Graph preview images (.jpg)...');

  // 1. 1200x630 Standard Open Graph Image (Landscape 1.91:1)
  const og1200Buffer = await sharp(bannerPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 88, progressive: true, chromaSubsampling: '4:4:4' })
    .toBuffer();

  fs.writeFileSync(path.join(imagesDir, 'og-preview.jpg'), og1200Buffer);
  console.log(`✓ Created og-preview.jpg (${Math.round(og1200Buffer.length / 1024)} KB, 1200x630)`);

  // 2. 800x800 Square Open Graph Image (WhatsApp Mobile Fallback)
  const ogSquareBuffer = await sharp(bannerPath)
    .resize(800, 800, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 88, progressive: true })
    .toBuffer();

  fs.writeFileSync(path.join(imagesDir, 'og-square.jpg'), ogSquareBuffer);
  console.log(`✓ Created og-square.jpg (${Math.round(ogSquareBuffer.length / 1024)} KB, 800x800)`);
}

generateOgPreview().catch(console.error);
