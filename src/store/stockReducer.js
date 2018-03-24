const todosReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_UPATES":
      const new_state = action.data.reduce((prev, next) => {
        if (prev[next[0]]) {
          prev[next[0]] = {
            price: next[1],
            data_sets: prev[next[0]].data_sets.concat(next[1])
          };
        } else {
          prev[next[0]] = {
            price: next[1],
            data_sets: []
          };
        }

        return prev;
      }, {...state});
      return new_state;
    default:
      return state;
  }
};

export default todosReducer;
