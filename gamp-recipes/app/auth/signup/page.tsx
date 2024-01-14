'use client';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '@/contextAPI/context';
import { signUp } from '../../actions/users/signUp';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { validateLogin } from '@/app/lib/input.validations';
import SignInSignUpHeader from '@/app/components/SignInSignUpHeader';
import SignUpForm from '@/app/components/SignUpForm';
import SignInSignUpButtonSection from '@/app/components/SignInSignButtonSection';

export default function SignUp() {
	const { status } = useSession();
	const router = useRouter();
	const [buttonClicked, setButtonClicked] = useState(false);
	const { user: { email, password, nationality, username }	} = useContext(UserContext);

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
		<div className='flex flex-col h-full w-full bg-slate-100 items-center justify-center'>
			<section className='flex flex-col items-center gap-8 bg-white shadow-xl pt-6 pb-10 px-2 rounded-xl font-lato w-11/12'>
				<SignInSignUpHeader
					type='signup'
				/>
				<SignUpForm
					buttonClicked={ buttonClicked }
				/>
				<SignInSignUpButtonSection
					type='signup' handleClickBtn={ handleSignUpBtn }
				/>
			</section>
		</div>
	);
}
