import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../Services/category_service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories([...data]);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in loading categories");
      });
  }, []);

  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/feed" action={true} className="border-0">
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((cat, index) => {
            return (
              <ListGroupItem
                action={true}
                className="border-0 shadow-5 mt-1"
                key={index}
                tag={Link}
                to={"/categories/" + cat.categoryId}
              >
                {cat.categoryTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default CategorySideMenu;
