export const convertBytes = (bytes: number, decimals: nubmer = 2) => {
  if (bytes < 1) return '0 Bytes'
  const kbZise = 1024
  const avlSizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const dcms = decimals < 0 ? 0 : decimals

  const res = Math.floor(Math.log(bytes) / Math.log(kbZise))
  return `${parseFloat((bytes / Math.pow(kbZise, res)).toFixed(dcms))} ${avlSizes[res]}`
}
