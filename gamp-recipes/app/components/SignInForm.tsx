'use client';
import React from 'react';
import { UserContext } from '@/contextAPI/context';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import GoogleSignInButton from './GoogleSignInButton';

export default function SignInForm() {
	const router = useRouter();
	const { status } = useSession();

	const { handleInputChange, user: { email, password } } = useContext(UserContext);

	function handleSubmit (event: React.FormEvent) {
		// Função que previne a alteração da página
		return (
			event.preventDefault()
		);
	}

	async function handleSignInBtn () {
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
		<div className='flex flex-col items-center gap-8 bg-white shadow-xl pt-6 pb-10 px-2 rounded-lg font-lato w-11/12'>
			<section className='flex flex-col items-center'>
				<img src='/images/logo-black.png' alt='logo icon' className='w-32' />
				<h2 className='text-center text-2xl font-bold text-gray-900 py-2'>
					Sign In
				</h2>

				<p className="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
					<a href="/auth/signup"
						className=" mt-2 font-semibold text-gray-700 focus:text-gray-800 focus:outline-none">
						{' '}Sign up.
					</a>
				</p>
			</section>
			
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

				<section
					className='flex flex-col items-center gap-2'
				>
					<button
						type='button'
						onClick={ () => handleSignInBtn() }
						className={
							`w-80 bg-yellow border border-gray-300 rounded-lg shadow-md py-2
							text-sm font-bold text-gray-700 hover:bg-gray-200
							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`
						}>
						SIGN IN
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
		</div>
	);
}
