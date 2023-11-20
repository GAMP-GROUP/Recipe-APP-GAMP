import React from 'react';
import { detailedParams } from '@/types';


import InProgressCard from '@/app/components/InProgressCard';


export default async function InProgress({
	params: { detailed },
}: detailedParams) {

	const params = { detailed };

	return (
		<InProgressCard params={params} />
	);
}
