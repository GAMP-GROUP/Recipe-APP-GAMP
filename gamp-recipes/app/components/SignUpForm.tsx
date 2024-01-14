'use client';
import React, { useContext } from 'react';
import { UserContext } from '@/contextAPI/context';
import {
	validateEmail,
	validatePassword,
	validateNationality,
	validateUsername,
} from '@/app/lib/input.validations';

type TSignUpFormProps = {
	buttonClicked: boolean,
}

export default function SignUpForm({ buttonClicked }: TSignUpFormProps) {
	const { handleInputChange, user: { email, password, nationality, username }	} = useContext(UserContext);

	function handleSubmit (event: React.FormEvent) {
		return (
			event.preventDefault()
		);
	}

	return (
		<form onSubmit={ handleSubmit } className='flex flex-col gap-8'>
			<section className='bg-white text-slate-950 flex flex-col gap-4 items-center w-full'>
				<fieldset
					className='w-full'
				>
					<label className='text-sm font-bold' htmlFor='username'>
						Username:
					</label>
					<input
						type='text'
						name='username'
						value={username}
						onChange={handleInputChange}
						placeholder='username'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>

					{ buttonClicked && !validateUsername(username) && (
						<span className='text-rose-500 text-xs italic'>
							Your username must be at least 4 characters long
						</span>
					) }
				</fieldset>
	
				<fieldset
					className='w-full'
				>
					<label className='block text-sm font-bold' htmlFor='Nationality'>
						Nationality:
					</label>
					<input
						type='text'
						name='nationality'
						value={nationality}
						onChange={handleInputChange}
						placeholder='BR'
						className='nationality shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
					{ buttonClicked && !validateNationality(nationality) && (
						<span className='text-rose-500 text-xs italic'>
							Your nationality must be 2 characters long
						</span>
					) }
				</fieldset>

				<fieldset
					className='w-full'
				>
					<label className='block text-gray-700 text-sm font-bold '>
						Email:
					</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleInputChange}
						id='helper-text'
						aria-describedby='helper-text-explanation'
						className='email shadow appearance-none border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none focus:shadow-outline '
						placeholder='example@email.com'
					/>
					{ buttonClicked && !validateEmail(email) && (
						<span className='text-rose-500 text-xs italic'>
							Your email must be in this format: example@example.com.
						</span>
					) }
				</fieldset>
		
				<fieldset
					className='w-full'
				>
					<label className='block text-stone-800 text-sm font-bold'>
						Password:
					</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleInputChange}
						placeholder='******'
						className='password shadow appearance-none border rounded w-full py-2 px-3 text-stone-800  leading-tight focus:outline-none focus:shadow-outline'
					/>
					{ buttonClicked && !validatePassword(password) && (
						<p className='text-rose-500 text-xs italic'>
							Your password must be 6 characters long.
						</p>
					) }
				</fieldset>
			</section>				
		</form>
	);
}
