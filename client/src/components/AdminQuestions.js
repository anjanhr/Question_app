import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import {
  startGetAdminQuestion,
  startAnswerQuestion,
} from "../actions/adminAction";
import "../style.css";
import thumb from "../thumb.png";
import LikesHoverModal from "./LikesHoverModal";
import { startPutQuestionResponse } from "../actions/adminAction";
import FeedBackViewModal from "./FeedBackViewModal";
import { startGetFeedBackResponses } from "../actions/adminAction";

const AdminQuestions = (props) => {
  const { typeData, allowButton } = props;

  const [responseData, setResponseData] = useState({});
  const [isOpen, setIsopen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverData, setHoverData] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const finalFormat = format(
      new Date(year, month, date),
      "cccc, do MMM yyyy"
    );

    const formData = {
      answered: checked,
      date: finalFormat,
    };

    const responses = [];

    if (checked === false) {
      dispatch(startPutQuestionResponse(id, responses));
    }

    dispatch(startAnswerQuestion(id, formData, reDirect));
    function reDirect() {
      dispatch(startGetAdminQuestion());
    }
  };

  const handleMouseOver = (rating) => {
    setIsHovering(true);
    setHoverData(rating);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const modalclosefun = () => {
    setIsopen(false);
  };

  const handleRepsonses = (questionId) => {
    setIsopen(true);
    dispatch(startGetFeedBackResponses(questionId, reDirect));
    function reDirect(responseData) {
      setResponseData(responseData);
    }
  };

  return (
    <>
      {isOpen && (
        <FeedBackViewModal
          modalclosefun={modalclosefun}
          responseData={responseData}
        />
      )}

      {isHovering && (
        <LikesHoverModal typeData={typeData} hoverData={hoverData} />
      )}

      {typeData.map((ele) => {
        const createdDate = ele.createdAt;
        const dFormat = createdDate.slice(0, 10).split("-");
        const finalFormat = format(
          new Date(dFormat[0], dFormat[1] - 1, dFormat[2]),
          "cccc, do MMM yyyy"
        );

        return (
          <Fragment key={ele._id}>
            <li> {ele.body} </li>
            <p>
              &nbsp;
              <img
                src={thumb}
                onMouseOver={() => {
                  handleMouseOver(ele.rating);
                }}
                onMouseOut={handleMouseOut}
                style={{ cursor: "pointer" }}
                height="30px"
                width="30px"
                alt="figure"
              />
              &nbsp;
              {ele.rating.length}
              <span style={{ marginLeft: "4rem" }}>
                <input
                  type="checkbox"
                  value={ele._id}
                  checked={ele.answerType.answered}
                  onChange={handleChange}
                />
              </span>
              &nbsp; Answered
              <span style={{ marginLeft: "4rem" }}>
                <b> Asked By :</b> {ele.student.userName}
              </span>
              <span style={{ marginLeft: "4rem" }}>
                <b>Asked On :</b> {finalFormat}
              </span>
              <span style={{ marginLeft: "4rem" }}>
                {ele.answerType.answered ? (
                  <span>
                    <b>Answered On :</b> {ele.answerType.date}
                  </span>
                ) : (
                  ""
                )}
              </span>
              {allowButton === true && ele.responses.length !== 0 ? (
                <button
                  className="logincolor5"
                  style={{ marginLeft: "4rem" }}
                  onClick={() => {
                    handleRepsonses(ele._id);
                  }}
                >
                  Responses
                </button>
              ) : (
                allowButton === true && (
                  <button
                    className="logincolor6"
                    style={{ marginLeft: "4rem", cursor: "not-allowed" }}
                  >
                    No Response
                  </button>
                )
              )}
            </p>
            <br />
          </Fragment>
        );
      })}
    </>
  );
};

export default AdminQuestions;
