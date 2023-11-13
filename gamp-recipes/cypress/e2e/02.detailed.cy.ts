const ace = {
	recipe_type_id: 1,
	recipe_name: 'Ace',
	image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
	tags: '',
	area: null,
	alcoholic: 'Alcoholic',
	video_source: null,
	instructions: 'Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.',
	ingredients: [ 'Gin', 'Grenadine', 'Heavy cream', 'Milk', 'Egg white' ],
	amount: [ '2 shots ', '1/2 shot ', '1/2 shot ', '1/2 shot', '1/2 Fresh' ],
	category: 'Cocktail',
};

const pancakes = {
	recipe_type_id: 2,
	recipe_name: 'Pancakes',
	image: 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
	tags: 'Breakfast,Desert,Sweet,Fruity',
	area: 'American',
	alcoholic: null,
	video_source: 'https://www.youtube.com/watch?v=LWuuCndtJr0',
	instructions: 'Put the flour, eggs, milk, 1 tbsp oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. Set aside for 30 mins to rest if you have time, or start cooking straight away.\r\n' +
			'Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper. When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.\r\n' +
			'Serve with lemon wedges and sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.'
	,
	ingredients: [
		'Flour',
		'Eggs',
		'Milk',
		'Sunflower oil',
		'Sugar',
		'Raspberries',
		'Blueberries'
	],
	amount: [
		'100g ',
		'2 large',
		'300ml ',
		'1 tbls',
		'to serve',
		'to serve',
		'to serve'
	],
	category: 'Dessert'
};

describe('01 - Detailed Route', () => {
	it('01 - 01 - Drink Recipe - verify if it renders properly', () => {
		cy.visit('/search/Ace');

		cy.get('a:last').click();
		
		
		cy.contains(ace.recipe_name);
		cy.contains('Instructions');
		cy.contains(ace.instructions);
		cy.contains('Ingredients');
		cy.contains(`Type: ${ace.alcoholic}`);

		ace.ingredients.forEach((ing, index) => {
			cy.get('ul').children('li').contains(ing).
				next().contains(ace.amount[index] as string);
		});

		cy.get('button').last().contains('Start Recipe');
		cy.get('button').last().prev();
	});

	it('01 - 02 - Meal Recipe - verify if it renders properly', () => {
		cy.visit('/search/pancakes');

		cy.get('a:last').click();

		cy.contains(pancakes.recipe_name);
		cy.contains('Instructions');
		cy.contains('Ingredients');
		cy.get('iframe');
	
		pancakes.ingredients.forEach((ing, index) => {
			cy.get('ul').children('li').contains(ing).
				next().contains(pancakes.amount[index] as string);
		});

		cy.get('button').last().contains('Start Recipe');
		cy.get('button').last().prev();
	});
});