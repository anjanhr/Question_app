import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startHomeAction } from "../actions/homeAction";
import { startGetAdminQuestion } from "../actions/adminAction";
import NavBar from "./NavBar";
import AdminQuestions from "./AdminQuestions";

const AdminDashboard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startHomeAction(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(startGetAdminQuestion());
  }, [dispatch]);

  const adminQuestionsData = useSelector((state) => {
    return state.adminQuestionsData;
  });

  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "3rem" }}></div>
      {adminQuestionsData.length !== 0 && (
        <>
          <span style={{ fontSize: "23px", marginLeft: "2.3rem" }}>
            <b>Total Questions : &nbsp;</b>
            {adminQuestionsData[0].totalQuestions}
          </span>
          <span style={{ fontSize: "23px", marginLeft: "6rem" }}>
            <b>Answered Questions :&nbsp;</b>
            {adminQuestionsData[0].answeredData.length !== 0
              ? adminQuestionsData[0].answeredData.length
              : 0}
          </span>
          <span style={{ fontSize: "23px", marginLeft: "6rem" }}>
            <b>Not Answered Questions : &nbsp;</b>
            {adminQuestionsData[0].notAnsweredData.length !== 0
              ? adminQuestionsData[0].notAnsweredData.length
              : 0}
          </span>

          <h1
            className="texting"
            style={{ textAlign: "center", marginTop: "3rem" }}
          >
            Not Answered
          </h1>
          {adminQuestionsData[0].notAnsweredData.length === 0 ? (
            <h2 style={{ textAlign: "center", color: "green" }}>
              No more Questions
            </h2>
          ) : (
            <ol>
              <AdminQuestions
                typeData={adminQuestionsData[0].notAnsweredData}
              />
            </ol>
          )}

          <h1 className="texting" style={{ textAlign: "center" }}>
            Answered
          </h1>
          {adminQuestionsData[0].answeredData.length === 0 ? (
            <h2 style={{ textAlign: "center", color: "green" }}>Bring It On</h2>
          ) : (
            <ol>
              <AdminQuestions
                typeData={adminQuestionsData[0].answeredData}
                allowButton={true}
              />
            </ol>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
