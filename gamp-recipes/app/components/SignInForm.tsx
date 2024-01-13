'use client';
import React from 'react';
import { UserContext } from '@/contextAPI/context';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import SignInSignUpHeader from './SignInSignUpHeader';
import SignInSignUpButtonSection from './SignInSignButtonSection';

export default function SignInForm() {
	const router = useRouter();
	const { status } = useSession();
	const { handleInputChange, user: { email, password } } = useContext(UserContext);

	function handleSubmit(event: React.FormEvent) {
		// Função que previne a alteração da página
		return (
			event.preventDefault()
		);
	}

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

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/');
		}

	}, [status]);

	return (
		<section className='flex flex-col items-center gap-8 bg-white shadow-xl pt-6 pb-10 px-2 rounded-xl font-lato w-11/12'>
			<SignInSignUpHeader
				type='signin'
			/>

			<form onSubmit={ handleSubmit } className='flex flex-col gap-8'>
				<section className='bg-white text-slate-950 flex flex-col gap-8 items-center w-full'>
					<fieldset
						className='w-full'
					>
						<label className='text-gray-700 text-sm font-bold self-start'>
							Email:
						</label>
						<input
							type='email'
							name='email'
							value={email}
							onChange={handleInputChange}
							id='helper-text'
							aria-describedby='helper-text-explanation'
							className='shadow border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none'
							placeholder='example@email.com'
						/>
					</fieldset>
					<fieldset
						className='w-full'
					>
						<label className='text-gray-700 text-sm font-bold self-start'>
							Password:
						</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={handleInputChange}
							placeholder='******'
							className='shadow border rounded w-full py-2 px-3 text-stone-800 leading-tight focus:outline-none'
						/>
					</fieldset>
				</section>
			</form>

			<SignInSignUpButtonSection
				type='signin' handleClickBtn={ handleSignInBtn }
			/>
		</section>
	);
}
