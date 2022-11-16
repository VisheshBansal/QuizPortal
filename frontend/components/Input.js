import classes from "../styles/components/Input.module.css";

const Input = ({ label, ...props }) => {
  return (
    <input {...props} className={classes.input}>
      {label}
    </input>
  );
}

export default Input