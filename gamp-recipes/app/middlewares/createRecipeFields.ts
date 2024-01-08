import { NextRequest } from 'next/server';

export async function validateRecipeMiddleware(req: NextRequest) {
	if (req.method === 'POST' || req.method === 'PUT') {
		const { recipe_name, instructions, ingredients, recipe_type_id, category } = await req.json();

		if (typeof recipe_name !== 'string') {
			return {
				message: 'O campo "recipe_name" deve ser uma string.',
				status: 400
			};
		}

		if (typeof instructions !== 'string' || instructions.length > 3000) {
			return {
				message: 'O campo "instructions" deve ser uma string com até 3000 caracteres.',
				status: 400
			};
		}

		if (!Array.isArray(ingredients)) {
			return {
				message: 'O campo "ingredients" deve ser uma lista de objetos.',
				status: 400
			};
		}

		if (typeof recipe_type_id !== 'number') {
			return {
				message: 'O campo "recipe_type" deve ser um número.',
				status: 400
			};
		}

		if (typeof category !== 'number') {
			return {
				message: 'O campo "category" deve ser um número.',
				status: 400
			};
		}
	}
	return { message: 'success' };
}
