/**
 * Detects if the current device is a mobile device
 * @returns true if the device is mobile, false otherwise
 */
export function isMobileDevice(): boolean {
  // Check user agent for mobile devices
  const mobileUserAgents = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const isMobileUA = mobileUserAgents.test(navigator.userAgent)

  // Check for touch capability and screen size
  const hasTouchScreen =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints is a legacy IE property
    navigator.msMaxTouchPoints > 0

  const isSmallScreen =
    window.matchMedia && window.matchMedia('(max-width: 768px)').matches

  // Device is considered mobile if it matches user agent OR (has touch AND small screen)
  return isMobileUA || (hasTouchScreen && isSmallScreen)
}
