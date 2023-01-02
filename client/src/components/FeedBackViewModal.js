import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "../style.css";

const FeedBackViewModal = (props) => {
  const { modalclosefun, responseData } = props;

  return (
    <>
      {Object.keys(responseData).length !== 0 && (
        <div className="overlay">
          <div className="modal">
            <header className="modal_header">
              <div>
                <h2 className="list">{responseData.body}</h2>
              </div>
              <button onClick={modalclosefun} className="close_button">
                &times;
              </button>
            </header>
            <br />
            <br />

            <ol>
              {responseData.rating.map((ele1) => {
                const StudentUnderstanding = responseData.responses.filter(
                  (ele2) => {
                    return ele2.studentId === ele1.studentId;
                  }
                );
                return (
                  <li style={{ fontSize: "20px" }} key={ele1.studentId}>
                    <span style={{ fontSize: "20px" }}>
                      &nbsp; {ele1.studentName}
                      <button className="namebutton3">
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Rating
                            style={{ color: "darkorchid" }}
                            readOnly
                            max={10}
                            name="customized-10"
                            value={
                              StudentUnderstanding.length !== 0
                                ? StudentUnderstanding[0].understanding
                                : 0
                            }
                          />
                          &nbsp; &nbsp;
                        </Box>
                        <span style={{ fontSize: "15px" }}>
                          {StudentUnderstanding.length !== 0
                            ? StudentUnderstanding[0].understanding
                            : 0}
                        </span>
                      </button>
                      <br />
                      <br />
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedBackViewModal;
