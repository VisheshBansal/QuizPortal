import Button from './../components/Button'
import Video from './../components/Video'
import classes from '../styles/pages/EnvironmentCheck.module.css'
import { useRouter } from 'next/router'

const EnvironmentCheck = () => {
  const router = useRouter()

  return (
    <div className={classes.container}>
      <h1>Environment Check</h1>
      <Video width={500}/>
      <Button label="Proceed to Test" onClick={() => router.push('/quizzes')} />
    </div>
  )
}

export default EnvironmentCheck
