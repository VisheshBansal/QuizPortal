import classes from '../styles/pages/Login.module.css'
import Button from './../components/Button'
import Image from "next/image";
import registerHero from './../assets/register_hero.jpg'
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()

  const onRegister = (e) => {
    e.preventDefault()
    console.log("Register Clicked!")
    router.push('/login')
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
          />
          <input
            placeholder='Enter your Phone Number'
            type='text'
          />
          <input
            placeholder='Enter your Email ID'
            type='email'
          />
          <input
            placeholder='Enter your Password'
            type="password"
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
