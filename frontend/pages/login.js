import Button from './../components/Button'
import classes from '../styles/pages/Login.module.css'
import Image from "next/image";
import loginHero from './../assets/login_hero.png'

const Login = () => {

  const onLogin = (e) => {
    e.preventDefault()
    console.log("Login Clicked!")
  }

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.intro}>
          <h1>Login</h1>
          <p>Login to the quiz portal to answer quizzes</p>
        </div>
        <form>
          <input
            placeholder='Enter your Email ID'
            type='email'
          />
          <input
            placeholder='Enter your Password'
            type="password"
          />
          <Button label="Login" onClick={onLogin} />
        </form>
      </div>
      <div className={classes.right}>
        <Image src={loginHero} />
      </div>
    </div>
  )
}

export default Login
