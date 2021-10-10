const reducer = (state = {}, action) => {
  switch (action.type) {
  case 'UPDATE_MESSAGE': {
    return {
      message: action.message,
      id: action.id,
    };
  }
  default: return state;
  }
}

const setNotification = (message, id) => ({
  type: 'UPDATE_MESSAGE',
  message,
  id,
});

export const updateMessage = (message, seconds = 5) => {
  return (dispatch, getState) => {
    const notificationId = getState().notification.id;
    if (typeof notificationId === 'number') {
      clearTimeout(notificationId);
    }
    const id = setTimeout(() => {
      dispatch(setNotification(''));
    }, seconds * 1000);
    dispatch(setNotification(message, id));
  }
};

export default reducer