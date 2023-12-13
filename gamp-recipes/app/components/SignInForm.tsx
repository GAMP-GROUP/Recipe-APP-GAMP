'use client';
import { UserContext } from '@/contextAPI/context';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import React from 'react';

export default function SignInForm() {
	const router = useRouter();
	const { status } = useSession();

	const {
		handleInputChange,
		user: { email, password },
	} = useContext(UserContext);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		console.log('login!');
	};


	const handleSignInBtn = async () => {
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
			console.log(err);
		}
	};

	useEffect(() => {
		if (status === 'authenticated') {
			router.refresh();
			router.push('/');
		}

	}, [status]);

	const content = (
		<div className='flex flex-col bg-white shadow-lg py-6 px-4 rounded-lg w-11/12 max-w-md'>
			<div className='  sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='text-center text-2xl font-bold text-gray-900 my-2'>
					Sign In
				</h2>

				<p className="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
					<a href="/auth/signup"
						className=" mt-2 font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"> Sign
						up
					</a>.
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className='bg-white text-slate-950  flex-row items-center justify-between p-5'>
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
						className={ 
							'mb-4 shadow appearance-none border rounded w-full py-2 px-3 ' +
                   ' text-stone-800 leading-tight focus:outline-none focus:shadow-outline'
						}
						placeholder='example@email.com'
					/>
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
						className={
							'mb-4 shadow appearance-none border rounded w-full py-2 px-3 ' +
                     'text-stone-800 leading-tight focus:outline-none focus:shadow-outline'
						}
					/>
				</div>


				<div className='flex flex-col items-center justify-between py-3 '>
					<button
						type='button'
						onClick={() => handleSignInBtn()}
						className={
							'w-80 mt-4 content-center flex items-center justify-center ' +
                     'bg-yellow border border-gray-300 rounded-lg shadow-md px-6 py-2 ' +
                     'text-sm font-medium text-gray-800 hover:bg-gray-200 ' +
                     'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
						}>
						SIGN IN
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
					<button
						type='button'
						onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}
						className={
							'w-80 mt-4 content-center flex items-center justify-center ' +
                     'bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 ' +
                     'text-sm font-medium text-gray-800 hover:bg-gray-200 ' +
                     'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
						}
					>
						<svg className="h-6 w-6 mr-2 " xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
						<span>Continue with Google</span>
					</button>
				</div>
			</form>
		</div>

	);

	return content;
}
