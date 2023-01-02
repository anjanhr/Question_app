const initialState = [];

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STUDENT_QUESTION": {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default studentReducer;
