import React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { startPostStudentScaleQuestion } from "../actions/studentAction";

const StudentScaling = (props) => {
  const { studentId, _id, responses, recallRating } = props;
  const dispatch = useDispatch();

  const result = responses.find((ele) => {
    return ele.studentId === studentId;
  });

  const handleRating = (qtnId, studentId, ratedVal) => {
    if (ratedVal) {
      const scalingData = {
        studentId: studentId,
        understanding: ratedVal,
      };
      dispatch(startPostStudentScaleQuestion(qtnId, scalingData, reDirect));
      function reDirect() {
        recallRating();
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating
          disabled={result && Object.keys(result).length !== 0 ? true : false}
          name="customized-10"
          max={10}
          value={
            result && Object.keys(result).length !== 0
              ? result.understanding
              : 5
          }
          onClick={(e) => {
            handleRating(_id, studentId, e.target.value);
          }}
        />
      </Box>
    </div>
  );
};

export default StudentScaling;
