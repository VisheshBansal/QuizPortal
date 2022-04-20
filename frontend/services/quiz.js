import { client } from './axiosClient'

export const getQuiz = async (token) => {
  const config = {
    headers: {
      'token': token
    }
  }

  try {
    const res = await client.get('/quiz/get', config)
    localStorage.setItem("token", res.data.body.token);
    return res.data.body.questions
  } catch (err) {
    console.log(err)
    return err
  }
}


export const submitQuestion = async (token, question, answer) => {
  const data = {
    questionID: question,
    answer: answer,
  }

  const config = {
    headers: {
      'token': token
    }
  }

  try {
    const res = await client.get('/quiz/get', data, config)
    localStorage.setItem("token", res.data.body.token);
    return res.data.body.questions
  } catch (err) {
    console.log(err)
    return err
  }
}


