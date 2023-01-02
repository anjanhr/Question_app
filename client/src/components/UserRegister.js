import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../actions/userAction";
import "../style.css";
import ParticlesBg from "particles-bg";
import homepic3 from "../home3.png";

const UserRegister = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const formData = {
        userName,
        email,
        password,
      };
      dispatch(startRegisterUser(formData, reDirect));
      function reDirect() {
        props.history.push("/");
      }
    }
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
          <span
            to="/user/register"
            style={{
              fontSize: "17px",
              color: "purple",
              marginLeft: "16.8rem",
              letterSpacing: "0.02rem",
            }}
          >
            Already a user? <Link to={`/`}> Login </Link>
          </span>
        </h1>
      </div>
      <hr style={{ marginTop: "-1rem" }} />

      <div className="reg" style={{ marginTop: "4rem" }}>
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
          <input
            className="inputstyle"
            style={{ marginTop: "2rem" }}
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
            style={{ marginTop: "2rem" }}
            className="regcolor1"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </>
  );
};

export default UserRegister;
