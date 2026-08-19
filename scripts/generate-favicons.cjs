const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const sourceImage = path.join(__dirname, '../public/images/logo.png');
  const publicDir = path.join(__dirname, '../public');

  console.log('Generating comprehensive favicon suite for Google Search Console...');

  // 1. Generate PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 }, // Google standard multiple of 48!
    { name: 'favicon-96x96.png', size: 96 }, // Google standard multiple of 48!
    { name: 'favicon-144x144.png', size: 144 }, // Google standard multiple of 48!
    { name: 'apple-touch-icon.png', size: 180 }, // Apple iOS Home Screen
    { name: 'favicon-192x192.png', size: 192 }, // Google standard multiple of 48 & Android
    { name: 'favicon-512x512.png', size: 512 }  // PWA & Google High Res
  ];

  for (const { name, size } of sizes) {
    const dest = path.join(publicDir, name);
    await sharp(sourceImage)
      .resize(size, size, { fit: 'contain', background: { r: 18, g: 17, b: 16, alpha: 1 } })
      .png({ quality: 100 })
      .toFile(dest);
    console.log(`✓ Created ${name} (${size}x${size})`);
  }

  // 2. Generate standard multi-image favicon.ico (containing 48x48 and 32x32 PNGs inside ICO format)
  // Simple valid ICO header containing a PNG stream
  const png48Buffer = await sharp(sourceImage)
    .resize(48, 48, { fit: 'contain', background: { r: 18, g: 17, b: 16, alpha: 1 } })
    .png()
    .toBuffer();

  const png32Buffer = await sharp(sourceImage)
    .resize(32, 32, { fit: 'contain', background: { r: 18, g: 17, b: 16, alpha: 1 } })
    .png()
    .toBuffer();

  const png16Buffer = await sharp(sourceImage)
    .resize(16, 16, { fit: 'contain', background: { r: 18, g: 17, b: 16, alpha: 1 } })
    .png()
    .toBuffer();

  // Build a true binary .ico file with 3 images: 16x16, 32x32, 48x48
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(3, 4); // 3 images

  const images = [
    { width: 16, height: 16, buffer: png16Buffer },
    { width: 32, height: 32, buffer: png32Buffer },
    { width: 48, height: 48, buffer: png48Buffer }
  ];

  let offset = 6 + (16 * images.length); // Header (6) + DirEntries (16 * 3) = 54
  const dirEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);   // Width
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2);                                  // Color palette
    entry.writeUInt8(0, 3);                                  // Reserved
    entry.writeUInt16LE(1, 4);                               // Color planes
    entry.writeUInt16LE(32, 6);                              // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8);               // Image size in bytes
    entry.writeUInt32LE(offset, 12);                         // Offset in file
    offset += img.buffer.length;
    dirEntries.push(entry);
  }

  const icoBuffer = Buffer.concat([
    header,
    ...dirEntries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log(`✓ Created binary multi-resolution favicon.ico (${icoBuffer.length} bytes)`);

  // 3. Generate site.webmanifest for PWA & Google Android
  const manifest = {
    name: "Florería Rouss by Jharol Baldeón",
    short_name: "Florería Rouss",
    description: "Alta floristería en Lima. Ramos buchones, tulipanes y rosas premium con delivery a todo Lima.",
    start_url: "/",
    display: "standalone",
    background_color: "#121110",
    theme_color: "#121110",
    icons: [
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ Created site.webmanifest');
}

generateFavicons().catch(console.error);
