import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../Services/category_service";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost as doCreatePost } from "../Services/post_service";
import { getCurrentUser } from "../auth";

const AddPost = () => {
  const [category, setCategory] = useState([]);
  const editor = useRef(null);
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [user, setUser] = useState(undefined);

  const config = useMemo(
    () => ({
      placeholder: "Start typing...",
      buttons:
        "paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,fontsize,brush,,link,|,align,undo,redo",
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    }),
    []
  );

  useEffect(() => {
    setUser(getCurrentUser());
    loadAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Field change function
  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  //Content change function
  const contentFieldChange = (data) => {
    setPost({ ...post, content: data });
  };

  //Create post function
  const createPost = (event) => {
    event.preventDefault();
    //console.log(post);

    if (post.title.trim() === "" || post.content.trim() === "") {
      toast.error("Title or content is blank");
      return;
    }
    if (post.categoryId === "") {
      toast.error("Please choose a category");
      return;
    }

    //submitting the form on server
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {
        toast.success("Post is created");
        //console.log(post);
        setPost({
          title: "",
          content: "",
          categoryId: "",
        });
      })
      .catch((err) => {
        toast.error("Some issue occured");
        //console.log(err);
      });
  };

  return (
    <div className="wrapper">
      <Card className="shadow border-0 mt-2">
        <CardBody>
          <h3>Create a new post</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter title here"
                name="title"
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="content">Post content</Label>
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={contentFieldChange}
                config={config}
              />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="categoryId"
                placeholder="Add content here"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select Category--
                </option>
                {category.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" color="primary">
                Create Post
              </Button>
              <Button className="ms-2" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
