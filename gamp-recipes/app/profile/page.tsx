import prisma from '@/prisma/client';
import { detailedParams } from '@/types';
import React from 'react';


type UserProfile = {
	username: string
	created_at: Date
}

export default async function ProfilePage({ params: { detailed } }: detailedParams) {

	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(detailed) || 1
		}
	});
	

	console.log(user);

	function created_since(user: UserProfile){
		const timestampObj: Date = new Date(user.created_at);
		const formattedDate: string = timestampObj.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
		return `Since ${formattedDate}`;
	}

	// function changeActive(type: string, active: boolean): string {
	// 	if (type === 'container' && active) {
	// 		return 'flex w-20 justify-center items-center pb-3 border-solid border-b-pink-500 border-b-8';
	// 	} else {
	// 		return 'flex w-20 justify-center items-center pb-3 border-solid border-b-white border-b-8';
	// 	}
	// }


	return (
		<main className="w-full h-full pt-8 flex-row bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-500">
			<h3 className='text-center mx-auto font-semibold text-xl text-white'>{user?.username}</h3>
			<section
				className='w-11/12 h-[50vh] mt-32 bg-white mx-auto rounded-t-[56px]'>
				<picture>
					<img src="/images/avatar.png" alt="User avatar"
						className='w-48 absolute z-[50] left-1/2 -translate-x-1/2 -translate-y-28 rounded-full shadow-xl'
					/>
				</picture>
				<section className='flex-row justify-evenly pt-24 pb-4 text-center'>
					<h1 className='text-center mx-auto font-bold text-2xl'>{user?.email}</h1>
					<p className='text-sm'>{user?.nationality}</p>
					<p className='text-sm'>{created_since(user as UserProfile)}</p>
					<section className='flex justify-evenly pt-8 items-center'>
						<div className='active-container'>
							<img src='/icons/favorites-active.png' alt='Fav icon' className='active-profile-icon ' />
							<span className='font-bold text-lg ml-2 text-pink-500'>16</span>
						</div>
						<div className='inactive-container'>
							<img src='/icons/save.png' alt='Done recipes icon' className='inactive-profile-icon' />
							<span className='text-lg ml-2 opacity-40'>32</span>
						</div>
						<div className='inactive-container'>
							<img src='/icons/cooking.png' alt='In progress recipes icon' className='inactive-profile-icon' />
							<span className='text-lg ml-2 opacity-40'>1</span>
						</div>
					</section>
				</section>
			</section>
		</main>
	);
}