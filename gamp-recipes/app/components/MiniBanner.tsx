import React from 'react';

export default function MiniBanner() {
	return (
		<section
			className='hidden bg-slate-500 text-white font-extrabold xl:w-screen xl:h-8 xl:flex xl:justify-center xl:items-center'
		>
			<ul className='flex gap-12'>
				<li className='flex gap-2 items-center'>
					<img src='/icons/over.svg' className='w-4 invert' />
					<span>Over 500+ recipes</span>
				</li>
				<li className='flex gap-2 items-center'>
					<img src='/icons/favorites-line.svg' className='w-4 invert' />
					<span>Manage your favorites</span>
				</li>
				<li className='flex gap-2 items-center'>
					<img src='/icons/share.svg' className='w-4 invert' />
					<span>Share with your friends and family</span>
				</li>
				<li className='flex gap-2 items-center'>
					<img src='/icons/star.svg' className='w-4 invert' />
					<span>Rate and comment</span>
				</li>
			</ul>
		</section>
	);
}