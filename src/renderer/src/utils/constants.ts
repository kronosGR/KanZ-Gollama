import.meta.env.VITE_BASE_API_URL

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL
export const MODELS_GET_URL = `${BASE_API_URL}/tags`
export const MODELS_GET_BY_NAME = `${BASE_API_URL}/show/`
export const MODELS_DELETE_BY_NAME = `${BASE_API_URL}/delete/`
export const MODELS_PULL = `${BASE_API_URL}/pull/`
export const CHAT = `${BASE_API_URL}/chat`
export const GENERATE = `${BASE_API_URL}/generate`
