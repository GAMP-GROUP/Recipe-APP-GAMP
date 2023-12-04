export const getRecipes = async () => {
	const recipes = fetch('http://localhost:3000/api/recipe/', {
		method: 'GET',

	}).then((res) => {
		return res.json();
	});
	return recipes;
};

export const getRecipeById = async (id: string) => {
	const recipe = fetch(`http://localhost:3000/api/recipe/${id}`, {
		method: 'GET',

	}).then((res) => {
		return res.json();
	});



	return recipe;
};