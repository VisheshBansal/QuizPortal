import classes from "../styles/pages/Quiz.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getQuizzes } from "../services/quiz";
import Link from "next/link";
import Button from "../components/Button";
import QuizBox from "../components/QuizBox";

const Quizzes = () => {
  const router = useRouter();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then((res) => {
      setQuizzes(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      <div className={classes.quizzes}>
      {quizzes != undefined ? (quizzes.map((quiz) => (
          <a href={`/quiz/${quiz.id}`}>
              <QuizBox id={quiz.id} className={classes.quizId} label= {quiz.name}/>
          </a>
        ))) : (
          <div><p>No Quizzes found! Ask your teacher to create a quiz!</p>
          <br></br>
          <Button label="Go to Home" onClick={() => router.push('/')} />          
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
