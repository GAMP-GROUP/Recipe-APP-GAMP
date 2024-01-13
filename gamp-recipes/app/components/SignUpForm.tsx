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
import React from 'react';
import { signUp } from '../actions/users/signUp';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import GoogleSignInButton from './GoogleSignInButton';

export default function SignUpForm() {
	const [buttonClicked, setButtonClicked] = useState(false);
	const {status} = useSession();
	const router = useRouter();

	const {
		handleInputChange,
		user: { email, password, nationality, username },
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
		router.push('/auth/signin');
		console.log(status);
	};

	useEffect(() => {
		if (status === 'authenticated') {
			router.refresh();
			router.push('/');
		}
	}, [status]);

	const content = (
		<div className='flex flex-col bg-white shadow-lg py-6 px-4 rounded-lg font-lato w-11/12 max-w-md overflow-hidden'>
			<div className='  sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='text-center text-2xl font-bold text-gray-900 my-2'>
					Create Your Account
				</h2>
			</div>
			<form onSubmit={handleSubmit}>
				<div className=' text-slate-950 flex  flex-col  gap-2 '>
					<label className='block text-sm font-bold' htmlFor='username'>
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
					<br />
					<div className='flex flex-col items-center justify-between py-3 '>
						<button
							type='button'
							onClick={() => handleSignUpBtn()}
							className="signup w-80 mt-4 content-center flex items-center justify-center bg-yellow border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

							SIGN UP
						</button>
					</div>

					<div className="my-2 border-b text-center flex  items-cente0 justify-center ">
						<span className="w-2/6 border-b border-gray-300 border-solid"></span>
						<p
							className="leading-none px-4 self-center text-xs text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
							Or 
						</p>
						<span className="w-2/6 border-b border-gray-300 border-solid"></span>
					</div>

					<div className='flex flex-col items-center justify-between py-3 '>
						<GoogleSignInButton />
					</div>
				</div>
			</form>
		</div>
	);

	return content;
}
