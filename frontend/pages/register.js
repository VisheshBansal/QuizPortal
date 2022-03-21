import classes from '../styles/pages/Login.module.css'
import Image from "next/image";
import registerHero from './../assets/register_hero.jpg'

const Register = () => {

  const onRegister = (e) => {
    e.preventDefault()
    console.log("Register Clicked!")
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
          <button onClick={onRegister}>
            Register
          </button>
        </form>
      </div>
      <div className={classes.right}>
        <Image src={registerHero} />
      </div>
    </div>
  )
}

export default Register
