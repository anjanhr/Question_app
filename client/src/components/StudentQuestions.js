import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { startGetStudentAllQuestions } from "../actions/studentAction";
import StudentQtnsModal from "./StudentQtnsModal";
import "../style.css";
import thumb from "../thumb.png";

const StudentQuestions = (props) => {
  const {
    typeQuestions,
    studentId,
    studentName,
    handleVoteClicks,
    allowbutton,
  } = props;

  const [isOpen, setIsopen] = useState(false);
  const [studentModalData, setStudentModalData] = useState([]);
  const dispatch = useDispatch();

  const modalclosefun = () => {
    setIsopen(false);
  };

  const handleStudentAllQuestions = (studentId) => {
    dispatch(startGetStudentAllQuestions(studentId, reDirect));
    function reDirect(data) {
      setStudentModalData(data);
      setIsopen(true);
    }
  };

  return (
    <>
      {isOpen && (
        <StudentQtnsModal
          modalclosefun={modalclosefun}
          studentModalData={studentModalData}
        />
      )}

      <ol>
        {typeQuestions.map((ele) => {
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
                <span
                  style={
                    allowbutton === undefined
                      ? { cursor: "not-allowed" }
                      : { cursor: "pointer" }
                  }
                  onClick={
                    allowbutton === undefined
                      ? ""
                      : () => {
                          handleVoteClicks(
                            ele._id,
                            ele.rating,
                            studentId,
                            studentName
                          );
                        }
                  }
                >
                  <img src={thumb} height="30px" width="30px" alt="figure" />
                </span>
                &nbsp;
                <span style={{ fontSize: "16px" }}>{ele.rating.length}</span>
                <span
                  style={{
                    marginLeft: "3rem",
                    fontSize: "14px",
                    fontFamily: "Book Antiqua",
                  }}
                >
                  <b>Asked On : </b> {finalFormat}
                </span>
                <button
                  disabled={allowbutton === undefined ? true : false}
                  style={allowbutton && { cursor: "pointer" }}
                  onClick={() => {
                    handleStudentAllQuestions(ele.student._id);
                  }}
                  className="namebutton4"
                >
                  {ele.student.userName}
                </button>
              </p>
              <br /> <br /> <br />
            </Fragment>
          );
        })}
      </ol>
    </>
  );
};

export default StudentQuestions;
