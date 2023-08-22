import React, { useEffect, useState } from "react";
import Base from "./Base";
import { loadAllPosts } from "../../Services/post_service";
import {
  Row,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";

const Feed = () => {
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    //load all posts from server
    changePage(0);
  }, []);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > posts.pageNumber && posts.lastPage) {
      return;
    }
    if (pageNumber < posts.pageNumber && posts.pageNumber == 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPosts(data);
        window.scroll(0, 0);
      })
      .catch((err) => toast.error("Error in loading posts"));
  };

  return (
    <Base>
      <Container className="mt-3">
        <div className="container-fluid">
          <Row>
            <Col
              md={{
                size: 10,
                offset: 1,
              }}
            >
              <h1>Blogs count ({posts?.totalElements})</h1>
              {posts.content.map((post) => (
                <Post post={post} key={post.id} />
              ))}

              <Container className="mt-3 mb-5">
                <Pagination>
                  <PaginationItem
                    disabled={posts.pageNumber == 0}
                    onClick={() => changePage(posts.pageNumber - 1)}
                  >
                    <PaginationLink previous></PaginationLink>
                  </PaginationItem>
                  {[...Array(posts.totalPages)].map((item, index) => (
                    <PaginationItem
                      onClick={() => {
                        posts.pageNumber = index;
                        changePage(index)
                      }}
                      active={index == posts.pageNumber}
                      key={index}
                    >
                      <PaginationLink>{index + 1}</PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem
                    disabled={posts.lastPage}
                    onClick={() => changePage(posts.pageNumber + 1)}
                  >
                    <PaginationLink next></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </Container>
            </Col>
          </Row>
        </div>
      </Container>
    </Base>
  );
};

export default Feed;
