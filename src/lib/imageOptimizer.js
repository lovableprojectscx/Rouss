/**
 * Utility para optimización y conversión de imágenes a WebP en el navegador
 * 100% compatible con iOS (Safari iOS 14+), Android (Chrome) y Escritorio.
 */

/**
 * Convierte un archivo File o Blob de imagen a WebP optimizado
 * @param {File|Blob} file - Archivo de imagen original
 * @param {Object} options - Opciones de compresión
 * @param {number} options.maxWidth - Ancho máximo (por defecto 1200px)
 * @param {number} options.maxHeight - Alto máximo (por defecto 1600px)
 * @param {number} options.quality - Calidad WebP 0-1 (por defecto 0.88)
 * @returns {Promise<{blob: Blob, url: string, width: number, height: number, sizeKB: number}>}
 */
export async function convertImageToWebP(file, options = {}) {
  const {
    maxWidth = 1200,
    maxHeight = 1600,
    quality = 0.88
  } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Error al leer el archivo de imagen'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Error al cargar la imagen'))
      img.onload = () => {
        let width = img.width
        let height = img.height

        // Escalar proporcionalmente manteniendo la nitidez
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          return reject(new Error('No se pudo inicializar el contexto 2D de Canvas'))
        }

        // Renderizar con suavizado de alta calidad
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        // Detectar soporte nativo de WebP en Canvas
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              // Fallback a JPEG si WebP no fuera soportado en algún navegador legacy
              canvas.toBlob(
                (fallbackBlob) => {
                  if (!fallbackBlob) return reject(new Error('Error al generar blob'))
                  const url = URL.createObjectURL(fallbackBlob)
                  resolve({
                    blob: fallbackBlob,
                    url,
                    format: 'jpeg',
                    width,
                    height,
                    sizeKB: Number((fallbackBlob.size / 1024).toFixed(1))
                  })
                },
                'image/jpeg',
                quality
              )
              return
            }

            const url = URL.createObjectURL(blob)
            resolve({
              blob,
              url,
              format: 'webp',
              width,
              height,
              sizeKB: Number((blob.size / 1024).toFixed(1))
            })
          },
          'image/webp',
          quality
        )
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
