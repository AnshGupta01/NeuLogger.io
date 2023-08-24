import { privateAxios } from "./helper_service";

//Create comment service
export const createComment=(comment, postId) => {
    return privateAxios.post(`/post/${postId}/comments`, comment)
}