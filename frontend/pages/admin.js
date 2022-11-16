import { useEffect, useState } from "react";
import { getQuizzes, createQuiz } from "../services/quiz";
import { isLoggedIn } from "../services/auth";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Admin() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizTime, setQuizTime] = useState("");
  const [quizName, setQuizName] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getQuizzes().then((res) => {
      setQuizzes(res.data);
    });
  }, []);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizTimeChange = (e) => {
    setQuizTime(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, idx) => {
    const newOptions = [...options];
    newOptions[idx] = e.target.value;
    setOptions(newOptions);
  };

  const handleCorrectChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAddQuestion = () => {
    const newQuestions = [...quizQuestions];
    newQuestions.push({
      question,
      options,
      answer,
    });
    setQuizQuestions(newQuestions);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  const handleCreateQuiz = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    var resp = createQuiz(token, {
      time: quizTime,
      name: quizName,
      questions: quizQuestions,
    }).catch((err) => {
      console.log(err);
    });
    if (resp) {
      alert("Quiz created successfully!");
      window.location.reload();
    }
    else{
      alert("Quiz creation failed!");
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      <div>
        <h2>Create Quiz</h2>
        <div>
          <label htmlFor="quizTime">Quiz Time</label>
          <Input
            type="text"
            id="quizTime"
            value={quizTime}
            onChange={handleQuizTimeChange}
          />
        </div>
        <div>
          <label htmlFor="quizName">Quiz Name</label>
          <Input
            type="text"
            id="quizName"
            value={quizName}
            onChange={handleQuizNameChange}
          />
        </div>

        <div>
          <h3>Questions</h3>
          <div>
            <label htmlFor="question">Question</label>
            <Input
              type="text"
              id="question"
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div>
            <label htmlFor="option1">Option 1</label>
            <Input
              type="text"
              id="option1"
              value={options[0]}
              onChange={(e) => handleOptionChange(e, 0)}
            />
          </div>
          <div>
            <label htmlFor="option2">Option 2</label>
            <Input
              type="text"
              id="option2"
              value={options[1]}
              onChange={(e) => handleOptionChange(e, 1)}
            />
          </div>
          <div>
            <label htmlFor="option3">Option 3</label>
            <Input
              type="text"
              id="option3"
              value={options[2]}
              onChange={(e) => handleOptionChange(e, 2)}
            />
          </div>
          <div>
            <label htmlFor="option4">Option 4</label>
            <Input
              type="text"
              id="option4"
              value={options[3]}
              onChange={(e) => handleOptionChange(e, 3)}
            />
          </div>
          <div>
            <label htmlFor="correct">Correct Option</label>
            <Input
              type="text"
              id="correct"
              value={answer}
              onChange={handleCorrectChange}
            />
          </div>
          <Button label="Add Question" style={{"marginTop": 25}} onClick={handleAddQuestion}/>
        </div>
        <div className="create-quiz" style={{"marginTop": 50}}>
        <Button label="Create Quiz" onClick={handleCreateQuiz} style={{"width": "100%", "background": "#010b97d6"}}/>
        </div>
        
      </div>
      <div style={{"marginTop":"1em"}}>
        <h2>Quizzes</h2>
        {quizzes != undefined ? (
             quizzes.map((quiz) => (
              <li key={quiz.id}>{quiz.name}</li>
            ))): <p>No quizzes found</p>}

      </div>
    </div>
  );
}
