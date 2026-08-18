import '@testing-library/jest-dom'

// Mock window.scrollTo
window.scrollTo = () => {}

// Mock window.open
window.open = () => {}

// Mock HTMLCanvasElement toBlob for imageOptimizer testing
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => ({
    drawImage: () => {},
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high'
  })
  HTMLCanvasElement.prototype.toBlob = function(callback, type) {
    const fakeBlob = new Blob(['fake image content'], { type: type || 'image/webp' })
    setTimeout(() => callback(fakeBlob), 0)
  }
}
