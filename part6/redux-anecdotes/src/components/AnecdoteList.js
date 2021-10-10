import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdotes } from '../reducers/anecdoteReducer';
import { updateMessage } from '../reducers/notificationReducer';

function AnecdoteList(props) {
  const vote = (id, content) => {
    const selectedAnecdote = props.anecdotes.find((each) => each.id === id);
    props.voteAnecdotes(selectedAnecdote);
    props.updateMessage(`you voted '${content}'`, 10);
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { filter, anecdotes } = state;
  return {
    anecdotes: anecdotes.filter((each) => !filter || (filter && each.content.indexOf(filter) > -1)).sort((a, b) => b.votes - a.votes),
  };
};

const mapDispatchToProps = {
  voteAnecdotes,
  updateMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
