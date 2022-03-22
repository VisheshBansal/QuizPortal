import Button from './../components/Button'
import Video from './../components/Video'
import classes from '../styles/pages/EnvironmentCheck.module.css'

const EnvironmentCheck = () => {
  return (
    <div className={classes.container}>
      <h1>Environment Check</h1>
      <Video width={500}/>
      <Button label="Proceed to Test" onClick={() => { console.log('go to test') }} />
    </div>
  )
}

export default EnvironmentCheck
