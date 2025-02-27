import Purify from 'dompurify'

export const dirtyHTML = (bad: string): object => {
  return { __html: Purify.sanitize(bad) }
}
