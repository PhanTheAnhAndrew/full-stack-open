import React from "react";

const Header = ({ course, isSubHeader }) => {
  return isSubHeader ? <h2>{course}</h2> : <h1>{course}</h1>;
};

export default Header;
