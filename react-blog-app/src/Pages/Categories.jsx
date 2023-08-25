import React, { useEffect, useState } from "react";
import Base from "../Components/Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../Components/CategorySideMenu";
import { deletePost, loadPostCategoryWise } from "../Services/post_service";
import { toast } from "react-toastify";
import Post from "../Components/Post";

function Categories() {
  const [post, setPost] = useState([]);
  const { categoryId } = useParams();
  useEffect(() => {
    console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPost([...data]);
        console.log(post);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error loading posts");
      });
  }, [categoryId]);

  //function to delete post
  function deleteThePost(post1) {
    //deleting post
    deletePost(post1.id)
      .then((resp) => {
        console.log(resp);
        toast.success("Post is deleted...");
        let newPosts = post.filter(p=> p.id != post1.id)
        setPost([...newPosts])
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting post");
      });
  }

  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={2} className="pt-3">
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <h1>Blogs count ({post?.length})</h1>
            {post &&
              post.map((post, index) => {
                return <Post deletePost={deleteThePost} post={post} key={index} />;
              })}

            {post.length <= 0 ? <h1>There are no posts here</h1> : null}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
