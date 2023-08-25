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
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((resp) => resp.data);
};

//load single post of given id
export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then((resp) => resp.data);
};

//upload post banner image
export const uploadPostImage = (image, postId) => {
  let form = new FormData();
  form.append("image", image);
  return privateAxios
    .post(`/post/image/upload/${postId}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data);
};

//get category wise posts
export const loadPostCategoryWise = (categoryId) => {
  return privateAxios
    .get(`/category/${categoryId}/posts`)
    .then((resp) => resp.data);
};

//get user wise posts
export const loadPostUserWise = (userId) => {
  return privateAxios.get(`/user/${userId}/posts`).then((resp) => resp.data);
};

//delete post by id
export function deletePost(postId) {
  return privateAxios.delete(`/posts/${postId}`).then((resp) => resp.data);
}
