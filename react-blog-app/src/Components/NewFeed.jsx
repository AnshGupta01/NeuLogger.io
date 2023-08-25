import React, { useEffect, useState } from "react";
import { deletePost, loadAllPosts } from "../Services/post_service";
import { Row, Col } from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeed = () => {
  const [posts, setPosts] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    //load all posts from server
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > posts.pageNumber && posts.lastPage) {
      return;
    }
    if (pageNumber < posts.pageNumber && posts.pageNumber === 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPosts({
          content: [...posts.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
        //window.scroll(0, 0);
      })
      .catch((err) => toast.error("Error in loading posts"));
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };

  //function to delete post
  function deleteThePost(post) {
    //deleting post
    deletePost(post.id)
      .then((resp) => {
        console.log(resp);
        toast.success("Post is deleted...");
        let newPostContents = posts.content.filter(p=>p.id != post.id)
        setPosts({...posts, content: newPostContents})
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting post");
      });
  }

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,

          }}
        >
          <h1>Blogs count ({posts?.totalElements})</h1>

          <InfiniteScroll
            dataLength={posts.content.length}
            next={changePageInfinite}
            hasMore={!posts.lastPage}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>This is the last post</b>
              </p>
            }
          >
            {posts.content.map((post) => (
              <Post deletePost={deleteThePost} post={post} key={post.id} />
            ))}
          </InfiniteScroll>

          {/* <Container className="mt-3 mb-5">
                <Pagination>
                  <PaginationItem
                    disabled={posts.pageNumber === 0}
                    onClick={() => changePage(posts.pageNumber - 1)}
                  >
                    <PaginationLink previous></PaginationLink>
                  </PaginationItem>
                  {[...Array(posts.totalPages)].map((item, index) => (
                    <PaginationItem
                      onClick={() => {
                        posts.pageNumber = index;
                        changePage(index);
                      }}
                      active={index === posts.pageNumber}
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
              </Container> */}
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
