'use client';

import React from 'react';

import { useBehaviorContext } from '@/contextAPI/context/behavior.context';

import ShareButton from './ShareButton';
import { ShareModal } from './ShareModal';

export default function ShareToSocialCard({ url, img, id }: { url: string, img: string, id: string }) {
	const { share } = useBehaviorContext();

	return (
		<div>
			{share === false ? (
				<ShareButton id={id} />
			) : (
				<ShareModal
					url={url}
					img={img}
					id={id}
				/>
			)}
		</div>
	);
}