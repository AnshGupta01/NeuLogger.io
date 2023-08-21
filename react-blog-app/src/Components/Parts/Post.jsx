import React from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";

const Post = ({
  post = {
    title: "This is default post title",
    content: "This is default post content",
  },
}) => {
  return (
    <Card className="shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText>
          {post.content.substring(0,50)}...
        </CardText>
        <div>
          <Button>Read More</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
