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
			className="text-center my-2 flex flex-col items-center"
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
			<h4
				className='text-lg font-bold'
			>Click here to dismiss</h4>
			<p
				className='w-3/4 text-sm'
			>{message}</p>
		</motion.div>
	);
}