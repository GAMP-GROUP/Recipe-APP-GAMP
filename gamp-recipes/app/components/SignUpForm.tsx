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

	return (
		<section className='flex flex-col items-center gap-8 bg-white shadow-xl pt-6 pb-10 px-2 rounded-xl font-lato w-11/12'>
			<section className='flex flex-col items-center'>
				<img src='/images/logo-black.png' alt='logo icon' className='w-32' />
				<h2 className='text-center text-2xl font-bold text-gray-900 my-2'>
					Create Your Account
				</h2>

				<p className="text-center text-sm text-gray-500">Already registered?
					<a href="/auth/signin"
						className=" mt-2 font-semibold text-gray-700 focus:text-gray-800 focus:outline-none">
						{' '}Login here.
					</a>
				</p>
			</section>

			<form onSubmit={handleSubmit} className='flex flex-col gap-8'>
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
				
				<section
					className='flex flex-col items-center gap-2'
				>
					<button
						type='button'
						onClick={ () => handleSignUpBtn() }
						className={
							`w-80 bg-yellow border border-gray-300 rounded-lg shadow-md py-2
							text-sm font-bold text-gray-700 hover:bg-gray-200
							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`
						}>
						SIGN UP
					</button>

					<section className='flex items-center h-10 w-11/12'>
						<div className='h-[0.05rem] w-4/6 bg-gray-300' />
						<p className='leading-none px-4 text-xs text-gray-600 tracking-wide font-medium'>
							Or
						</p>
						<div className='h-[0.05rem] w-4/6 bg-gray-300' />
					</section>

					<GoogleSignInButton />
				</section>
			</form>
		</section>
	);
}
