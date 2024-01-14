'use client';
import React, { useContext } from 'react';
import { signIn } from 'next-auth/react';
import { UserContext } from '@/contextAPI/context';
import SignInSignUpHeader from '@/app/components/SignInSignUpHeader';
import SignInForm from '@/app/components/SignInForm';
import SignInSignUpButtonSection from '@/app/components/SignInSignButtonSection';

function SignIn() {
	const { user: { email, password } } = useContext(UserContext);

	async function handleSignInBtn() {
		// Função responsável por verificar se os campos
		// de login estão preenchidos e faz o redirecionamento em caso de sucesso
		if (email === '' || password === '') {
			return window.alert('Please fill in all fields');
		}

		try {
			const signInResponse = await signIn('credentials', {
				redirect: false,
				email,
				password,
				callbackUrl: 'http://localhost:3000/',
			});

			if (!signInResponse?.url || signInResponse.ok !== true) {
				return window.alert('Invalid credentials');
			}

		} catch (err) {
			return window.alert(err);
		}

	}

	return (
		<div className='flex flex-col w-full h-full bg-slate-100 items-center justify-center'>
			<section className='flex flex-col items-center gap-8 bg-white shadow-xl pt-6 pb-10 px-2 rounded-xl font-lato w-11/12'>
				<SignInSignUpHeader
					type='signin'
				/>
				<SignInForm	/>
				<SignInSignUpButtonSection
					type='signin' handleClickBtn={ handleSignInBtn }
				/>
			</section>
		</div>
	
	);
}

export default SignIn;
