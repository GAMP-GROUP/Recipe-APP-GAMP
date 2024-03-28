import React from 'react';
import Link from 'next/link';

export default function WeeklyRecipe() {
	return (
		<Link href='/29' className='xl:hidden'>
			<div
				className='w-96 bg-black rounded-3xl overflow-hidden relative'
			>
				<img
					src='/images/shawarma.jpg'
					alt=''
					className='w-full h-full object-cover'
					style={{ filter: 'brightness(100%) contrast(120%)' }}
				/>
				<div
					className='absolute inset-0'
					style={{
						background: 'linear-gradient(rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 30%), linear-gradient(rgba(0,0,0,0) 70%, rgba(0,0,0,0.8) 100%)',
					}}
				/>
				<p className='text-black bg-yellow rounded-xl px-2 py-1 absolute bottom-20 left-4 font-bold'>This week&apos;s top #1</p>
				<h1 className='text-white absolute bottom-8 left-4 text-4xl'>
                    Shawarma
				</h1>
			</div>
		</Link>
	);
}
