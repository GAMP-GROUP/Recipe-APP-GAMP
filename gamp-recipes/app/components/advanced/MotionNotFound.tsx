import React from 'react';
import { motion } from 'framer-motion';

export default function MotionNotFound(props: {
    message: string,
    setAlert: (state: boolean) => void;
}) {
	const { setAlert, message } = props;
	return (
		<motion.div 
			role="alert"
			key='box'
			className="box bg-red-500 text-black font-bold rounded-t px-4 py-2"
			initial={{
				y: '50%',
				opacity: 0,
				scale: 0.1,
			}}
			animate={{
				y: '0%',
				opacity: 100,
				scale: 1,
			}}
			transition={{
				duration: 0.4,
			}}
			onClick={() => setAlert(false)}
		>
			<p>Click here to dismiss</p>
			<p>{message}</p>
		</motion.div>
	);
}