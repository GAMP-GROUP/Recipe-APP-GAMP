import { ChangeEvent } from 'react';

type UserProps = {
	nationality: string;
	username: string;
	email: string;
	password: string;
};

type ContextUser = {

	user: UserProps;
	handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type detailedParams = {
	params: { detailed: string };
};

type mealProps = {
	idMeal: string;
	strMealThumb: string;
	strMeal: string;
};

type ContextMeals = {
	allRecipes: MealRes[];
};

type externalAPI = drinkAPI | mealAPI;

type externalRes = MealRes[] | DrinkRes[];

type drinkAPI = {
	[drinks: string]: externalRes;
};

type ShareBtnProps = {
	id: string,
	ImgClass?: string
	btnClass?: string
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	shareModal: boolean;

}

type ingredientForm = {
	ingredient_name: string,
	pk: number,
}

type amountNullable = string | null

type recipePost = {
	recipe_name: string,
	instructions: string,
	recipe_type_id: number,
	category: number,
	image: string,
	tags: string,
	amount: amountNullable[],
	ingredients: ingredientForm[],
}


type ButtonProps = {
	id?: string,
	ImgClass?: string
	btnClass?: string
}

type mealAPI = {
	[meals: string]: externalRes;
};
type MealRes = {
	'idMeal': string,
	'strMeal': string,
	'strDrinkAlternate': string | null,
	'strCategory': string,
	'strArea': string,
	'strInstructions': string,
	'strMealThumb': string,
	'strTags': string,
	'strYoutube': string,
	'strSource': string | null,
	'strImageSource': string | null,
	'strCreativeCommonsConfirmed': string | null,
	'dateModified': string | null,
	[index: string]: string,
}

type DrinkRes = {
	idDrink: string;
	strDrink: string;
	strDrinkAlternate: null | string;
	strTags: string;
	strVideo: null | string;
	strCategory: string;
	strIBA: string;
	strAlcoholic: string;
	strGlass: string;
	strInstructions: string;
	strInstructionsES: null | string;
	strInstructionsDE: null | string;
	strInstructionsFR: null | string;
	strInstructionsIT: null | string;
	'strInstructionsZH-HANS': null | string;
	'strInstructionsZH-HANT': null | string;
	strDrinkThumb: string;
	strImageSource: string;
	strImageAttribution: string;
	strCreativeCommonsConfirmed: null | string;
	dateModified: null | string;
	[index: string]: string;
};

type NewRecipeRequest = {
	recipe_type_id: number;
	recipe_name: string;
	instructions: string;
	image: string;
	tags: string;
	category: number;
	ingredients: {
		ingredient_name: string;
	}[];
	amount: string[];
};

type RecipeData = {
  id: number;
  recipe_name: string;
  instructions: string;
  image: string;
  tags: string;
  category: number;
  category_name?: string;
  recipe_type_name?: string;
  video_source?: string | null;
  area?: string | null;
  alcoholic?: string | null;
  recipe_type_id: number;
  created_at: Date;
  updated_at: Date;
  ingredients: (RecipeIngredient | null)[]; // Allow null for each ingredient
  author?: string | null;
  amount?: string[];
};

type RecipeIngredient = {
  ingredient_name: string;
  ing_amount: string | null;
  ingredient?: {
	ingredients_name: string;
  };
};
type UpdateRecipeRequest = {
	id: number; // O ID da receita a ser atualizada
	recipe_name: tring; // Campos atualizáveis (adicione todos os campos que podem ser atualizados)
	instructions?: string;
	image?: string;
	tags?: string;
	category?: number;
	ingredients?: {
		ingredient_name: string;
		ing_amount?: string;
	}[];
	amount?: string[];
	recipe_type_id?: number;
}

type Request = NewRecipeRequest | NextRequest

type NewRecipeResponse = { message: string | RecipeData, TYPE: number };

