import Button from './../components/Button'
import classes from '../styles/pages/EnvironmentCheck.module.css'
import { useRef, useEffect } from 'react'

const EnvironmentCheck = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 500 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  return (
    <div className={classes.container}>
      <h1>Environment Check</h1>
      <video className={classes.video} ref={videoRef}/>
      <Button label="Proceed to Test" onClick={() => { console.log('go to test') }} />
    </div>
  )
}

export default EnvironmentCheck
