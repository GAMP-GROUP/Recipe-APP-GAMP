'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SelectList(props: {
    options: string[],
    label: string,
    writeState: (writable: string, type: string) => void,
}) {
	const { options, label, writeState } = props;
	const selectLabel = `select-${label}`;
	const optList = options.map((e) => [e, false]);
	const [toggle, setToggle] = useState(Object.fromEntries(optList));
	function handleActive(
		e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
		label: string,
	) {
		const writable = (e.target as HTMLButtonElement).value;
		const ref = {...toggle };
		ref[writable] = !ref[writable];
		setToggle(ref);
		console.log(ref);
		writeState(writable, label);
	}

	return (
		<div>
			<label htmlFor={selectLabel}>Choose a {label}: </label>
			<section  
				id={selectLabel}
			>
				{options.map((each, index) => {
					return (
						<motion.button
							key={index + index}
							animate={{
								backgroundColor: toggle[each]
									? 'rgb(122, 222, 149)'
									: 'rgb(242,230,53)',
							}}
							className='text-lg font-bold px-5 py-1 mr-2 mt-4 text-black rounded-2xl'
							onClick={e => handleActive(e, label)}
							value={each}
							name={each}
						>  
							
							{each}
							
						</motion.button>
					);
				})}
			</section>
		</div>
	);
}