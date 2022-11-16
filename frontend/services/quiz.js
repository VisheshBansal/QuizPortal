import { client } from "./axiosClient";

export const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer JWT ${token}`,
    },
  };

  try {
    const res = await client.get("/quiz", config);
    return res.data;
  } catch (err) {
    // console.log(err)
    // return err
    return questions;
  }
};

export const getQuiz = async (quizId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer JWT ${token}`,
    },
  };

  try {
    const res = await client.get(`/quiz/${quizId}`, config);
    return res.data;
  } catch (err) {
    console.log(err)
    // return err
    return { data: questions };
  }
};

export const submitQuiz = async (token, data, quizId) => {
  const config = {
    headers: {
      token: token,
    },
  };

  const quizData = {
    QuestionData: data.forEach((element) => {
      delete element._id;
    }),
  };


  try {
    const res = await client.post(`/quiz/attempt/${quizId}`, quizData, config);
    return res.data.questions;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createQuiz = async (token, quiz) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await client.post("/quiz/new",quiz, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
