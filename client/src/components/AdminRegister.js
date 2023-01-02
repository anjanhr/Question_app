import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetAdmin } from "../actions/adminAction";
import { homeAction } from "../actions/homeAction";
import "../style.css";

const AdminRegister = (props) => {
  const dispatch = useDispatch();
  const [adminkey, setAdminKey] = useState("");

  useEffect(() => {
    dispatch(homeAction(false));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startGetAdmin(adminkey, reDirect));
    function reDirect(adminSecret) {
      if (adminSecret === "Authorized") {
        props.history.push(`/admin/dashboard`);
        setAdminKey("");
      } else {
        alert("Admin is UnAuthorized");
        setAdminKey("");
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAdminKey(value);
  };

  return (
    <div>
      <div className="box1 center">
        <form onSubmit={handleSubmit}>
          <h2> Admin Zone </h2>
          <input
            className="inputstyle"
            type="password"
            value={adminkey}
            onChange={handleChange}
            placeholder="Enter Secret Key "
          />
          <br />
          <br />
          <input className="logincolor3" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
