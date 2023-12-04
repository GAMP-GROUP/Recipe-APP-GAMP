describe('02 - Home', () => {
	it('02 - 01 - it renders 25 recipes', () => {
		cy.visit('');

		cy.get('main').last().children().should('have.length', 25);
	});
});