import React from "react";
import { Link } from "react-router-dom";
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
        <CardText dangerouslySetInnerHTML={{__html: post.content.substring(0,60)}}/>
        <div>
          <Link className="btn btn-secondary border-0" to="/post">Read More</Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
