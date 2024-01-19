import React from 'react';
import { Poppins } from 'next/font/google';

type TSlideTitleProps = {
    text: string,
}

const poppinsFont = Poppins({
	weight: '700',
	subsets: ['latin'],
	display: 'auto'
});

export default function SlideTitle({ text }: TSlideTitleProps) {
	return (
		<h1 className={ `text-[2.6rem] ${ poppinsFont.className }` }>{ text }</h1>
	);
}
