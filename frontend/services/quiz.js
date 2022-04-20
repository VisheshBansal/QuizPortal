import { client } from './axiosClient'

const questions = [
  {
    question: "Which of the following is a language?",
    options: [
      "Java",
      "React",
      "Microsoft",
      "Chrome",
    ]
  },
  {
    question: "Which is a backend framework?",
    options: [
      "NextJS",
      "ReactJS",
      "NodeJS",
      "VueJS",
    ]
  },
  {
    question: "Which is a frontend library?",
    options: [
      "Deno",
      "React",
      "Node",
      "Go",
    ]
  },
  {
    question: "Which of the following is a NoSQL database?",
    options: [
      "MySQL",
      "Postgres",
      "MongoDB",
      "Oracle Database",
    ]
  },
  {
    question: "Which of the following is invalid?",
    options: [
      "<h5>",
      "<td>",
      "<embed>",
      "<h0>",
    ]
  },
]


export const getQuiz = async (token) => {
  const config = {
    headers: {
      'token': token
    }
  }

  try {
    const res = await client.get('/quiz/get', config)
    console.log(res.data)
    return res.data.questions
  } catch (err) {
    // console.log(err)
    // return err
    return questions
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
    const res = await client.post('/quiz/submit', data, config)
    return res.data.questions
  } catch (err) {
    console.log(err)
    return err
  }
}


