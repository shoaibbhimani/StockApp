const todosReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_UPDATE":
      const new_state = action.data.reduce(
        (accumulator, currentValue) => {
          if (accumulator[currentValue[0]]) {
            const currentStock = accumulator[currentValue[0]];

            accumulator[currentValue[0]] = {
              price: currentValue[1],
              last_price: currentStock.price,
              data_sets: currentStock.data_sets.concat(currentValue[1]),
              last_updated: new Date(),
              backgroundColor: currentStock.price > currentValue[1] ? "#00D594" : "#FF4500",
              icon: currentStock.price > currentValue[1] ? "+" : "-",
            };
          } else {
            accumulator[currentValue[0]] = {
              price: currentValue[1],
              last_price: null,
              data_sets: [],
              last_updated: new Date(),
              backgroundColor: "",
              icon: ""
            };
          }

          return accumulator;
        },
        { ...state }
      );
      return new_state;
    default:
      return state;
  }
};

export default todosReducer;
