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

describe('01 - Detailed Route', () => {
	it('01 - 01 - Drink Recipe', () => {

		cy.visit('/2');
		
		cy.contains('Ace');
		cy.contains('Instructions');
		cy.contains(ace.instructions);
		cy.contains('Ingredients');
		cy.contains('Type: Alcoholic');

		ace.ingredients.forEach((ing, index) => {
			cy.get('ul').children('li').contains(ing).
				next().contains(ace.amount[index] as string);
		});
	});
});