import Link from 'next/link';
import classes from "../styles/components/Header.module.css";
import { useRouter } from 'next/router'
import { isLoggedIn, logout } from '../services/auth';

const Header = () => {
  const router = useRouter()

  const onLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className={classes.container}>
      <div className={classes.innerContainer}>
        <Link href="/">
          <div className={classes.logo}>
            <h3>Quizy</h3>
          </div>
        </Link>
        <div className={classes.right}>
          {
            isLoggedIn()
            ?
              <div className={classes.text} onClick={() => onLogout()}>Logout</div>
            : (<>
                <div className={classes.text} onClick={() => router.push('/login')}>Login</div>
                <div className={classes.photo} onClick={() => router.push('/register')}>Register</div>
              </>)
          }
        </div>
      </div>
    </header>
  );
}

export default Header