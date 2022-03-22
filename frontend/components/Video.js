import classes from '../styles/pages/EnvironmentCheck.module.css'
import { useRef, useEffect } from 'react'

const Video = ({ width }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: width } })
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
    <video className={classes.video} ref={videoRef}/>
  )
}

export default Video
