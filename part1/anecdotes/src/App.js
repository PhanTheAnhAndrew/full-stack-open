import React, { useState } from "react";

const Display = ({ value }) => <h2>{value}</h2>;

const Button = ({ onClick, text }) => (
  <button style={{ marginRight: "5px" }} onClick={onClick}>
    {text}
  </button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [maxVotes, setMaxVotes] = useState(0);

  const handleVote = () => {
    points[selected] += 1;
    if (points[selected] > maxVotes) {
      setMaxVotes(points[selected]);
    }
    setPoints([...points]);
  };

  const handleClick = () => {
    let newIndex = 0;
    do {
      newIndex = Math.floor(Math.random() * anecdotes.length);
    } while (newIndex === selected);
    setSelected(newIndex);
  };

  const resultIndex = points.findIndex((each) => each === maxVotes);
  const result = anecdotes[resultIndex];

  return (
    <div>
      <Display value="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleClick} />
      <br />
      <Display value="Anecdote with most votes" />
      <div>{result}</div>
    </div>
  );
};

export default App;
