import React, { Fragment } from "react";
import "../style.css";

const LikesHoverModal = (props) => {
  const { hoverData } = props;

  return (
    <div>
      <div className="overlay2">
        <div
          className="modal2"
          style={{ border: "1px solid green", borderRadius: "20px" }}
        >
          <header className="modal_header2" style={{ borderRadius: "20px" }}>
            <div>
              <h2 className="list2">Students</h2>
            </div>
          </header>
          <br />
          <ul>
            {hoverData.map((ele, i) => {
              return (
                <Fragment key={i}>
                  <li>{ele.studentName}</li>
                  <br />
                </Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LikesHoverModal;
