/**
 * @return {object} window.open() with config
 */
export function openPopUpWindow (shareUrl, width, height) {
  let left = Math.round(screen.width / 2 - width / 2)
  let top = Math.round(screen.height / 2 - height / 2)
  const windowConfig = `width=${width},height=${height},left=${left},top=${top}`

  return window.open(
    shareUrl,
    'Share this',
    `${windowConfig},toolbar=no,menubar=no,scrollbars=no`
  )
}
