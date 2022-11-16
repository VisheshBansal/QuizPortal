import classes from "../styles/components/QuizBox.module.css";

const QuizBox = ({ label, ...props }) => {
  return (
    <div {...props} className={classes.quizbox}>
      {label}
    </div>
  );
}

export default QuizBox