import Image from '@/node_modules/next/image';
import React from 'react';

export default function Footer() {
	const siteMap1 = ['About us', 'Advertise', 'Careers', 'Contact'];
	const siteMap2 = ['Terms of Service', 'Cookie policy', 'Privacy policy'];
	const externalLinks = ['Facebook', 'Instagram', 'YouTube', 'Pinterest', 'Twitter'];
	const quickLinks = ['Meals', 'Drinks', 'Under 10\'', 'Mystery Recipe' ];

	return (
		<footer className='hidden xl:grid grid-cols-3 gap-6 py-12 px-80 w-full mx-auto bg-yellow text-black text-center items-center'>
			<section
				className='col-span-3 flex flex-col text-center'
			>
				<Image
					src='/images/logo-black.png'
					width={ 155 }
					height={ 155 }
					className='mx-auto'
					alt='Gamp logo in black lines only'
				/>
				<div
					className='mx-auto flex flex-row flex-wrap'
				>
					{ externalLinks.map((link, index) => (
						<>
							<Image
								key={ index }
								src={ `/icons/${link.toLowerCase()}.png` }
								width={ 30 }
								height={ 30 }
								alt='Social media icon'
								className='mx-2'
							/>
						</>
					)) }
				</div>
				<form
					className='mt-6'
				>
					<label
						className='font-semibold'
						htmlFor='newsletter-register'
					>
						Sign our weekly newsletter!
					</label>
					<fieldset
						className='mt-2'
					>
						<input
							type='text'
							name='newsletter-register'
							id='newsletter-register'
							className='rounded-l-xl bg-gray-200 py-1 px-3 text-sm'
							placeholder='Enter your best e-mail'
						/>
						<button
							className='bg-black py-1 px-2 rounded-r-xl text-white text-sm font-bold'
						>
							Register
						</button>
					</fieldset>
				</form>
			</section>

			<section
				// Coluna da esquerda do grid, mostrando o logo e descrição da aplicação
				id='footer-left-col'
				className='my-auto'
			>
				{ quickLinks.map((link, index) => (
					<p
						key={ index }
						className='font-semibold underline text-md my-2'
					>
						{ link }
					</p>
				)) }	
			</section>
			<section
				// Coluna do centro, mostrando mapa do site com links de acesso rápido
				id='footer-center-col'
				className='flex-col my-auto'
			>
				{ siteMap1.map((navItem, index) => (
					<p className='text-sm my-2' key={index}>{navItem}</p>
				)) }
			</section>
			<section
				// Coluna da direita, com formulário para newsletter e redes sociais
				id="footer-right-col"
			>
				{ siteMap2.map((navItem, index) => (
					<p className='text-sm my-2' key={index}>{navItem}</p>
				)) }
			</section>
		</footer>
		
	);
}
