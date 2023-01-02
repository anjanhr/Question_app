import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startHomeAction } from "../actions/homeAction";
import { startLoginUser } from "../actions/userAction";

const UserLogin = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(startHomeAction(false));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const formData = {
        email: email,
        password: password,
      };
      dispatch(startLoginUser(formData, reDirect));
      function reDirect(user) {
        if (user.role === "admin") {
          props.history.push(`/admin/${user._id}/${user.userName}/dashboard`);
        } else {
          props.history.push(`/student/${user._id}/${user.userName}/dashboard`);
        }
      }
    }
  };

  const handleCancel = () => {
    dispatch(startHomeAction(true));
    props.history.push("/");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Question Manager App</h1>
      <hr />
      <br />
      <div className="box1 center">
        <h1> Login Here </h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inputstyle"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Your Mail"
          />
          <br />
          <br />
          <input
            className="inputstyle"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Your Password"
          />
          <br />
          <br />
          <input className="regcolor1" type="submit" value="Login" />
          &nbsp;&nbsp;&nbsp;
          <button className="regcolor2" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
