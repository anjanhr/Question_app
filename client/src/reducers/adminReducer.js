const initialState = [];

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ADMIN_QUESTION": {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default adminReducer;
