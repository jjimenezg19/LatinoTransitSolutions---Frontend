import Axios from "axios"
import { AES, enc } from "crypto-js"

const API_URL = import.meta.env.REACT_APP_API_URL
const TOKEN_ENCRYPT = import.meta.env.REACT_APP_TOKEN_ENCRYPT

const axios = Axios.create({ baseURL: API_URL + "/api", timeout: 15000 })
const simpleAxios = Axios.create({ baseURL: API_URL + "/api", timeout: 15000 })

const baseConfig = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": API_URL
}

simpleAxios.interceptors.request.use(
  (config) => {
    config.headers = { ...(config.headers || baseConfig), ...baseConfig }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  (config) => {
    config.headers = { ...(config.headers || baseConfig), ...baseConfig }

    if (localStorage.getItem("auth_token")) {
      config.headers["Authorization"] = "Bearer " + AES.decrypt(localStorage.getItem("auth_token"), TOKEN_ENCRYPT).toString(enc.Utf8)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  ({ data }) => {
    return data
  },
  (error) => {
    if (error?.response) {
      console.error("[Axios Error]", error.response)

      const code = parseInt(error.response.status)

      if (code === 401) {
        window.location.href = "http://localhost:3000/login"
      }
    }

    return Promise.reject(error)
  }
)

simpleAxios.interceptors.response.use(
  ({ data }) => {
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { axios, simpleAxios }
