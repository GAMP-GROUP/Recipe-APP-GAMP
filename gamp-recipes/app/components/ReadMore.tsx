'use client';
import React, { useState } from 'react';

export default function ReadMore({ text }: { text: string}) {
	const [readMore, setReadMore] = useState(true);
	const CHAR_LIMIT = 350;
	const showMore = 
	readMore 
		? <span
			className='text-red'
			onClick={() => setReadMore(!readMore)}
		>...expand</span> 
		: <p
			className='text-red'
			onClick={() => setReadMore(!readMore)}
		>collapse
		</p>;
	return (
		<p
			className='text-sm max-w-4xl text-left p-2 lg:-ml-1 text-gray-600 font-lato'
		>
			{readMore ? text.slice(0, CHAR_LIMIT) : text}

			{
				text.length <= CHAR_LIMIT ? '' : showMore
			}
		</p>
	);
}