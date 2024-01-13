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
import SignInSignUpHeader from './SignInSignUpHeader';
import SignInSignUpButtonSection from './SignInSignButtonSection';

export default function SignUpForm() {
	const [buttonClicked, setButtonClicked] = useState(false);
	const {status} = useSession();
	const router = useRouter();
	const { handleInputChange, user: { email, password, nationality, username }	} = useContext(UserContext);

	function handleSubmit (event: React.FormEvent) {
		return (
			event.preventDefault()
		);
	}

	function validateForm( email: string, password: string,	nationality: string, username: string) {
		if (email && password && nationality && username) {
			const validation = validateLogin(email, password, username, nationality);
			return validation;
		}
	}

	async function handleSignUpBtn() {
		setButtonClicked(true);
		const validationsResult = validateForm(
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
	}

	useEffect(() => {
		if (status === 'authenticated') {
			router.refresh();
			router.push('/');
		}
	}, [status]);

	return (
		<section className='flex flex-col items-center gap-8 bg-white shadow-xl pt-6 pb-10 px-2 rounded-xl font-lato w-11/12'>
			<SignInSignUpHeader
				type='signup'
			/>

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

			<SignInSignUpButtonSection
				type='signup' handleClickBtn={ handleSignUpBtn }
			/>
		</section>
	);
}
