import { describe, it, expect, vi } from 'vitest'
import { convertImageToWebP } from '../lib/imageOptimizer'

describe('Image Optimizer WebP Converter (iOS / Android / Desktop)', () => {
  it('converts image blob to WebP format successfully', async () => {
    // Create a mock image file
    const fakeFile = new File(['fake-image-bytes'], 'test-flower.jpg', { type: 'image/jpeg' })
    
    // Mock FileReader behavior
    const originalFileReader = global.FileReader
    global.FileReader = class {
      readAsDataURL() {
        setTimeout(() => {
          this.onload({ target: { result: 'data:image/jpeg;base64,fake' } })
        }, 0)
      }
    }

    // Mock Image object
    const originalImage = global.Image
    global.Image = class {
      constructor() {
        this.width = 1600
        this.height = 2000
        setTimeout(() => {
          if (this.onload) this.onload()
        }, 0)
      }
    }

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn().mockReturnValue('blob:http://localhost:3000/fake-webp-url')

    const result = await convertImageToWebP(fakeFile, { maxWidth: 1200, maxHeight: 1600, quality: 0.88 })

    expect(result).toBeDefined()
    expect(result.format).toBe('webp')
    expect(result.width).toBeLessThanOrEqual(1200)
    expect(result.height).toBeLessThanOrEqual(1600)
    expect(result.url).toBe('blob:http://localhost:3000/fake-webp-url')

    global.FileReader = originalFileReader
    global.Image = originalImage
  })
})
