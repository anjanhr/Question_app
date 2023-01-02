import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startHomeAction } from "../actions/homeAction";
import "../style2.css";
import { startGetUserAccount } from "../actions/userAction";
import stunavicon from "../stunavicon.png";
import adminnavicon from "../adminnavicon.png";

const NavBar = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetUserAccount());
  }, [dispatch]);

  const userData = useSelector((state) => {
    return state.userData;
  });

  const handleLogout = () => {
    localStorage.clear();
    dispatch(startHomeAction(true));
    props.history.push("/");
  };

  return (
    <div>
      {userData.length !== 0 && userData.role === "admin" ? (
        <nav className="nav">
          <img
            style={{ marginLeft: "-2.5rem" }}
            src={adminnavicon}
            width={45}
            height={45}
            alt="not found"
          />
          <div style={{ marginRight: "-1rem" }}>
            <ul className="navbar">
              <li>
                <Link
                  className="link"
                  to={`/admin/${userData._id}/${userData.userName}/dashboard`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link className="logout" to="/" onClick={handleLogout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="nav">
          <img
            style={{ marginLeft: "-2.5rem" }}
            src={stunavicon}
            width={50}
            height={45}
            alt="not found"
          />
          <div style={{ marginRight: "-2rem" }}>
            <ul className="navbar">
              <li>
                <Link
                  className="link"
                  to={`/student/${userData._id}/${userData.userName}/dashboard`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="link2"
                  to={`/student/${userData._id}/${userData.userName}/responses`}
                >
                  FeedBack
                </Link>
              </li>
              <li>
                <Link className="logout" to="/" onClick={handleLogout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default withRouter(NavBar);
