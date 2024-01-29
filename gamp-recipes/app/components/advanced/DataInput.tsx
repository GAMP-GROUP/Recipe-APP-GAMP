import React from 'react';
import { motion } from 'framer-motion';

export default function DataInput(props: {
	dataType: string,
    dataList: string[],
    checkIng: (ingredient: string) => void,
}) {
	const { dataList, dataType, checkIng } = props;
    
	return (
		<motion.div
			initial={{
				y: '10%',
				opacity: 0,
			}}
			animate={{
				y: '0%',
				opacity: 100,
				scale: 1,
			}}
			transition={{
				duration: 0.1,
			}}
		>
			<label htmlFor="select-ingredients">Ingredient</label>
			<input list={dataType} id={`select-${dataType}`} onBlur={e => checkIng(e.target.value)} />
			<datalist id={dataType}>
				{dataList.map((each, index) => {
					return (
						<option
							value={each}
							key={each + index}
						/>
					);
				})}
			</datalist>
		</motion.div>
	);
}