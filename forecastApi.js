import axios from "axios";

const URL = "https://api.open-meteo.com/v1/forecast"
const SEARCH_URL = "https://geocoding-api.open-meteo.com/v1/search?"
export const api = axios.create({
    baseURL: URL
});
