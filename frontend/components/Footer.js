import classes from "../styles/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.left}>
          <h3>IWP Lab Project 2022</h3>
        </div>
        <div className={classes.right}>
          <h3>Krish, Vishesh, Mansha, Pranav</h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer