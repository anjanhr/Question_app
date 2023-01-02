import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cogoToast from "cogo-toast";
import {
  startGetStudentQuestion,
  startPostQuestion,
} from "../actions/studentAction";
import "../style.css";
import NavBar from "./NavBar";
import StudentQuestions from "./StudentQuestions";
import { startPostRatingQuestion } from "../actions/studentAction";

const StudentDashboard = (props) => {
  const studentId = props.match.params.id;
  const studentName = props.match.params.name;
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetStudentQuestion(studentId));
  }, [dispatch, studentId]);

  const studentQuestionsData = useSelector((state) => {
    return state.studentQuestionsData;
  });

  const handleVoteClicks = (qtnId, ratingArray, studentId, studentName) => {
    const isLiked = ratingArray.filter((ele) => {
      return ele.studentId === studentId;
    });
    if (isLiked.length === 0) {
      const ratingData = {
        studentId: studentId,
        studentName: studentName,
      };
      dispatch(startPostRatingQuestion(qtnId, ratingData, reDirect));
      function reDirect() {
        dispatch(startGetStudentQuestion(studentId));
      }
    } else {
      cogoToast.error("Already Liked It");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body) {
      const formData = {
        body: body,
        rating: [{ studentId: studentId, studentName: studentName }],
      };
      dispatch(startPostQuestion(formData, reDirect));
      function reDirect() {
        dispatch(startGetStudentQuestion(studentId));
        setBody("");
      }
    }
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <br />
        <textarea
          className="box2 center"
          value={body}
          onChange={handleChange}
          placeholder="what's the question !!!"
        />
        <br />
        <br /> &nbsp;
        <input className="logincolor4" type="submit" value="Submit" />
        <br /> <br />
      </form>
      <hr />
      {studentQuestionsData.length !== 0 && (
        <>
          <div className="flex-container">
            <div className="flex-child green">
              <h1> Friends Questions </h1>
              <br />
              <StudentQuestions
                typeQuestions={studentQuestionsData[0].friendsQuestions}
                studentId={studentId}
                studentName={studentName}
                handleVoteClicks={handleVoteClicks}
                allowbutton={true}
              />
            </div>

            <div className="flex-child magenta">
              <h1> My Questions </h1> <br />
              <StudentQuestions
                typeQuestions={studentQuestionsData[0].myQuestions}
                studentId={studentId}
                studentName={studentName}
                handleVoteClicks={handleVoteClicks}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentDashboard;
