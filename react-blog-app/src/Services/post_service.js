import { privateAxios } from "./helper_service";
import { myAxios } from "./helper_service";

//Create post function
export const createPost = (postData) => {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((resp) => resp.data);
};

//get all posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((resp) => resp.data);
};
