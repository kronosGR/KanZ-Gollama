export const isResponseJSON = (res): boolean => {
  if (res.headers.get('content-type')?.includes('application/json')) {
    return true
  } else {
    return false
  }
}
