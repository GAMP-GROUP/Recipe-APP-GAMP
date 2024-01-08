import { ButtonProps } from '@/types';
import Link from 'next/link';
import React from 'react';

export function PreviousPageButton ({btnClass, ImgClass}: ButtonProps){

	return(
		<div className={btnClass || 'flex justify-center items-center'}>
			<Link href={'/'} replace>
				<img src="/images/seta-esquerda.png" alt="seta para esquerda" className={ImgClass || 'w-5 xl:hidden order-1 my-auto'} />
			</Link>
		</div>
		
	);
}