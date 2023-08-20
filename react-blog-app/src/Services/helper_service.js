import axios from "axios";
import { getToken } from "../auth";

export const base_url = "http://localhost:9292/api/v1";

export const myAxios = axios.create({
  baseURL: base_url,
});

export const privateAxios = axios.create({
  baseURL: base_url,
})

privateAxios.interceptors.request.use(config => {
  const token = getToken()
  if(token){
    config.headers.Authorization=`Bearer ${token}`
    return config
  }
}, error => Promise.reject(error))
