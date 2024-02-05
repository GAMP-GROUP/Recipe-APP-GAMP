'use client';

import React, { useState,useEffect } from 'react';

type UserProfile = {

        Favorite_Recipes: FavoriteRecipe[];
        Finished_Recipes: FinishedRecipe[];
        created_at: Date;
        email: string;
        id: number;
        nationality: string;
        username: string;

};

type FavoriteRecipe = {
    recipe_id: number;
    fav: boolean;
};

type FinishedRecipe = {
    recipe_id: number;

};
	
export default function ProfileCard() {

	const [userData, setUserData] = useState<UserProfile>();


	function fetchUserData(){
		fetch('http://localhost:3000/api/author', { method: 'GET',  })
			.then((res) => res.json())
			.then((res) => {
				setUserData(res);
			})
			.catch((err) => console.error(err));
	}

	useEffect(() => {
		fetchUserData();
	}, []);


	return (
		<main className="w-full h-full pt-8 flex-row bg-gradient-to-br from-cyan-400 via-violet-400 to-pink-500">
			{userData && 
			<h3 className='text-center mx-auto font-semibold text-xl text-white'>{userData.username}</h3>
			}
			<section
				className='w-11/12 h-[50vh] mt-32 bg-white mx-auto rounded-t-[56px]'>
				<picture>
					<img src="/images/avatar.png" alt="User avatar"
						className='w-48 absolute z-[50] left-1/2 -translate-x-1/2 -translate-y-28 rounded-full shadow-xl'
					/>
				</picture>
				<section className='flex-row justify-evenly pt-24 pb-4 text-center'>
					<h1 className='text-center mx-auto font-bold text-2xl'>{}</h1>
					<p className='text-sm'>{}</p>
					{/* <p className='text-sm'>{created_since(user as UserProfile)}</p> */}
			
					<section className='flex justify-evenly pt-8 items-center'>
						<div className='active-container'>
							<img src='/icons/favorites-active.png' alt='Fav icon' className='active-profile-icon ' />
							{/* <span className='font-bold text-lg ml-2 text-pink-500'>{.length}</span> */}
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
