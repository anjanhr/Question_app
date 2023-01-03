import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLoginUser } from "../actions/userAction";
import ParticlesBg from "particles-bg";
import homepic3 from "../home3.png";
import { useFormik } from "formik";
import * as yup from "yup";

const UserLogin = (props) => {
  const dispatch = useDispatch();
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validationSchema = yup.object({
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
    dispatch(startLoginUser(data, reDirect));
    function reDirect(user) {
      localStorage.setItem("User_in", "user is logged in");
      if (user.role === "admin") {
        props.history.push(`/admin/${user._id}/${user.userName}/dashboard`);
      } else {
        props.history.push(`/student/${user._id}/${user.userName}/dashboard`);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
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
        <form onSubmit={formik.handleSubmit}>
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
            style={{ marginTop: "1rem" }}
            className="inputstyle"
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
            style={{ marginTop: "1rem", letterSpacing: "0.01rem" }}
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
