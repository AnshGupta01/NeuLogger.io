import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import Base from "../Components/Base";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { loadPost, updatePost as doUpdatePost } from "../Services/post_service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories} from "../Services/category_service";
import JoditEditor from "jodit-react";

const UpdateBlog = () => {
  const [category, setCategory] = useState([]);
  const editor = useRef(null);

  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

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
    loadAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //load post check
    loadPost(blogId)
      .then((data) => {
        setPost({...data, categoryId: data.category.categoryId});
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in loading the post");
      });
  }, []);

  useEffect(() => {
    //Checking to see if the user's post to be updated is its own
    if (post) {
      console.log(object);
      console.log(post);
      if (post.user.id !== object.user.data.id) {
        toast.error("This is not your post");
        navigate("/feed");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const updatePost = (event) => {
    event.preventDefault()
    console.log(post)
    doUpdatePost({...post, category:{categoryId:post.categoryId} }, post.id)
    .then(resp => {
        console.log(resp)
        toast.success("Post updated successfully")
    }).catch(err=>{
        console.log(err)
        toast.error("Error in updating post")
    })

  }

  const updateHTML = () => {
    return (
      <div className="wrapper">
        <Card className="shadow border-0 mt-2">
          <CardBody>
            <h3>Update your post from here</h3>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter title here"
                  name="title"
                  value={post.title}
                  onChange={(event) => handleChange(event, "title")}
                />
              </div>
              <div className="my-3">
                <Label for="content">Post content</Label>
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={newContent => setPost({...post, content: newContent})}
                  config={config}
                />
              </div>
              {/* file field */}
              <div className="mt-3">
                <Label for="image">Select Post Image</Label>
                <Input id="image" type="file" onChange={""} accept="image/*" />
              </div>
              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="categoryId"
                  placeholder="Add content here"
                  name="categoryId"
                  onChange={(event) => handleChange(event, 'categoryId')}
                  value={post.categoryId}
                >
                  <option disabled value={0}>
                    --Select Category--
                  </option>
                  {category.map((category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>

              <Container className="text-center">
                <Button type="submit" color="primary">
                  Update Post
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

  return (
    <Base>
      <Container>{post && updateHTML()}</Container>
    </Base>
  );
};

export default UpdateBlog;
