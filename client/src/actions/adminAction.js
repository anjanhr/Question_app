import axios from "axios";

export const startGetAdminQuestion = (reDirect) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3090/api/admin/questions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error.message); // token altered
        } else if (response.data.notice) {
          alert(response.data.notice); // token not given
        } else {
          dispatch(getAdminQuestion(response.data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

const getAdminQuestion = (questionData) => {
  return {
    type: "GET_ADMIN_QUESTION",
    payload: questionData,
  };
};

export const startGetFeedBackResponses = (questionId, reDirect) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3090/api/questions/${questionId}/feedback`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error.message); // token altered
        } else if (response.data.notice) {
          alert(response.data.notice); // token not given
        } else {
          reDirect(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const startAnswerQuestion = (qtnId, formData, reDirect) => {
  return () => {
    axios
      .post(
        `http://localhost:3090/api/questions/${qtnId}/answertype`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error.message); // token altered
        } else if (response.data.notice) {
          alert(response.data.notice); // token not given
        } else {
          reDirect();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const startPutQuestionRating = (qtnId, responses) => {
  return () => {
    axios
      .put(`http://localhost:3090/api/questions/${qtnId}/rating`, responses, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error.message); // token altered
        } else if (response.data.notice) {
          alert(response.data.notice); // token not given
        } else {
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};
