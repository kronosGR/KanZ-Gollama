import { IFetchParams } from '../interfaces/IFetchParams'
import { isResponseJSON } from './isResponseJSON'

export const fetchUrl = async (url: string, options: IFetchParams): Promise<Response | string> => {
  const custOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    },
    mode: 'no-cors'
  }

  const response = await fetch(url, custOptions)
  if (isResponseJSON(response)) {
    // console.log('Response is JSON')
    return await response.json()
  } else {
    // console.log('Response is not JSON')
    return await response.text()
  }
}
