import axios from "axios";

export const base_url = "http://localhost:9292";

export const myAxios = axios.create({
  baseURL: base_url,
});
