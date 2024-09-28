export const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
export const rgbaRegex = /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, 1\)$/

export function hexToRgb(hex: string) {
  const hexPairs = hex.substring(1).match(/.{2}/g)

  if (hexPairs === null) {
    return null
  }

  const rgbValues = hexPairs.map(hexPair => parseInt(hexPair, 16))
  return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 1)`
}