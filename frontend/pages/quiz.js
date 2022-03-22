import Button from './../components/Button'
import Video from './../components/Video'
import Timer from './../components/Timer'
import classes from '../styles/pages/Quiz.module.css'
import { useState } from 'react'

const Quiz = () => {

  const [selected, setSelected] = useState(-1)

  const quizId = "1"
  const quizLabel = "Internet & Web Programming"

  const options = [
    {
      label: "Java"
    },
    {
      label: "React"
    },
    {
      label: "Unity"
    },
    {
      label: "Chrome"
    },
  ]

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <h1>Quiz {quizId} | {quizLabel}</h1>
        <div className={classes.question}>
          Q: Which of the following is a language?
        </div>
        <div className={classes.options}>
          {options.map((option, idx) => (
            <div
              className={[classes.option, idx === selected && classes.selected].join(" ")}
              onClick={() => setSelected(idx)}
            >
              {idx+1}. {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.right}>
        <Video width={300} />
        <Timer />
        <Button label="Finish Test" onClick={() => console.log('Quiz finished')} />
      </div>
    </div>
  )
}

export default Quiz

{/* <Button label="Proceed to Test" onClick={() => { console.log('go to test') }} /> */}