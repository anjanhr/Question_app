import React, { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { startHomeAction } from "../actions/homeAction";
import StudentScaling from "./StudentScaling";
import "../style.css";
import thumb from "../thumb.png";
import NavBar from "./NavBar";
import { startGetStudentRatedQuestions } from "../actions/studentAction";

const StudentResponse = (props) => {
  const studentId = props.match.params.id;
  const studentName = props.match.params.name;
  const [ratedQuestions, setRatedQuestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startHomeAction(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(startGetStudentRatedQuestions(studentId, reDirect));
    function reDirect(data) {
      setRatedQuestions(data);
    }
  }, [dispatch, studentId]);

  const recallRating = () => {
    dispatch(startGetStudentRatedQuestions(studentId, reDirect));
    function reDirect(data) {
      setRatedQuestions(data);
    }
  };

  return (
    <>
      <NavBar />
      <h4 style={{ textAlign: "center", marginTop: "2rem" }}>
        <span
          style={{
            fontFamily: "Lucida Bright",
            fontSize: "28px",
            letterSpacing: "0.2em",
          }}
        >
          Your Rating Matters
        </span>
      </h4>
      <br />
      <div>
        <ol>
          {ratedQuestions.length !== 0 ? (
            <>
              {ratedQuestions.map((ele) => {
                const createdDate = ele.createdAt;
                const dFormat = createdDate.slice(0, 10).split("-");
                const finalFormat = format(
                  new Date(dFormat[0], dFormat[1] - 1, dFormat[2]),
                  "cccc, do MMM yyyy"
                );
                return (
                  <Fragment key={ele._id}>
                    <li className="box3" style={{ fontFamily: "Book Antiqua" }}>
                      {ele.body}
                    </li>
                    <p>
                      &nbsp;
                      <span style={{ cursor: "not-allowed" }}>
                        <img
                          src={thumb}
                          height="30px"
                          width="30px"
                          alt="figure"
                        />
                      </span>
                      &nbsp;
                      <span style={{ fontSize: "16px" }}>
                        {ele.rating.length}
                      </span>
                      <span
                        style={{
                          marginLeft: "5rem",
                          marginRight: "-3rem",
                          fontSize: "14px",
                          fontFamily: "Book Antiqua",
                        }}
                      >
                        <b> Asked On : </b> {finalFormat}
                      </span>
                      <span
                        style={{
                          marginLeft: "8rem",
                          marginRight: "-8rem",
                          fontSize: "14px",
                          fontFamily: "Book Antiqua",
                        }}
                      >
                        <b> Answered On : </b>
                        {ele.answerType.date}
                      </span>
                      <button className="namebutton2">
                        <StudentScaling
                          {...ele}
                          studentId={studentId}
                          studentName={studentName}
                          recallRating={recallRating}
                        />
                      </button>
                    </p>
                    <br />
                    <br />
                  </Fragment>
                );
              })}
            </>
          ) : (
            <h1> No Answered Questions </h1>
          )}
        </ol>
      </div>
    </>
  );
};

export default StudentResponse;
