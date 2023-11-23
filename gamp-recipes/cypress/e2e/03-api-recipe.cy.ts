import * as mock from '../mocks/recipeapi.mock';

describe('Tests for the api/recipe route - CRUD Recipe', () => {
  
	it('LIST - GET Recipe - checks the status code and the body of the response', () => {
		cy.request({
			url:'/api/recipe',
			method:'GET'
		})
			.then((response) => {
				expect(response.status).to.equals(200);
				expect(response.body.some(
					(each: { recipe_name: string; }) => each.recipe_name === mock.responseRecipe0.recipe_name))
					.to.equals(true);
			});
	});
  
	// it('ON_SUCCESS - POST Recipe - verify persistent data after post recipe', () => {
	// 	cy.visit('/auth/signup');

	// 	cy.get('input');
	// });
    
	it('AUTH - POST Recipe - with valid body but no auth cookie should return with Unauthorized 401', () => {
		cy.request({
			url: '/api/recipe',
			method: 'POST',
			body: mock.postRecipe,
			failOnStatusCode: false
		})
			.then((response) => {
				expect(response.status).to.equals(401);
				expect(response.body).to.equals('Invalid Token');
			});
	});

	it('REQ_BODY_VALIDATIONS - 00 - POST Recipe - with empty body should return with Bad Request 400', () => {
		cy.request({
			url: '/api/recipe',
			method: 'POST',
			body: {},
			failOnStatusCode: false,
		})
			.then((response) => {
				expect(response.status).to.equals(400);
			});
	});

	it('REQ_BODY_VALIDATIONS - 01 - POST Recipe - fails on validation - recipe_name is not a string', () => {
		cy.request({
			url: '/api/recipe',
			method: 'POST',
			body: mock.invalidName,
			failOnStatusCode: false
		})
			.then((response) => {
				expect(response.status).to.equals(400);
				expect(response.body).to.deep.equals({ message: 'O campo "recipe_name" deve ser uma string.' });
			});
	});

	it('REQ_BODY_VALIDATIONS - 02 - POST Recipe - fails on validation - recipe_type is not a number', () => {
		cy.request({
			url: '/api/recipe',
			method: 'POST',
			body: mock.invalidType,
			failOnStatusCode: false
		})
			.then((response) => {
				expect(response.status).to.equals(400);
				expect(response.body).to.deep.equals({ message: 'O campo "recipe_type" deve ser um número.' });
			});
	});

	it('REQ_BODY_VALIDATIONS - 03 -  POST Recipe - fails on validation - ingredients is not a Array', () => {
		cy.request({
			url: '/api/recipe',
			method: 'POST',
			body: mock.invalidIngredients,
			failOnStatusCode: false
		})
			.then((response) => {
				expect(response.status).to.equals(400);
				expect(response.body).to.deep.equals({ message: 'O campo "ingredients" deve ser uma lista de objetos.' });
			});
	});
  
	it('REQ_BODY_VALIDATIONS - 04 - POST Recipe - fails on validation - category is not a number', () => {
		cy.request({
			url: '/api/recipe',
			method: 'POST',
			body: mock.invalidCategory,
			failOnStatusCode: false
		})
			.then((response) => {
				expect(response.status).to.equals(400);
				expect(response.body).to.deep.equals({ message: 'O campo "category" deve ser um número.' });
			});
	});

	it('REQ_BODY_VALIDATIONS - 05 - POST Recipe - fails on validation - instructions length is greater than 3000', () => {
		cy.request({
			url: '/api/recipe',
			method: 'POST',
			body: mock.invalidInstructions,
			failOnStatusCode: false
		})
			.then((response) => {
				expect(response.status).to.equals(400);
				expect(response.body).to.deep.equals({ message: 'O campo "instructions" deve ser uma string com até 3000 caracteres.' });
			});
	});
});