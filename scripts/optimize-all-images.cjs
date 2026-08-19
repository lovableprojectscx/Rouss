const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const imagesDir = path.join(__dirname, '../public/images');
  const productsDir = path.join(imagesDir, 'products');

  console.log('Optimizing all static and dynamic images with sharp...');

  // 1. Optimize Client Gallery Images (used on home page)
  const clientImages = ['client-1', 'client-2', 'client-3', 'client-4'];
  for (const name of clientImages) {
    const srcJpg = path.join(imagesDir, `${name}.jpg`);
    const srcWebp = path.join(imagesDir, `${name}.webp`);

    const source = fs.existsSync(srcJpg) ? srcJpg : (fs.existsSync(srcWebp) ? srcWebp : null);
    if (source) {
      // Resize to 640px width max
      const buffer = await sharp(source)
        .resize(640, 800, { fit: 'cover', position: 'center' })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      
      fs.writeFileSync(srcWebp, buffer);
      console.log(`✓ Optimized ${name}.webp -> ${Math.round(buffer.length / 1024)} KB`);
    }
  }

  // 2. Optimize Header and Footer Logos
  const logoHeaderSrc = path.join(imagesDir, 'logo-header.png');
  if (fs.existsSync(logoHeaderSrc)) {
    const buffer = await sharp(logoHeaderSrc)
      .resize(380, 110, { fit: 'inside' })
      .webp({ quality: 85 })
      .toBuffer();
    fs.writeFileSync(path.join(imagesDir, 'logo-header.webp'), buffer);
    console.log(`✓ Optimized logo-header.webp -> ${Math.round(buffer.length / 1024)} KB`);
  }

  const logoFooterSrc = path.join(imagesDir, 'logo.png');
  if (fs.existsSync(logoFooterSrc)) {
    const buffer = await sharp(logoFooterSrc)
      .resize(200, 200, { fit: 'contain', background: { r: 18, g: 17, b: 16, alpha: 1 } })
      .png({ quality: 80, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(path.join(imagesDir, 'logo-footer.png'), buffer);
    console.log(`✓ Optimized logo-footer.png -> ${Math.round(buffer.length / 1024)} KB`);

    const bufferWebp = await sharp(logoFooterSrc)
      .resize(200, 200, { fit: 'contain', background: { r: 18, g: 17, b: 16, alpha: 1 } })
      .webp({ quality: 80 })
      .toBuffer();
    fs.writeFileSync(path.join(imagesDir, 'logo-footer.webp'), bufferWebp);
    console.log(`✓ Optimized logo-footer.webp -> ${Math.round(bufferWebp.length / 1024)} KB`);
  }

  // 3. Optimize Featured and About Product Images
  const priorityProducts = [
    'ramo-buchon-12-girasoles-sol-radiante',
    'ramo-buchon-corona-reina-50-rosas',
    'ramo-princesa-12-rosas-durazno-tiara-cristal',
    'maxi-bouquet-imperial-12-tulipanes-rosa-holandes'
  ];

  for (const name of priorityProducts) {
    const srcJpg = path.join(productsDir, `${name}.jpg`);
    const srcWebp = path.join(productsDir, `${name}.webp`);
    const source = fs.existsSync(srcJpg) ? srcJpg : (fs.existsSync(srcWebp) ? srcWebp : null);
    if (source) {
      const buffer = await sharp(source)
        .resize(600, 600, { fit: 'inside' })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      fs.writeFileSync(srcWebp, buffer);
      console.log(`✓ Optimized product ${name}.webp -> ${Math.round(buffer.length / 1024)} KB`);
    }
  }

  // 4. Optimize All other Product WebP images in public/images/products/
  const files = fs.readdirSync(productsDir);
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const baseName = file.replace(/\.(jpg|jpeg|png)$/, '');
      const outWebp = path.join(productsDir, `${baseName}.webp`);
      const srcFile = path.join(productsDir, file);
      
      const buffer = await sharp(srcFile)
        .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toBuffer();
      fs.writeFileSync(outWebp, buffer);
    }
  }
  console.log('✓ All 56+ product images re-compressed to ultra-light webp format.');
}

optimizeImages().catch(console.error);
