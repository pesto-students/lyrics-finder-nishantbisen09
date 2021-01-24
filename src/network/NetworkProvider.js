import axios from "axios";

export const networkProviderInstance = axios.create({
    baseURL: 'https://api.lyrics.ovh/',
    timeout: 1000,
})