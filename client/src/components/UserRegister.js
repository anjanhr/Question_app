import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../actions/userAction";
import "../style.css";
import ParticlesBg from "particles-bg";
import homepic3 from "../home3.png";
import { useFormik } from "formik";
import * as yup from "yup";

const UserRegister = (props) => {
  const dispatch = useDispatch();
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validationSchema = yup.object({
    userName: yup
      .string()
      .min(10, "Name is too Short!")
      .max(30, "Name is too Long!")
      .required(),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required()
      .min(10, "Email is too Short!")
      .max(30, "Email is too Long!"),
    password: yup
      .string()
      .matches(PASSWORD_REGEX, "Please enter a strong password")
      .required()
      .min(10, "Password is too Short!")
      .max(30, "Password is too Long!"),
  });

  const onSubmit = (values) => {
    const { ...data } = values;
    dispatch(startRegisterUser(data, reDirect));
    function reDirect() {
      props.history.push("/");
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit,
  });

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
        <form onSubmit={formik.handleSubmit}>
          <label style={{ color: "red" }}>
            {formik.touched.userName && formik.errors.userName ? (
              <span>
                {formik.errors.userName} <br />
              </span>
            ) : (
              ""
            )}
          </label>
          <input
            className="inputstyle"
            style={{ marginTop: "1rem", letterSpacing: "0.01rem" }}
            type="text"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Your Name"
          />
          <br /> <br />
          <label style={{ color: "red" }}>
            {formik.touched.email && formik.errors.email ? (
              <span>
                {formik.errors.email} <br />
              </span>
            ) : (
              ""
            )}
          </label>
          <input
            className="inputstyle"
            style={{ marginTop: "1rem" }}
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Your Mail"
          />
          <br /> <br />
          <label style={{ color: "red" }}>
            {formik.touched.password && formik.errors.password ? (
              <span>
                {formik.errors.password} <br />
              </span>
            ) : (
              ""
            )}
          </label>
          <input
            className="inputstyle"
            style={{ marginTop: "1rem" }}
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
