import { IFetchParams } from '../interfaces/IFetchParams'

export const fetchUrl = async <T>(url: string, options: IFetchParams): Promise<T> => {
  const response = await fetch(url, options)
  return (await response.json()) as T
}
