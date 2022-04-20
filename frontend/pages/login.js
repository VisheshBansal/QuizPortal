import Button from './../components/Button'
import classes from '../styles/pages/Login.module.css'
import Image from "next/image";
import loginHero from './../assets/login_hero.png'
import { login } from './../services/auth'
import { useRouter } from 'next/router'
import { useState } from 'react';


const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e) => {
    e.preventDefault()
    console.log("Login Clicked!")
    try {
      await login(email, password)
      router.push('/')
    } catch (err) {
      alert(err.message)
      console.log(err)
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Enter your Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
