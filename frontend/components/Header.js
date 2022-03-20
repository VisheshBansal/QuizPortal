import Link from 'next/link';
import classes from "../styles/components/Header.module.css";


const Header = () => {
  return (
    <header className={classes.container}>
      <div className={classes.innerContainer}>
        <Link href="/">
          <div className={classes.logo}>
            <h3>QuizPortal</h3>
            {/* <Logo /> */}
          </div>
        </Link>
        <div className={classes.right}>
          <div className={classes.text}></div>
          <div className={classes.photo}></div>
        </div>
      </div>
    </header>
  );
}

export default Header