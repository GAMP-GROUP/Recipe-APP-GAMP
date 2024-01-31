'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AreaList(props: {
    options: string[],
    label: string,
}) {
	const { options, label } = props;
	const selectLabel = `select-${label}`;
	const path = usePathname();

	return (
		<section
			className='flex flex-col items-center my-2'
		>
			<label htmlFor={selectLabel}>Or select a {label}: </label>
			<div  
				className='grid grid-cols-2'
				id={selectLabel}
			>
				{options.map((each, index) => {
					return (
						<Link 
							key={each + index + 'link'}
							href={`${path}/filter?area=${each}`}> 
							<button
								key={index + index}
								className='text-lg font-bold px-5 py-1 mr-2 mt-4 text-black rounded-2xl bg-yellow'
								value={each}
								name={each}
							>  
								{each}
							</button>
						</Link>
					);
				})}
			</div>
		</section>
	);
}