import { myAxios } from "./helper_service";

export const loadAllCategories = () => {
    return myAxios.get("/categories/").then(resp => {return resp.data})
}