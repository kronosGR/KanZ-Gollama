export const numberFormat = (num: number): string => {
  const numFormatter = new Intl.NumberFormat()
  return numFormatter.format(num / 1000000000)
}
