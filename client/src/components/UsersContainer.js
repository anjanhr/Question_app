import React from "react";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import StudentResponse from "./StudentResponse";
import "../style.css";

const UsersContainer = (props) => {
  let homeData = useSelector((state) => {
    return state.homeData;
  });

  return (
    <div>
      <>
        {homeData && (
          <>
            <h1 style={{ textAlign: "center" }}>Question Manager App</h1>
            <hr />
            <div className="box1 center" style={{ marginTop: "3rem" }}>
              <Link
                to="/user/register"
                style={{
                  marginLeft: "3rem",
                }}
              >
                <button className="regcolor1"> Register </button>
              </Link>
              <Link
                to="/user/login"
                style={{
                  marginLeft: "3rem",
                }}
              >
                <button className="regcolor1"> Login </button>
              </Link>
            </div>
          </>
        )}
      </>
      <Route
        exact
        path="/user/register"
        render={(props) => {
          return <UserRegister {...props} />;
        }}
      />

      <Route
        exact
        path="/user/login"
        render={(props) => {
          return <UserLogin {...props} />;
        }}
      />

      <Route
        exact
        path="/admin/:id/:name/dashboard"
        render={(props) => {
          return <AdminDashboard {...props} />;
        }}
      />

      <Route
        exact
        path="/student/:id/:name/dashboard"
        render={(props) => {
          return <StudentDashboard {...props} />;
        }}
      />

      <Route
        exact
        path="/student/:id/:name/responses"
        render={(props) => {
          return <StudentResponse {...props} />;
        }}
      />
    </div>
  );
};
export default UsersContainer;
