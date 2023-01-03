const Question = require("../models/question");
const ObjectId = require("mongodb").ObjectId;

const adminController = {};

adminController.list = (request, response) => {
  Question.find()
    .populate("student")
    .then((questions) => {
      const questionData = questions.sort((a, b) => {
        return b.rating.length - a.rating.length;
      });
      const answeredData = questionData.filter((ele) => {
        return ele.answerType.answered === true;
      });
      const notAnsweredData = questionData.filter((ele) => {
        return ele.answerType.answered === false;
      });
      response.json([
        {
          totalQuestions: questions.length,
          answeredData: answeredData,
          notAnsweredData: notAnsweredData,
        },
      ]);
    })
    .catch((error) => {
      response.json({ mainError: error.message });
    });
};

adminController.createAnswer = (request, response) => {
  const id = request.params.id;
  const body = request.body;
  Question.findOneAndUpdate(
    { _id: ObjectId(id), user: request.tokenData._id },
    { answerType: body }
  )
    .then((questions) => {
      response.json(questions);
    })
    .catch((error) => {
      response.json({ mainError: error.message });
    });
};

adminController.updateResponse = (request, response) => {
  const qtnId = request.params.id;
  const body = request.body;
  Question.findByIdAndUpdate(
    { _id: ObjectId(qtnId) },
    { $set: { responses: body } },
    { multi: true }
  )
    .then((questions) => {
      response.json(questions);
    })
    .catch((error) => {
      response.json({ mainError: error.message });
    });
};

adminController.listFeedbackResponse = (request, response) => {
  const id = request.params.id;
  Question.findById(id)
    .then((questions) => {
      response.json(questions);
    })
    .catch((error) => {
      response.json({ mainError: error.message });
    });
};

module.exports = adminController;
