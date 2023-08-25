import React, { useEffect, useState } from "react";
import Base from "./Base";
import AddPost from "../Pages/AddPost";
import { Container } from "reactstrap";
import { getCurrentUser } from "../auth";
import { deletePost, loadPostUserWise } from "../Services/post_service";
import { toast } from "react-toastify";
import Post from "./Post";

const Userdashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(getCurrentUser());
    setUser(getCurrentUser());
    loadPostData();
  }, []);

  function loadPostData() {
    loadPostUserWise(getCurrentUser().id)
      .then((data) => {
        console.log(data);
        setPosts([...data.content].reverse());
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error loading user posts");
      });
  }

  //function to delete post
  function deleteThePost(post) {
    //deleting post
    deletePost(post.id)
      .then((resp) => {
        console.log(resp);
        toast.success("Post is deleted...");
        let newPosts = posts.filter(p=> p.id != post.id)
        setPosts([...newPosts])
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting post");
      });
  }

  return (
    <Base>
      <Container>
        <AddPost />
        <h1 className="my-3">Number of posts: ({posts.length})</h1>

        {posts.map((post, index) => {
          return <Post post={post} key={index} deletePost={deleteThePost} />;
        })}
      </Container>
    </Base>
  );
};

export default Userdashboard;
