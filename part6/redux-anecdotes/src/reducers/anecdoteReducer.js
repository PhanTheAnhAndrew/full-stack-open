import anecdoteService from "../services/anecdote";

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT': {
    return action.anecdotes;
  }
  case 'VOTE': {
    return action.anecdotes;
  }
  case 'CREATE': {
    return state.concat(action.anecdote);
  }
  default: return state;
  }
}

export const voteAnecdotes = (anecdote) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    const updatedList = anecdotes.map((each) => {
      if (each.id === updatedAnecdote.id) return updatedAnecdote;
      return each;
    });
    dispatch({
      type: 'VOTE',
      anecdotes: updatedList,
    })
  };
};

export const createAnecdotes = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'CREATE',
      anecdote,
    });
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      anecdotes,
    })
  };
};

export default reducer