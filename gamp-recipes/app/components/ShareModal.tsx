'use client';

import React from 'react';

import { TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon, WhatsappShareButton, WhatsappIcon, FacebookIcon, FacebookShareButton } from 'next-share';
import { enqueueSnackbar } from 'notistack';

export function ShareModal({ url, img, refModal, setState }: {
	url: string,
	img: string, id: string,
	setState: React.Dispatch<React.SetStateAction<boolean>>,
	refModal: React.RefObject<HTMLDivElement>;
},) {

	const [inputText, setInputText] = React.useState(url);

	const copyTextToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const handleCopyClick = (event: { preventDefault: () => void; }) => {
		event.preventDefault();

		copyTextToClipboard(inputText);

		enqueueSnackbar('link copied to clipboard', {
			variant: 'success',
		});

		handleOpenModal();
	};

	const handleOpenModal = () => {
		setTimeout(() => {
			setState(false);
		}, 1500);
	};

	return (
		<div className='overlay h-full top-0 flex justify-center items-center xl:justify-center xl:items-center'>

			<div className=' flex items-center justify-center text-left h-fit w-max absolute font-lato xl:w-full xl:max-w-4xl xl:justify-center' ref={refModal} >
				
				<div className=' shadow-md bg-white	 w-full mx-4 p-3 rounded-xl md:w-1/2 xl:w-1/3'>

					<div
						className="flex justify-between items center border-b border-gray-200 py-3 "
					>

						<div className="flex items-center justify-center mb-0">

							<img src='/images/logo-black.png' alt='logo icon' className='w-20' />
						</div>


						<div
							className=" cursor-pointer hover:text-gray-300 font-sans w-6 h-7 flex items-center justify-center rounded-full last:h-2"
						>
							<button
								type='button'
								onClick={() => setState(false)}
							>
								<img src='/icons/close.png' alt='close icon' className='w-7' />

							</button>

						</div>

					</div >

					<div className="my-4">

						<p className="text-xl font-semibold text-gray-700">Share this via</p>

						<div className="flex justify-between gap-5 my-4" >

							<div
								onClick={handleOpenModal}
							>
								<TwitterShareButton url={url}>
									<TwitterIcon size={40} round />
								</TwitterShareButton>
							</div>

							<div
								onClick={handleOpenModal}
							>
								<FacebookShareButton url={url}>
									<FacebookIcon size={40} round />
								</FacebookShareButton>
							</div>

							<div
								onClick={handleOpenModal}
							>
								<PinterestShareButton url={url} media={img}>
									<PinterestIcon size={40} round />
								</PinterestShareButton>
							</div>

							<div
								onClick={handleOpenModal}
							>
								<WhatsappShareButton url={url}>
									<WhatsappIcon size={40} round />
								</WhatsappShareButton>
							</div>

						</div>

						<p className="text-xl font-semibold text-gray-700">Or copy link</p>

						<div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">

							<input
								onChange={(event) => setInputText(event.target.value)}
								className="w-full outline-none bg-transparent text-xl truncate font-semibold text-gray-700" type="text" placeholder="link" value={url} />


							<button
								onClick={handleCopyClick}
								className="">

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className="fill-gray-500 ml-2"
								>
									<path
										d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"
									></path>
									<path
										d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"
									></path>
								</svg>
							</button>

						</div>

					</div>

				</div>

			</div>

		</div>
	);

}

