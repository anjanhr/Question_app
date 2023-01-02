import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLoginUser } from "../actions/userAction";
import ParticlesBg from "particles-bg";
import homepic3 from "../home3.png";

const UserLogin = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const formData = {
        email: email,
        password: password,
      };
      dispatch(startLoginUser(formData, reDirect));
      function reDirect(user) {
        localStorage.setItem("User_in", "user is logged in");
        if (user.role === "admin") {
          props.history.push(`/admin/${user._id}/${user.userName}/dashboard`);
        } else {
          props.history.push(`/student/${user._id}/${user.userName}/dashboard`);
        }
      }
    }
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ParticlesBg type="square" bg={true} />
        {/* ball, circle, cobweb, square, fountain, random */}

        <img
          style={{ marginLeft: "1.5rem", marginTop: "0.9rem" }}
          src={homepic3}
          height={45}
          width={55}
          alt="netwrok error"
        />

        <h1 style={{ letterSpacing: "1rem", marginLeft: "26.3rem" }}>
          Question App
          <Link
            to="/user/register"
            style={{
              fontSize: "17px",
              color: "purple",
              marginLeft: "21.5rem",
              letterSpacing: "0.02rem",
            }}
          >
            Registration
          </Link>
        </h1>
      </div>
      <hr style={{ marginTop: "-1rem" }} />
      <br />

      <div className="log boxshadow" style={{ marginTop: "2.5rem" }}>
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
          <input
            className="inputstyle"
            style={{ marginTop: "2rem" }}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Your Password"
          />
          <br />

          <input
            style={{ marginTop: "2rem", width: "10%" }}
            className="regcolor1"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </>
  );
};

export default UserLogin;
