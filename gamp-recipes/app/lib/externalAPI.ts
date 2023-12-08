import { DrinkRes, MealRes } from '@/types';
import { DRINKS_NAME_URL, MEALS_NAME_URL, DETAILS_DRINKS, DETAILS_MEALS } from './endpoints';


export const getAllMeals = async (): Promise<MealRes[]> => {
	const meals = await fetch(MEALS_NAME_URL);
	const data = await meals.json();
	return data.meals;
};

export const getAllDrinks = async (): Promise<DrinkRes[]> => {
	const drinks = await fetch(DRINKS_NAME_URL);
	const data = await drinks.json();
	return data.drinks;
};

export const getDrinkById = async (id: string): Promise<DrinkRes> => {
	const drink = await fetch(DETAILS_DRINKS + id);
	const data = await drink.json();
	return data.drinks[0];
};

export const getMealById = async (id: string): Promise<DrinkRes> => {
	const drink = await fetch(DETAILS_MEALS + id);
	const data = await drink.json();
	return data.meals[0];
};
