import classes from '../styles/pages/Login.module.css'

const Complete = () => {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.intro}>
          <h1>Finished!!</h1>
          <p>Congrats! You've completed your quiz!!</p>
        </div>
      </div>
    </div>
  )
}

export default Complete
