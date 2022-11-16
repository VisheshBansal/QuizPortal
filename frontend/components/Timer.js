import { useState, useRef, useEffect } from 'react'
import classes from '../styles/components/Timer.module.css'

const Timer = ({ onFinish, totalTime }) => {
	const Ref = useRef(null);
	const [timer, setTimer] = useState(totalTime);

	// TODO: redirect on time up

	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 * 60 * 60) % 24);
		return {
			total, hours, minutes, seconds
		};
	}

	const startTimer = (e) => {
		let { total, hours, minutes, seconds }
			= getTimeRemaining(e);
		if (total >= 0) {
			setTimer(
				(hours > 9 ? hours : '0' + hours) + ':' +
				(minutes > 9 ? minutes : '0' + minutes) + ':'
				+ (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}


	const clearTimer = (e) => {
		// Adjust
		setTimer(totalTime);

		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = () => {
		let deadline = new Date();
		// Adjust

		deadline.setSeconds(deadline.getSeconds() + (parseInt(totalTime.split(':')[0]) * 60));
		return deadline;
	}

	useEffect(() => {
		console.log(parseInt(totalTime.split(':')[0]))
		clearTimer(getDeadTime());
	}, []);

	// const onClickReset = () => {
	// 	clearTimer(getDeadTime());
	// }

	return (
		<div className={classes.timer}>
			<h2>Time Left: {timer}</h2>
		</div>
	)
}

export default Timer;
