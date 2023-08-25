import React, { useEffect, useState } from "react";
import Base from "../Components/Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../Components/CategorySideMenu";
import { loadPostCategoryWise } from "../Services/post_service";
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
                return <Post post={post} key={index} />;
              })}

            {post.length <= 0 ? <h1>There are no posts here</h1> : null}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
