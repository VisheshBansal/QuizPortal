import classes from '../styles/pages/Login.module.css'
import Button from './../components/Button'
import Image from "next/image";
import registerHero from './../assets/register_hero.jpg'
import { signUp } from './../services/auth'
import { useRouter } from 'next/router'
import { useState } from 'react';

const Register = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onRegister = async (e) => {
    e.preventDefault()
    console.log("Register Clicked!")
    try {
      await signUp(name, email, password)
      router.push('/login')
    } catch (err) {
      alert(err.message)
      console.log(err)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.intro}>
          <h1>Register</h1>
          <p>Create your account to answer quizzes and top your class!</p>
        </div>
        <form>
        <input
            placeholder='Enter your Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button label="Register" onClick={onRegister} />
        </form>
      </div>
      <div className={classes.right}>
        <Image src={registerHero} />
      </div>
    </div>
  )
}

export default Register
