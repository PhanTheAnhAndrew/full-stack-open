import React from 'react'
import { connect } from 'react-redux';
import { createAnecdotes } from '../reducers/anecdoteReducer';
import { updateMessage } from '../reducers/notificationReducer';

function AnecdoteForm(props) {

  const addAnecdotes = async (evt) => {
    evt.preventDefault();
    const content = evt.target.content.value;
    evt.target.content.value = '';
    props.createAnecdotes(content);
    props.updateMessage(`new anecdote '${content}'`);
  };

  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div><input name="content" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispathToProps = {
  createAnecdotes,
  updateMessage,
};

export default connect(null, mapDispathToProps)(AnecdoteForm);
