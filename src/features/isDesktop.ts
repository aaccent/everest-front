export function isDesktop() {
  if (typeof window === undefined) return false
  return window.matchMedia('(min-width:768px)').matches
}
