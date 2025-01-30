export const isJSON = (txt): boolean => {
  try {
    JSON.parse(txt)
    return true
  } catch (e) {
    return false
  }
}
