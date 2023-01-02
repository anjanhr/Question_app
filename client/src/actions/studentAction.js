import axios from "axios";
import cogoToast from "cogo-toast";

export const startGetStudentQuestion = (studentId) => {
  return (dispatch) => {
    axios
      .get(`/api/student/${studentId}/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          cogoToast.error(response.data.error.message); // token altered
        } else if (response.data.notice) {
          cogoToast.error(response.data.notice); // token not given
        } else {
          dispatch(getStudentQuestion(response.data));
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

const getStudentQuestion = (questionData) => {
  return {
    type: "GET_STUDENT_QUESTION",
    payload: questionData,
  };
};

export const startGetStudentAllQuestions = (studentId, reDirect) => {
  return (dispatch) => {
    axios
      .get(`/api/student/${studentId}/all/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          cogoToast.error(response.data.error.message); // token altered
        } else if (response.data.notice) {
          cogoToast.error(response.data.notice); // token not given
        } else {
          reDirect(response.data);
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

export const startGetStudentRatedQuestions = (studentId, reDirect) => {
  return (dispatch) => {
    axios
      .get(`/api/student/${studentId}/questions/rated`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          cogoToast.error(response.data.error.message); // token altered
        } else if (response.data.notice) {
          cogoToast.error(response.data.notice); // token not given
        } else {
          reDirect(response.data);
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

export const startPostQuestion = (formData, reDirect) => {
  return (dispatch) => {
    axios
      .post("/api/student/questions", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          cogoToast.error(response.data.error.message); // token altered
        } else if (response.data.notice) {
          cogoToast.error(response.data.notice); // token not given
        } else {
          reDirect();
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

export const startPostRatingQuestion = (qtnid, ratingData, reDirect) => {
  return (dispatch) => {
    axios
      .post(`/api/student/questions/${qtnid}`, ratingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          cogoToast.error(response.data.error.message); // token altered
        } else if (response.data.notice) {
          cogoToast.error(response.data.notice); // token not given
        } else {
          reDirect();
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

export const startPostStudentScaleQuestion = (qtnId, scalingData, reDirect) => {
  return (dispatch) => {
    axios
      .post(`/api/student/questions/${qtnId}/scaling`, scalingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          cogoToast.error(response.data.error.message); // token altered
        } else if (response.data.notice) {
          cogoToast.error(response.data.notice); // token not given
        } else {
          reDirect();
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};
