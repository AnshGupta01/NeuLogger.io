import CustomFooter from "./CustomFooter";
import CustomNavbar from "./CustomNavbar";

const Base = ({ title = "Welcome to our Blog site", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
        <CustomNavbar/>
      {children}
      <CustomFooter/>
    </div>
  );
};

export default Base;
