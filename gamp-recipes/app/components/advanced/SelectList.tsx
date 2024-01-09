'use client';
import React from 'react';

export default function SelectList(props: {
    options: string[],
    label: string,
    writeState: React.Dispatch<React.SetStateAction<string>>,
}) {
	const { options, label, writeState } = props;
	const selectLabel = `select-${label}`;
	return (
		<div>
			<label htmlFor={selectLabel}>Choose a {label}: </label>
			<select 
				id={selectLabel}
				onChange={e => writeState(e.target.value)}
				defaultValue=''    
			>
				{options.map((each, index) => {
					return (
						<option 
							value={each}
							key={each+index}    
						>
							{each}
						</option>
					);
				})}
			</select>
		</div>
	);
}