import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

const Post = ({
  post = {
    id: -1,
    title: "This is default post title",
    content: "This is default post content",
  },
  deletePost,
}) => {
  const userContextData = useContext(userContext)
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  useEffect(() => {
    setUser(getCurrentUser());
    setLogin(isLoggedIn());
  }, []);

  return (
    <Card className="shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{ __html: post.content.substring(0, 60) }}
        />
        <div>
          <Link className="btn btn-secondary border-0" to={"/posts/" + post.id}>
            Read More
          </Link>
          
          {userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <Button
                onClick={() => deletePost(post)}
                color="danger"
                className="ms-2"
              >
                Delete
              </Button>
            ) : (
              ""
            ))}
          {userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <Button
                tag={Link} to={`/user/update-blog/${post.id}`}
                color="warning"
                className="ms-2"
              >
                Update
              </Button>
            ) : (
              ""
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
