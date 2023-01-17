import axios from 'axios'

const URL = 'https://api.open-meteo.com/v1/forecast'
const SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search'

export const forecastApi = axios.create({
  baseURL: URL
})

export const searchApi = axios.create({ baseURL: SEARCH_URL })
