import React, { Fragment } from "react";

const StudentQtnsModal = (props) => {
  const { modalclosefun, studentModalData } = props;

  return (
    <div>
      <div className="overlay">
        <div className="modal">
          <header className="modal_header">
            <div>
              <h2 className="list">
                {studentModalData[0].student.userName}'s Questions List
              </h2>
            </div>
            <button onClick={modalclosefun} className="close_button">
              &times;
            </button>
          </header>

          <ol className="list">
            {studentModalData.map((ele, i) => {
              return (
                <Fragment key={ele._id}>
                  <li>{ele.body}</li>
                  <br />
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default StudentQtnsModal;
