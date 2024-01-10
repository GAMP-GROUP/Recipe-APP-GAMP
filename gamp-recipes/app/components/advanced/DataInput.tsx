import React from 'react';
export default function DataInput(props: {
    dataList: string[],
    checkIng: (ingredient: string) => void,
}) {
	const { dataList, checkIng } = props;
    
	return (
		<div>
			<label htmlFor="select-ingredients">Ingredient</label>
			<input list="ingredients" id="select-ingredients" onBlur={e => checkIng(e.target.value)} />
			<datalist id="ingredients">
				{dataList.map((each, index) => {
					return (
						<option
							value={each}
							key={each + index}
						/>
					);
				})}
			</datalist>
		</div>
	);
}