import Image from "next/image";
import classes from '../../styles/pages/Login.module.css'
import Trophy from '../../assets/trophy.png'
import { useState, useEffect } from 'react'
import Button from "../../components/Button";
import { useRouter } from "next/router";


const Complete = () => {
  const router = useRouter()
  // get score from local storage react way
  const [score, setScore] = useState(0)
  useEffect(() => {
    const score = localStorage.getItem('score')
    setScore(score)
  }, [])
  // call the score in <p> below
  return (
    <div className={classes.container}>
      <div className={classes.left}>
      <Image src={Trophy} />
        <div className={classes.intro}>
          <h1>Finished!!</h1>
          <p>Congrats! You've completed your quiz!!</p>
          <p>Score: {score}</p>
        </div>
        <Button label="Go to Home" onClick={() => router.push('/')}/>
      </div>
    </div>
  )
}

export default Complete
