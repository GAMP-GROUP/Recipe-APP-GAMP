'use client';

import { UserContext } from '@/contextAPI/context';
import { useContext } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	validateEmail,
	validateLogin,
	validatePassword,
	validateNationality,
	validateUsername,
} from '@/app/lib/input.validations';
import Image from 'next/image';
import React from 'react';
import { signUp } from '../actions/users/signUp';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignUpForm() {
	const [buttonClicked, setButtonClicked] = useState(false);
	const {status} = useSession();
	const router = useRouter();

	const {
		handleInputChange,
		user: { email, password, nationality, username },
		handleLoginCardDisplay,
	} = useContext(UserContext);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		console.log('login!');
	};

	const validations = (
		email: string,
		password: string,
		nationality: string,
		username: string
	) => {
		if (email && password && nationality && username) {
			const validation = validateLogin(email, password, username, nationality);
			return validation;
		}
	};

	const handleSignUpBtn = async () => {
		setButtonClicked(true);
		const validationsResult = validations(
			email,
			password,
			nationality,
			username
		);
		if (!validationsResult) return window.alert('Invalid input');

		const req = await signUp(email, password, username, nationality);

		if (!req) {
			return window.alert('User with that email already exists.');
		}
		return window.alert('Successfully created new user!');
	};

	useEffect(() => {
		if (status === 'authenticated') {
			router.refresh();
			router.push('/');
		}
	}, [status]);

	const content = (
		<div className='z-[99] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white shadow-2xl py-4 px-4 rounded-lg w-11/12 max-w-md'>
			<button
				type='submit'
				onClick={() => handleLoginCardDisplay()}
				className='bg-transparent p-0 border-2 border-black/18 rounded-full shadow self-end'
			>
				<Image src='/icons/close.png' width={10} height={10} alt='Close icon' />
			</button>
			<div className='  sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='text-center text-2xl font-bold text-gray-900 my-2'>
					Create account
				</h2>
			</div>
			<form onSubmit={handleSubmit}>
				<div className='bg-white text-slate-950  flex-row items-center justify-between p-5'>
					<label className='block text-sm font-bold mb-2' htmlFor='username'>
						Username:
					</label>
					<input
						type='text'
						name='username'
						value={username}
						onChange={handleInputChange}
						placeholder='username'
						className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>

					{buttonClicked && !validateUsername(username) && (
						<p className='text-rose-500 text-xs italic'>
							Your username must be at least 4 characters long
						</p>
					)}
					<br />
					<label className='block text-sm font-bold mb-2' htmlFor='Nationality'>
						Nationality:
					</label>
					<input
						type='text'
						name='nationality'
						value={nationality}
						onChange={handleInputChange}
						placeholder='BR'
						className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
					{buttonClicked && !validateNationality(nationality) && (
						<p className='text-rose-500 text-xs italic'>
							Your nationality must be 2 characters long
						</p>
					)}
					<label className='block text-gray-700 text-sm font-bold mb-2 mt-1'>
						Email:
					</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleInputChange}
						id='helper-text'
						aria-describedby='helper-text-explanation'
						className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none focus:shadow-outline '
						placeholder='example@email.com'
					/>
					{buttonClicked && !validateEmail(email) && (
						<p className='text-rose-500 text-xs italic'>
							Your email must be in this format: example@example.com.
						</p>
					)}
					<br />
					<label className='block text-stone-800 text-sm font-bold mb-2 mt-1'>
						Password:
					</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleInputChange}
						placeholder='******'
						className='mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-stone-800  leading-tight focus:outline-none focus:shadow-outline'
					/>
					{buttonClicked && !validatePassword(password) && (
						<p className='text-rose-500 text-xs italic'>
							Your password must be 6 characters long.
						</p>
					)}
					<br />
					<div className='flex flex-row items-center justify-between py-3 '>
						<button
							type='submit'
							onClick={() => handleSignUpBtn()}
							className='w-80 bg-yellow hover:bg-gray-100 text-black text-md font-bold py-2 rounded-xl mx-auto shadow'
						>
							SIGN UP
						</button>
						<br />
						<p>Or sign in with:</p>
						<div className='flex flex-row items-center justify-between py-3 '>
							<button type='button' onClick={() => signIn('google')}>
								GOOGLE
							</button>
						</div>
					
						
					</div>
				</div>
			</form>
		</div>
	);

	return content;
}
