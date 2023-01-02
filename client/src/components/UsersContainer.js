import React from "react";
import { Route } from "react-router-dom";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import StudentResponse from "./StudentResponse";
import "../style.css";

const UsersContainer = (props) => {
  return (
    <div>
      <Route
        exact
        path="/"
        render={(props) => {
          return <UserLogin {...props} />;
        }}
      />

      <Route
        exact
        path="/user/register"
        render={(props) => {
          return <UserRegister {...props} />;
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
