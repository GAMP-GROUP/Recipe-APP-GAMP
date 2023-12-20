'use client';

import React, { useEffect, useRef } from 'react';
import ShareButton from './ShareButton';
import { ShareModal } from './ShareModal';

export default function ShareToSocialCard({ url, img, id, btnClass }: { url: string, img: string, id: string, btnClass?:string }) {

	const [shareModal, setShareModal] = React.useState(false);

	const modal = useRef<HTMLDivElement>(null);

	function handleClick(event: MouseEvent) {
		if (modal.current && !modal.current.contains(event.target as Node)) {

			setShareModal(false);
		}
	}

	useEffect(() => {
		if (shareModal === true) {
			document.addEventListener('click', handleClick);

		}

		return () => {
			document.removeEventListener('click', handleClick);
		};

	}, [shareModal]);

	return (
		<div className={ shareModal ? '' : 'flex justify-center items-center'}>
			{shareModal === false ? (
				<ShareButton shareModal={shareModal} setState={setShareModal} btnClass={btnClass} id={id} />
			) : (

				<ShareModal
					url={url}
					img={img}
					id={id}
					setState={setShareModal}
					refModal={modal}
				/>

			)}
		</div>
	);
}