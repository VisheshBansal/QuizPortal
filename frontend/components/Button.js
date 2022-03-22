import classes from "../styles/components/Button.module.css";

const Button = ({ label, ...props }) => {
  return (
    <button {...props} className={classes.button}>
      {label}
    </button>
  );
}

export default Button