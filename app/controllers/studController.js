const Question = require("../models/question");
const ObjectId = require("mongodb").ObjectId;

const studController = {};

studController.list = (request, response) => {
  const id = request.params.id;
  Question.find()
    .populate("student")
    .then((questions) => {
      const sortedQuestions = questions.sort((a, b) => {
        return b.rating.length - a.rating.length;
      });
      const myQuestions = sortedQuestions.filter((ele) => {
        return ele.student._id.toString() === id;
      });
      const friendsQuestions = sortedQuestions.filter((ele) => {
        return ele.student._id.toString() !== id;
      });
      response.json([
        {
          myQuestions,
          friendsQuestions,
        },
      ]);
    })
    .catch((error) => {
      response.json(error);
    });
};

studController.listStuAllQuestions = (request, response) => {
  const id = request.params.id;
  Question.find({ student: id })
    .populate("student")
    .then((questions) => {
      response.json(questions);
    })
    .catch((error) => {
      response.json(error);
    });
};

studController.listStuRatedQuestions = (request, response) => {
  const id = request.params.id;
  Question.find({ "rating.studentId": id })
    .then((questions) => {
      const result = questions.filter((ele) => {
        return ele.answerType.answered === true;
      });
      response.json(result);
    })
    .catch((error) => {
      response.json(error);
    });
};

studController.create = (request, response) => {
  const body = request.body;
  const question = new Question(body);
  question.student = request.tokenData._id;
  question
    .save()
    .then((questions) => {
      response.json(questions);
    })
    .catch((error) => {
      response.json(error);
    });
};

studController.createRating = (request, response) => {
  const qtnid = request.params.id;
  const body = request.body;
  Question.findOneAndUpdate(
    { _id: ObjectId(qtnid) },
    { $push: { rating: body } }
  )
    .then((questions) => {
      response.json(questions);
    })
    .catch((error) => {
      response.json(error);
    });
};

studController.createScaling = (request, response) => {
  const qtnId = request.params.id;
  const body = request.body;
  Question.findByIdAndUpdate(
    { _id: ObjectId(qtnId) },
    { $push: { responses: body } }
  )
    .then((questions) => {
      response.json(questions);
    })
    .catch((error) => {
      response.json(error);
    });
};

module.exports = studController;
