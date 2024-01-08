function multiplyString(string: string, number: number) {
	let newStr = string;
	for(let i= 0; i < number; i += 1) {
		newStr += string;
	}
	return newStr;
}


export const responseRecipe0 = {
	'id': 1,
	'recipe_name': 'A1',
	'instructions': 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
	'image': 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
	'tags': '',
	'category': 2,
	'video_source': null,
	'area': null,
	'alcoholic': 'Alcoholic',
	'recipe_type_id': 1,
	'created_at': '2023-11-22T18:47:18.520Z',
	'updated_at': '2023-11-22T18:47:18.520Z',
	'category_name': {
		'id': 2,
		'name': 'cocktail'
	},
	'recipe_type': {
		'id': 1,
		'name': 'drink'
	},
	'Ingredients_Recipes': [
		{
			'ing_amount': '1 3/4 shot ',
			'ingredient': {
				'ingredients_name': 'gin'
			}
		},
		{
			'ing_amount': '1 Shot ',
			'ingredient': {
				'ingredients_name': 'grand marnier'
			}
		},
		{
			'ing_amount': '1/4 Shot',
			'ingredient': {
				'ingredients_name': 'lemon juice'
			}
		},
		{
			'ing_amount': '1/8 Shot',
			'ingredient': {
				'ingredients_name': 'grenadine'
			}
		}
	]
};

export const postRecipe = { 
	recipe_type: 1,
	recipe_name: 'squealguer',
	instructions: 'Fry the sql',
	image: 'imageloremipsum.com/href/prime',
	tags: 'meat, fry, fast',
	category: 1,
	ingredients: [
		{   ingredient_name: 'sql', pk: null   },
		{   ingredient_name: 'query', pk: null   },
		{   ingredient_name: 'garlic', pk: null   }
	],
	amount: [
		'1oz', 'pinch', null,
	] 
};

export const invalidName = {
	...postRecipe,
	recipe_name: true
};

export const invalidType = {
	...postRecipe,
	recipe_type: '12',
};

export const invalidIngredients = {
	...postRecipe,
	ingredients: {}
};

export const invalidCategory = {
	...postRecipe,
	category: 'a'
};

export const invalidInstructions = {
	...postRecipe,
	instructions: multiplyString('aaa', 1000)
};