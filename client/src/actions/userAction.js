import axios from "axios";
import cogoToast from "cogo-toast";
// http://localhost:3000

export const startRegisterUser = (formData, reDirect) => {
  return (dispatch, getState) => {
    axios
      .post("/api/user/register", formData)
      .then((response) => {
        cogoToast.success("Thanks for Registering");
        reDirect();
      })
      .catch((error) => {
        cogoToast.error(error.message); // server related error
      });
  };
};

export const startLoginUser = (formData, reDirect) => {
  return (dispatch) => {
    axios
      .post("/api/user/login", formData)
      .then((response) => {
        if (response.data.error) {
          cogoToast.error(response.data.error); // invalid email or password
        } else {
          // generated token comes as -> response.data.token
          const token = response.data.token.split(" ")[1];
          localStorage.setItem("myToken", token);
          axios
            .get(`/api/user/account`, {
              headers: {
                Authorization: response.data.token,
              },
            })
            .then((response) => {
              if (response.data.error) {
                cogoToast.error(response.data.error.message); // token altered
              } else if (response.data.notice) {
                cogoToast.error(response.data.notice); // token not given
              } else {
                reDirect(response.data); // user data
              }
            })
            .catch((error) => {
              cogoToast.error(error.message); // server error
            });
        }
      })
      .catch((error) => {
        cogoToast.error(error.message); //server related error
      });
  };
};

export const startGetUserAccount = () => {
  return (dispatch) => {
    axios
      .get(`/api/user/account`, {
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
          dispatch(getUserAccount(response.data)); // user data
        }
      })
      .catch((error) => {
        cogoToast.error(error.message); // server error
      });
  };
};

const getUserAccount = (userData) => {
  return {
    type: "GET_USER_ACCOUNT",
    payload: userData,
  };
};
