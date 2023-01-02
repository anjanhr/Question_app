import React from "react";
import { Route, Redirect } from "react-router-dom";
import cogoToast from "cogo-toast";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("User_in") ? (
          <Component {...props} />
        ) : (
          <>
            {cogoToast.error(
              "You need to Login first, before accessing this Route"
            )}
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          </>
        );
      }}
    />
  );
};

export default PrivateRoute;
