import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  const {
    part: { name, exercises },
  } = props;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((each) => (
        <Part part={each} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((res, cur) => {
    return res + cur.exercises;
  }, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const { name, parts } = course;

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
