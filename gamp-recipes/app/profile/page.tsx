
import React from 'react';
import ProfileCard from './ProfileCard';
import { getUser } from '../lib/userAPI';


export default async function ProfilePage() {

	const user = await getUser();
	console.log(user);
	

	if(!user) {
		return <div>404</div>;
	}

	return (
		<div>
			<ProfileCard 
				id={user.id}
				username={user.username}
				Favorite_Recipes={user.Favorite_Recipes}
				Finished_Recipes={user.Finished_Recipes}
				email={user.email}
				created_at={user.created_at}
				nationality={user.nationality}

			/>
		</div>
	);
}