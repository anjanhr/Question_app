import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../actions/userAction";
import { startHomeAction } from "../actions/homeAction";
import "../style.css";

const UserRegister = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(startHomeAction(false));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const formData = {
        userName,
        email,
        password,
      };
      dispatch(startRegisterUser(formData));
    }
  };

  const handleCancel = () => {
    dispatch(startHomeAction(true));
    props.history.push("/");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "username") {
      setUserName(value);
    } else if (name === "email") {
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
        <h1> Register Here </h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inputstyle"
            type="text"
            name="username"
            value={userName}
            onChange={handleChange}
            placeholder="Enter Your Name"
          />
          <br />
          <br />
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
          <input className="regcolor1" type="submit" value="Register" />
          &nbsp;&nbsp;&nbsp;
          <button className="regcolor2" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
