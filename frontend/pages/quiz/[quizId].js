import Button from "../../components/Button";
import Video from "../../components/Video";
import Timer from "../../components/Timer";
import classes from "../../styles/pages/Quiz.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getQuiz, submitQuiz } from "../../services/quiz";

const Quiz = () => {
  const router = useRouter();
  const { quizId } = router.query;

  const [selected, setSelected] = useState(-1);
  const [score, setScore] = useState(0);
  const [curr, setCurr] = useState(0);

  const [quizLabel, setQuizLabel] = useState("");

  const [questions, setQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState("");

  useEffect(() => {

    if (!router.isReady) {
      getQuiz("63728b340f7182c334ae2595", localStorage.getItem("token")).then((res) => {
        setQuestions(res.questions);


        setTotalTime(res.time);
      });
    } else {
      getQuiz(quizId, localStorage.getItem("token")).then((res) => {
        setQuestions(res.questions);
        setQuizLabel(res.name);
        setTotalTime(res.time);
      });
    }
  }, [quizId, router.pathname]);

  const handleNext = () => {
    if (selected === -1) {
      alert("No option selected!");
      return;
    }
    setSelected(-1);
    questions[curr].answer = selected.toString();
    if (curr === questions.length - 1) {

      submitQuiz(localStorage.getItem("token"), questions, quizId).then((res) => {
        console.log(res);
        setScore(res.score);
      });

      router.push(`/quiz/complete`);
    } else setCurr((curr) => curr + 1);
  };

  return (
    questions.length !== 0 && (
      <div className={classes.container}>
        <div className={classes.left}>
          <h1>
            Quiz | {quizLabel}
          </h1>
          <div className={classes.question}>Q: {questions[curr].question}</div>
          <div className={classes.options}>
            {questions[curr].options.map((option, idx) => (
              <div
                key={idx}
                className={[
                  classes.option,
                  idx === selected && classes.selected,
                ].join(" ")}
                onClick={() => setSelected(idx)}
              >
                {idx + 1}. {option}
              </div>))}
          </div>
        </div>
        <div className={classes.right}>
          <Video width={300} />
          {totalTime && <Timer onFinish={() => router.push("/complete")} totalTime={totalTime} />}
          <div className={classes.questionNumbers}>
            {questions.map((question, idx) => (
              <div
                key={idx}
                className={[
                  classes.questionNumber,
                  idx < curr && classes.finished,
                ].join(" ")}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <Button label="Next or Submit" onClick={handleNext} />
        </div>
      </div>
    )
  );
};

export default Quiz;

{
  /* <Button label="Proceed to Test" onClick={() => { console.log('go to test') }} /> */
}