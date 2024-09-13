export function convertBase64ToArray(base64: string) {
  const utf8 = atob(base64)
  const byteArr = utf8.split('').map((char) => char.codePointAt(0))

  // @ts-ignore
  const utf8Arr = Uint8Array.from(byteArr)
  const str = new TextDecoder().decode(utf8Arr)
  return JSON.parse(str)
}

export function convertToBase64(value: any[] | string) {
  const string = JSON.stringify(value)
  const buffer = new TextEncoder().encode(string)
  const utf8Arr = Array.from(buffer)
  const utf8 = utf8Arr.map((byte) => String.fromCodePoint(byte)).join('')
  return btoa(utf8)
}
