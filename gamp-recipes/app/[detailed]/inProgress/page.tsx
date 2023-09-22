import { formatResponse } from '@/app/lib/formatResponse';
import { getMealById, getDrinkById } from '@/app/lib/externalAPI';
import React from 'react';
import { detailedParams } from '@/types';
import IngredientList from '@/app/components/IngredientLIst';

export default async function InProgress({
	params: { detailed },
}: detailedParams) {
	const [api, id] = detailed.split('-');

	if (api !== 'meal' && api !== 'drink') return <h1>Invalid route {api}</h1>;

	const fetchRecipe =
    api === 'meal' ? await getMealById(id) : await getDrinkById(id);
	const recipe = formatResponse(fetchRecipe, api);

	return (
		<div>
			<section className="text-center">
				<picture>
					<img className="w-full" src={recipe.thumb} alt="recipe image"></img>
				</picture>
				<h2>{recipe.title}</h2>
				<br />

				<p>{recipe.instructions}</p>
			</section>

			<section>
				<IngredientList ingredients={recipe.ingredients} />
			</section>
		</div>
	);
}
