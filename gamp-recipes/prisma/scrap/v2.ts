
export async function scrapper() {
	const dataD = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
	const dataM = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
	const { drinks } = await dataD.json();
	const { meals } = await dataM.json();

	const format = [...drinks, ...meals].map((recipe) => {
		const drink = recipe.idDrink ? true : false;
		const category = recipe.strCategory;
		const ingredients = [];
		const amount = [];
		const recipeData = {
			recipe_type_id : drink ? 1 : 2,
			recipe_name : recipe.strDrink || recipe.strMeal,
			image : recipe.strDrinkThumb || recipe.strMealThumb,
			tags : recipe.strTags || '',
			area : recipe.strArea || null,
			alcoholic : recipe.strAlcoholic || null,
			instructions: recipe.strInstructions,
		};
		for (let i = 1; i <= 20; i += 1) {
			const strIng = recipe['strIngredient' + i];
			const strMeas = recipe['strMeasure' + i];
			if(strIng !== null && strIng !== undefined && strIng !== '') {
				ingredients.push(strIng);
				amount.push(strMeas || null);
			}
		}
		return { recipeData, ingredients, amount, category};
	});

	return format;
}


export const scrapv2 = [
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'GG',
			image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
			tags: '',
			area: null,
			alcoholic: 'Optional alcohol',
			instructions: 'Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.'
		},
		ingredients: [ 'Galliano', 'Ginger ale', 'Ice' ],
		amount: [ '2 1/2 shots ', null, null ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'A1',
			image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.'
		},
		ingredients: [ 'Gin', 'Grand Marnier', 'Lemon Juice', 'Grenadine' ],
		amount: [ '1 3/4 shot ', '1 Shot ', '1/4 Shot', '1/8 Shot' ],
		category: 'Cocktail'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Ace',
			image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.'
		},
		ingredients: [ 'Gin', 'Grenadine', 'Heavy cream', 'Milk', 'Egg White' ],
		amount: [ '2 shots ', '1/2 shot ', '1/2 shot ', '1/2 shot', '1/2 Fresh' ],
		category: 'Cocktail'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: '747',
			image: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'pour kaluha, then Baileys, then Frangelico not chilled and not layered -- SERVE!!!'
		},
		ingredients: [ 'Kahlua', 'Baileys irish cream', 'Frangelico' ],
		amount: [ '1/3 part ', '1/3 part ', '1/3 part ' ],
		category: 'Shot'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Kir',
			image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
			tags: 'IBA,ContemporaryClassic',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Add the crème de cassis to the bottom of the glass, then top up with wine.'
		},
		ingredients: [ 'Creme de Cassis', 'Champagne' ],
		amount: [ '1 part ', '5 parts ' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'ABC',
			image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Layered in a shot glass.'
		},
		ingredients: [ 'Amaretto', 'Baileys irish cream', 'Cognac' ],
		amount: [ '1/3 ', '1/3 ', '1/3 ' ],
		category: 'Shot'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: '252',
			image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Add both ingredients to shot glass, shoot, and get drunk quick'
		},
		ingredients: [ '151 proof rum', 'Wild Turkey' ],
		amount: [ '1/2 shot Bacardi ', '1/2 shot ' ],
		category: 'Shot'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'AT&T',
			image: 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Pour Vodka and Gin over ice, add Tonic and Stir'
		},
		ingredients: [ 'Absolut Vodka', 'Gin', 'Tonic water' ],
		amount: [ '1 oz ', '1 oz ', '4 oz ' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Smut',
			image: 'https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Throw it all together and serve real cold.'
		},
		ingredients: [ 'Red wine', 'Peach schnapps', 'Pepsi Cola', 'Orange juice' ],
		amount: [ '1/3 part ', '1 shot ', '1/3 part ', '1/3 part ' ],
		category: 'Punch / Party Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'B-53',
			image: 'https://www.thecocktaildb.com/images/media/drink/rwqxrv1461866023.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Layer the Kahlua, Sambucca and Grand Marnier into a shot glas in that order. Better than B-52'
		},
		ingredients: [ 'Kahlua', 'Sambuca', 'Grand Marnier' ],
		amount: [ '1/3 shot ', '1/3 shot ', '1/3 shot ' ],
		category: 'Shot'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Adam',
			image: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
			tags: 'Alcoholic,Holiday',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.'
		},
		ingredients: [ 'Dark rum', 'Lemon juice', 'Grenadine' ],
		amount: [ '2 oz ', '1 oz ', '1 tsp ' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'ACID',
			image: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Poor in the 151 first followed by the 101 served with a Coke or Dr Pepper chaser.'
		},
		ingredients: [ '151 proof rum', 'Wild Turkey' ],
		amount: [ '1 oz Bacardi ', '1 oz ' ],
		category: 'Shot'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'H.D.',
			image: 'https://www.thecocktaildb.com/images/media/drink/upusyu1472667977.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Mix the whisky and Baileys Cream in a beer-glass (at least 50 cl). Fill the rest of the glass with coffee.'
		},
		ingredients: [ 'Whisky', 'Baileys irish cream', 'Coffee' ],
		amount: [ '4 cl ', '8 cl ', null ],
		category: 'Coffee / Tea'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'B-52',
			image: 'https://www.thecocktaildb.com/images/media/drink/5a3vg61504372070.jpg',
			tags: 'IBA,NewEra',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Layer ingredients into a shot glass. Serve with a stirrer.'
		},
		ingredients: [ 'Baileys irish cream', 'Grand Marnier', 'Kahlua' ],
		amount: [ '1/3 ', '1/3 ', '1/4 ' ],
		category: 'Shot'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Rose',
			image: 'https://www.thecocktaildb.com/images/media/drink/8kxbvq1504371462.jpg',
			tags: 'IBA,ContemporaryClassic',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Shake together in a cocktail shaker, then strain into chilled glass. Garnish and serve.'
		},
		ingredients: [
			'Dry Vermouth',
			'Gin',
			'Apricot brandy',
			'Lemon juice',
			'Grenadine',
			'Powdered sugar'
		],
		amount: [ '1/2 oz ', '1 oz ', '1/2 oz ', '1/2 tsp ', '1 tsp ', null ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Derby',
			image: 'https://www.thecocktaildb.com/images/media/drink/52weey1606772672.jpg',
			tags: 'Classic,IBA',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Pour all ingredients into a mixing glass with ice. Stir. Strain into a cocktail glass. Garnish with a sprig of fresh mint in the drink.'
		},
		ingredients: [ 'gin', 'Peach Bitters', 'Mint' ],
		amount: [ '6 cl', '2 dashes', '2 Fresh leaves' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'A. J.',
			image: 'https://www.thecocktaildb.com/images/media/drink/l74qo91582480316.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Shake ingredients with ice, strain into a cocktail glass, and serve.'
		},
		ingredients: [ 'Applejack', 'Grapefruit juice' ],
		amount: [ '1 1/2 oz ', '1 oz ' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Bijou',
			image: 'https://www.thecocktaildb.com/images/media/drink/rysb3r1513706985.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Stir in mixing glass with ice and strain\r\n'
		},
		ingredients: [ 'Orange Bitters', 'Green Chartreuse', 'Gin', 'Sweet Vermouth' ],
		amount: [ '1 dash', '1 oz', '1 oz', '1 oz' ],
		category: 'Cocktail'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: '50/50',
			image: 'https://www.thecocktaildb.com/images/media/drink/wwpyvr1461919316.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'fill glass with crushed ice. Add vodka. Add a splash of grand-marnier. Fill with o.j.'
		},
		ingredients: [ 'Vanilla vodka', 'Grand Marnier', 'Orange juice' ],
		amount: [ '2 1/2 oz ', '1 splash ', 'Fill with ' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Karsk',
			image: 'https://www.thecocktaildb.com/images/media/drink/808mxk1487602471.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Put a copper coin in a coffe-cup and fill up with coffee until you no longer see the coin, then add alcohol until you see the coin. Norwegian speciality.'
		},
		ingredients: [ 'Coffee', 'Grain alcohol' ],
		amount: [ '1 part ', '2 parts ' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Melya',
			image: 'https://www.thecocktaildb.com/images/media/drink/xwtptq1441247579.jpg',
			tags: '',
			area: null,
			alcoholic: 'Non alcoholic',
			instructions: 'Brew espresso. In a coffee mug, place 1 teaspoon of unsweetened powdered cocoa, then cover a teaspoon with honey and drizzle it into the cup. Stir while the coffee brews, this is the fun part. The cocoa seems to coat the honey without mixing, so you get a dusty, sticky mass that looks as though it will never mix. Then all at once, presto! It looks like dark chocolate sauce. Pour hot espresso over the honey, stirring to dissolve. Serve with cream.'
		},
		ingredients: [ 'Espresso', 'Honey', 'Cocoa powder' ],
		amount: [ null, 'Unsweetened ', null ],
		category: 'Coffee / Tea'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Zorro',
			image: 'https://www.thecocktaildb.com/images/media/drink/kvvd4z1485621283.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'add all and pour black coffee and add whipped cream on top.'
		},
		ingredients: [ 'Sambuca', 'Baileys irish cream', 'White Creme de Menthe' ],
		amount: [ '2 cl ', '2 cl ', '2 cl ' ],
		category: 'Coffee / Tea'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Zombie',
			image: 'https://www.thecocktaildb.com/images/media/drink/2en3jk1509557725.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: '\r\n' +
        'Blend at high speed for no more than 5 seconds.\r\n' +
        '\r\n' +
        'Pour into a glass, add ice cubes to fill, then add the garnish.\r\n' +
        '\r\n' +
        '*Donn’s mix: Bring 3 crushed cinnamon sticks, 1 cup of sugar and 1 cup of water to a boil, stirring until the sugar is dissolved.\r\n' +
        '\r\n' +
        'Simmer for 2 minutes, then remove from the heat and let sit for at least 2 hours before straining into a clean glass bottle.\r\n' +
        '\r\n' +
        'Then add 1 part of the syrup and 2 parts of fresh grapefruit juice together.'
		},
		ingredients: [
			'Rum',
			'Gold rum',
			'151 proof rum',
			'Pernod',
			'Grenadine',
			'Lime Juice',
			'Angostura Bitters'
		],
		amount: [
			'1 1/2 oz', '1 1/2 oz',
			'1 oz',     '1 tsp',
			'1 tsp',    '1 tsp',
			'1 drop'
		],
		category: 'Cocktail'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Orgasm',
			image: 'https://www.thecocktaildb.com/images/media/drink/vr6kle1504886114.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Shake all ingredients with ice, strain into a chilled cocktail glass, and serve.'
		},
		ingredients: [
			'Creme de Cacao',
			'Amaretto',
			'Triple sec',
			'Vodka',
			'Light cream'
		],
		amount: [ '1/2 oz white ', '1/2 oz ', '1/2 oz ', '1/2 oz ', '1 oz ' ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 1,
			recipe_name: 'Affair',
			image: 'https://www.thecocktaildb.com/images/media/drink/h5za6y1582477994.jpg',
			tags: '',
			area: null,
			alcoholic: 'Alcoholic',
			instructions: 'Pour schnapps, orange juice, and cranberry juice over ice in a highball glass. Top with club soda and serve.'
		},
		ingredients: [
			'Strawberry schnapps',
			'Orange juice',
			'Cranberry juice',
			'Club soda'
		],
		amount: [ '2 oz ', '2 oz ', '2 oz ', null ],
		category: 'Ordinary Drink'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Corba',
			image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
			tags: 'Soup',
			area: 'Turkish',
			alcoholic: null,
			instructions: 'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\n' +
        'In a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\n' +
        'Add the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\n' +
        'Immediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\n' +
        'After it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\n' +
        'After the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\n' +
        'Serve with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.'
		},
		ingredients: [
			'Lentils',
			'Onion',
			'Carrots',
			'Tomato Puree',
			'Cumin',
			'Paprika',
			'Mint',
			'Thyme',
			'Black Pepper',
			'Red Pepper Flakes',
			'Vegetable Stock',
			'Water',
			'Sea Salt'
		],
		amount: [
			'1 cup ',  '1 large',
			'1 large', '1 tbs',
			'2 tsp',   '1 tsp ',
			'1/2 tsp', '1/2 tsp',
			'1/4 tsp', '1/4 tsp',
			'4 cups ', '1 cup ',
			'Pinch'
		],
		category: 'Side'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Burek',
			image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
			tags: 'Streetfood, Onthego',
			area: 'Croatian',
			alcoholic: null,
			instructions: 'Fry the finely chopped onions and minced meat in oil. Add the salt and pepper. Grease a round baking tray and put a layer of pastry in it. Cover with a thin layer of filling and cover this with another layer of filo pastry which must be well coated in oil. Put another layer of filling and cover with pastry. When you have five or six layers, cover with filo pastry, bake at 200ºC/392ºF for half an hour and cut in quarters and serve.'
		},
		ingredients: [ 'Filo Pastry', 'Minced Beef', 'Onion', 'Oil', 'Salt', 'Pepper' ],
		amount: [ '1 Packet', '150g', '150g', '40g', 'Dash', 'Dash' ],
		category: 'Side'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Sushi',
			image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
			tags: '',
			area: 'Japanese',
			alcoholic: null,
			instructions: 'STEP 1\r\n' +
        'TO MAKE SUSHI ROLLS: Pat out some rice. Lay a nori sheet on the mat, shiny-side down. Dip your hands in the vinegared water, then pat handfuls of rice on top in a 1cm thick layer, leaving the furthest edge from you clear.\r\n' +
        '\r\n' +
        'STEP 2\r\n' +
        'Spread over some Japanese mayonnaise. Use a spoon to spread out a thin layer of mayonnaise down the middle of the rice.\r\n' +
        '\r\n' +
        'STEP 3\r\n' +
        'Add the filling. Get your child to top the mayonnaise with a line of their favourite fillings – here we’ve used tuna and cucumber.\r\n' +
        '\r\n' +
        'STEP 4\r\n' +
        'Roll it up. Lift the edge of the mat over the rice, applying a little pressure to keep everything in a tight roll.\r\n' +
        '\r\n' +
        'STEP 5\r\n' +
        'Stick down the sides like a stamp. When you get to the edge without any rice, brush with a little water and continue to roll into a tight roll.\r\n' +
        '\r\n' +
        'STEP 6\r\n' +
        'Wrap in cling film. Remove the mat and roll tightly in cling film before a grown-up cuts the sushi into thick slices, then unravel the cling film.\r\n' +
        '\r\n' +
        'STEP 7\r\n' +
        'TO MAKE PRESSED SUSHI: Layer over some smoked salmon. Line a loaf tin with cling film, then place a thin layer of smoked salmon inside on top of the cling film.\r\n' +
        '\r\n' +
        'STEP 8\r\n' +
        'Cover with rice and press down. Press about 3cm of rice over the fish, fold the cling film over and press down as much as you can, using another tin if you have one.\r\n' +
        '\r\n' +
        'STEP 9\r\n' +
        'Tip it out like a sandcastle. Turn block of sushi onto a chopping board. Get a grown-up to cut into fingers, then remove the cling film.\r\n' +
        '\r\n' +
        'STEP 10\r\n' +
        'TO MAKE SUSHI BALLS: Choose your topping. Get a small square of cling film and place a topping, like half a prawn or a small piece of smoked salmon, on it. Use damp hands to roll walnut-sized balls of rice and place on the topping.\r\n' +
        '\r\n' +
        'STEP 11\r\n' +
        'Make into tight balls. Bring the corners of the cling film together and tighten into balls by twisting it up, then unwrap and serve.'
		},
		ingredients: [
			'Sushi Rice',
			'Rice wine',
			'Caster Sugar',
			'Mayonnaise',
			'Rice wine',
			'Soy Sauce',
			'Cucumber'
		],
		amount: [
			'300ml ', '100ml',
			'2 tbs',  '3 tbs',
			'1 tbs',  '1 tbs',
			'1'
		],
		category: 'Seafood'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Kumpir',
			image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
			tags: 'SideDish',
			area: 'Turkish',
			alcoholic: null,
			instructions: 'If you order kumpir in Turkey, the standard filling is first, lots of butter mashed into the potato, followed by cheese. There’s then a row of other toppings that you can just point at to your heart’s content – sweetcorn, olives, salami, coleslaw, Russian salad, allsorts – and you walk away with an over-stuffed potato because you got ever-excited by the choices on offer.\r\n' +
        '\r\n' +
        'Grate (roughly – you can use as much as you like) 150g of cheese.\r\n' +
        'Finely chop one onion and one sweet red pepper.\r\n' +
        'Put these ingredients into a large bowl with a good sprinkling of salt and pepper, chilli flakes (optional).'
		},
		ingredients: [
			'Potatoes',
			'Butter',
			'Cheese',
			'Onion',
			'Red Pepper',
			'Red Chile Flakes'
		],
		amount: [ '2 large', '2 tbs', '150g', '1 large', '1 large', 'Pinch' ],
		category: 'Side'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Bistek',
			image: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
			tags: '',
			area: 'Filipino',
			alcoholic: null,
			instructions: '0.\tMarinate beef in soy sauce, lemon (or calamansi), and ground black pepper for at least 1 hour. Note: marinate overnight for best result\r\n' +
        '1.\tHeat the cooking oil in a pan then pan-fry half of the onions until the texture becomes soft. Set aside\r\n' +
        '2.\tDrain the marinade from the beef. Set it aside. Pan-fry the beef on the same pan where the onions were fried for 1 minute per side. Remove from the pan. Set aside\r\n' +
        '3.\tAdd more oil if needed. Saute garlic and remaining raw onions until onion softens.\r\n' +
        '4.\tPour the remaining marinade and water. Bring to a boil.\r\n' +
        '5.\tAdd beef. Cover the pan and simmer until the meat is tender. Note: Add water as needed.\r\n' +
        '6.\tSeason with ground black pepper and salt as needed. Top with pan-fried onions.\r\n' +
        '7.\tTransfer to a serving plate. Serve hot. Share and Enjoy!\r\n'
		},
		ingredients: [
			'Beef',  'Soy Sauce',
			'Lemon', 'Garlic',
			'Onion', 'Olive Oil',
			'Water', 'Salt'
		],
		amount: [
			'1 lb',
			'5 tablespoons',
			'1',
			'3 cloves',
			'3 parts ',
			'4 tbs',
			'1 cup ',
			'1 pinch'
		],
		category: 'Beef'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Tamiya',
			image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
			tags: '',
			area: 'Egyptian',
			alcoholic: null,
			instructions: 'oak the beans in water to cover overnight.Drain. If skinless beans are unavailable, rub to loosen the skins, then discard the skins. Pat the beans dry with a towel.\r\n' +
        'Grind the beans in a food mill or meat grinder.If neither appliance is available, process them in a food processor but only until the beans form a paste. (If blended too smoothly, the batter tends to fall apart during cooking.) Add the scallions, garlic, cilantro, cumin, baking powder, cayenne, salt, pepper, and coriander, if using.  Refrigerate for at least 30 minutes.\r\n' +
        'Shape the bean mixture into 1-inch balls.Flatten slightly and coat with flour.\r\n' +
        'Heat at least 1½-inches of oil over medium heat to 365 degrees.\r\n' +
        'Fry the patties in batches, turning once, until golden brown on all sides, about 5 minutes.Remove with a wire mesh skimmer or slotted spoon. Serve as part of a meze or in pita bread with tomato-cucumber salad and tahina sauce.'
		},
		ingredients: [
			'Broad Beans',
			'Spring Onions',
			'Garlic Clove',
			'Parsley',
			'Cumin',
			'Baking Powder',
			'Cayenne Pepper',
			'Flour',
			'Vegetable Oil'
		],
		amount: [
			'3 cups ',     '6',
			'4',           '1/4 cup',
			'2 tsp',       '1 tsp ',
			'1/2 tsp',     'Spinkling',
			'As required'
		],
		category: 'Vegetarian'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Kafteji',
			image: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg',
			tags: '',
			area: 'Tunisian',
			alcoholic: null,
			instructions: 'Peel potatoes and cut into 5cm cubes.\r\n' +
        'Pour 1-2 cm of olive oil into a large pan and heat up very hot. Fry potatoes until golden brown for 20 minutes, turning from time to time. Place on kitchen paper to drain.\r\n' +
        'Cut the peppers in half and remove seeds. Rub a little olive oil on them and place the cut side down on a baking tray. Place them under the grill. Grill until the skin is dark and bubbly. While the peppers are still hot, put them into a plastic sandwich bag and seal it. Take them out after 15 minutes and remove skins.\r\n' +
        'In the meantime, heat more olive oil another pan. Peel the onions and cut into thin rings. Fry for 15 minutes until golden brown, turning them often. Add the Ras el hanout at the end.\r\n' +
        'Cut the pumpkin into 5cm cubes and fry in the same pan you used for the potatoes for 10-15 minutes until it is soft and slightly browned. Place on kitchen paper.\r\n' +
        'Pour the remaining olive oil out of the pan and put all the cooked vegetables into the pan and mix. Whisk eggs and pour them over the vegetables. Put the lid on the pan so that the eggs cook. Put the contents of the pan onto a large chopping board, add salt and pepper and chopped and mix everything with a big knife.'
		},
		ingredients: [
			'Potatoes',
			'Olive Oil',
			'Green Pepper',
			'Onions',
			'Ras el hanout',
			'Pumpkin',
			'Eggs',
			'Salt',
			'Pepper'
		],
		amount: [
			'5 Large',    '2 tbs',
			'1',          '5',
			'1 tbs',      '500g',
			'24 Skinned', 'Pinch',
			'Pinch'
		],
		category: 'Vegetarian'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Lasagne',
			image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
			tags: '',
			area: 'Italian',
			alcoholic: null,
			instructions: 'Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board. Add the bacon to the pan and cook for just a few mins until starting to turn golden. Add the onion, celery and carrot, and cook over a medium heat for 5 mins, stirring occasionally, until softened.\r\n' +
        'Add the garlic and cook for 1 min, then tip in the mince and cook, stirring and breaking it up with a wooden spoon, for about 6 mins until browned all over.\r\n' +
        'Stir in the tomato purée and cook for 1 min, mixing in well with the beef and vegetables. Tip in the chopped tomatoes. Fill each can half full with water to rinse out any tomatoes left in the can, and add to the pan. Add the honey and season to taste. Simmer for 20 mins.\r\n' +
        'Heat oven to 200C/180C fan/gas 6. To assemble the lasagne, ladle a little of the ragu sauce into the bottom of the roasting tin or casserole dish, spreading the sauce all over the base. Place 2 sheets of lasagne on top of the sauce overlapping to make it fit, then repeat with more sauce and another layer of pasta. Repeat with a further 2 layers of sauce and pasta, finishing with a layer of pasta.\r\n' +
        'Put the crème fraîche in a bowl and mix with 2 tbsp water to loosen it and make a smooth pourable sauce. Pour this over the top of the pasta, then top with the mozzarella. Sprinkle Parmesan over the top and bake for 25–30 mins until golden and bubbling. Serve scattered with basil, if you like.'
		},
		ingredients: [
			'Olive Oil',        'Bacon',
			'Onion',            'Celery',
			'Carrots',          'Garlic',
			'Minced Beef',      'Tomato Puree',
			'Chopped Tomatoes', 'Honey',
			'Lasagne Sheets',   'Creme Fraiche',
			'Mozzarella Balls', 'Parmesan Cheese',
			'Basil Leaves'
		],
		amount: [
			'1 tblsp ',          '2',
			'1 finely chopped ', '1 Stick',
			'1 medium',          '2 cloves chopped',
			'500g',              '1 tbls',
			'800g',              '1 tblsp ',
			'500g',              '400ml',
			'125g',              '50g',
			'Topping'
		],
		category: 'Pasta'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Dal fry',
			image: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
			tags: 'Curry,Vegetarian,Cake',
			area: 'Indian',
			alcoholic: null,
			instructions: 'Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\n' +
        'Cook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\n' +
        'In a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\n' +
        'Add tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\n' +
        'Add cilantro and garam masala cook for about one minute.\r\n' +
        'Pour the seasoning over dal mix it well and cook for another minute.\r\n' +
        'Serve with Naan.'
		},
		ingredients: [
			'Toor dal',    'Water',
			'Salt',        'Turmeric',
			'Ghee',        'Chopped tomatoes',
			'Cumin seeds', 'Mustard Seeds',
			'Bay Leaf',    'Green Chili',
			'Ginger',      'Cilantro',
			'Red Pepper',  'Salt',
			'Sugar',       'Garam Masala'
		],
		amount: [
			'1 cup',          '2-1/2 cups',
			'1 tsp',          '1/4 tsp',
			'3 tbs',          '1 cup',
			'1/2 tsp',        '1/2 tsp',
			'2',              '1 tbs chopped',
			'2 tsp shredded', '2 tbs ',
			'1/2 tsp',        '1/2 tsp',
			'1 tsp',          '1/4 tsp'
		],
		category: 'Vegetarian'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Wontons',
			image: 'https://www.themealdb.com/images/media/meals/1525876468.jpg',
			tags: 'MainMeal',
			area: 'Chinese',
			alcoholic: null,
			instructions: 'Combine pork, garlic, ginger, soy sauce, sesame oil, and vegetables in a bowl.\r\n' +
        'Separate wonton skins.\r\n' +
        'Place a heaping teaspoon of filling in the center of the wonton.\r\n' +
        'Brush water on 2 borders of the skin, covering 1/4 inch from the edge.\r\n' +
        'Fold skin over to form a triangle, sealing edges.\r\n' +
        'Pinch the two long outside points together.\r\n' +
        'Heat oil to 450 degrees and fry 4 to 5 at a time until golden.\r\n' +
        'Drain and serve with sauce.'
		},
		ingredients: [
			'Pork',
			'Garlic Clove',
			'Ginger',
			'Soy Sauce',
			'Sesame Seed Oil',
			'Carrots',
			'Celery',
			'Spring Onions',
			'Wonton Skin',
			'Oil',
			'Water'
		],
		amount: [
			'1lb',
			'3 chopped',
			'1 tsp ',
			'1 tbs',
			'1 tsp ',
			'3 finely chopped',
			'3 finely chopped',
			'6 chopped',
			'1 Packet',
			'Fry',
			'Bottle'
		],
		category: 'Pork'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Poutine',
			image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
			tags: 'UnHealthy,Speciality,HangoverFood',
			area: 'Canadian',
			alcoholic: null,
			instructions: 'Heat oil in a deep fryer or deep heavy skillet to 365°F (185°C).\r\n' +
        'Warm gravy in saucepan or microwave.\r\n' +
        'Place the fries into the hot oil, and cook until light brown, about 5 minutes.\r\n' +
        'Remove to a paper towel lined plate to drain.\r\n' +
        'Place the fries on a serving platter, and sprinkle the cheese over them.\r\n' +
        'Ladle gravy over the fries and cheese, and serve immediately.'
		},
		ingredients: [ 'Vegetable Oil', 'Beef Gravy', 'Potatoes', 'Cheese Curds' ],
		amount: [ 'Dash', '1 Can', '5 thin cut', '2 cups' ],
		category: 'Miscellaneous'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Timbits',
			image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
			tags: 'Snack,Treat',
			area: 'Canadian',
			alcoholic: null,
			instructions: 'Sift together dry ingredients.\r\n' +
        'Mix together wet ingredients and incorporate into dry. Stir until smooth.\r\n' +
        'Drop by teaspoonfuls(no bigger) into hot oil (365 degrees, no hotter), turning after a few moments until golden brown on all sides.\r\n' +
        'Remove and drain.\r\n' +
        'Roll in cinnamon sugar while still warm and serve.'
		},
		ingredients: [
			'Flour',
			'Sugar',
			'Baking Powder',
			'Salt',
			'Egg',
			'Milk',
			'Oil',
			'Oil',
			'Icing Sugar'
		],
		amount: [
			'2 cups ',  '1/3 cup',
			'3 tsp',    '½ tsp',
			'1 beaten', '¾ cup',
			'3 tbs',    'for frying',
			'garnish'
		],
		category: 'Dessert'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Koshari',
			image: 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg',
			tags: '',
			area: 'Egyptian',
			alcoholic: null,
			instructions: 'Cook the lentils. Bring lentils and 4 cups of water to a boil in a medium pot or saucepan over high heat. Reduce the heat to low and cook until lentils are just tender (15-17 minutes). Drain from water and season with a little salt. (Note: when the lentils are ready, they should not be fully cooked. They should be only par-cooked and still have a bite to them as they need to finish cooking with the rice).\r\n' +
        'Now, for the rice. Drain the rice from its soaking water. Combine the par-cooked lentils and the rice in the saucepan over medium-high heat with 1 tbsp cooking oil, salt, pepper, and coriander. Cook for 3 minutes, stirring regularly. Add warm water to cover the rice and lentil mixture by about 1 1/2 inches (you’ll probably use about 3 cups of water here). Bring to a boil; the water should reduce a bit. Now cover and cook until all the liquid has been absorbed and both the rice and lentils are well cooked through (about 20 minutes).  Keep covered and undisturbed for 5 minutes or so.\r\n' +
        'Now make the pasta. While the rice and lentils are cooking, make the pasta according to package instructions by adding the elbow pasta to boiling water with a dash of salt and a little oil. Cook until the pasta is al dente. Drain.\r\n' +
        'Cover the chickpeas and warm in the microwave briefly before serving.\r\n' +
        '\r\n' +
        'Make the crispy onion topping. \r\n' +
        '\r\n' +
        'Sprinkle the onion rings with salt, then toss them in the flour to coat. Shake off excess flour.\r\n' +
        'In a large skillet, heat the cooking oil over medium-high heat, cook the onion rings, stirring often, until they turn a nice caramelized brown. Onions must be crispy, but not burned (15-20 minutes).'
		},
		ingredients: [
			'Brown Lentils',
			'Rice',
			'Coriander',
			'Macaroni',
			'Chickpeas',
			'Onion',
			'Salt',
			'Vegetable Oil'
		],
		amount: [
			'1 1/2 cups ',
			'1 1/2 cups ',
			'1/2 tsp',
			'2 cups ',
			'Can',
			'1 large',
			'Sprinking',
			'1/2 cup '
		],
		category: 'Vegetarian'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Big Mac',
			image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
			tags: '',
			area: 'American',
			alcoholic: null,
			instructions: 'For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n' +
        '2. To make the patties, season the mince with salt and pepper and form into 4 balls using about 1/3 cup mince each. Place each onto a square of baking paper and flatten to form into four x 15cm circles. Heat oil in a large frypan over high heat. In 2 batches, cook beef patties for 1-2 minutes each side until lightly charred and cooked through. Remove from heat and keep warm. Repeat with remaining two patties.\r\n' +
        '3. Carefully slice each burger bun into three acrossways, then lightly toast.\r\n' +
        '4. To assemble the burgers, spread a little Big Mac sauce over the bottom base. Top with some chopped onion, shredded lettuce, slice of cheese, beef patty and some pickle slices. Top with the middle bun layer, and spread with more Big Mac sauce, onion, lettuce, pickles, beef patty and then finish with more sauce. Top with burger lid to serve.\r\n' +
        '5. After waiting half an hour for your food to settle, go for a jog.'
		},
		ingredients: [
			'Minced Beef',
			'Olive Oil',
			'Sesame Seed Burger Buns',
			'Onion',
			'Iceberg Lettuce',
			'Cheese',
			'Dill Pickles',
			'Mayonnaise',
			'White Wine Vinegar',
			'Pepper',
			'Mustard',
			'Onion Salt',
			'Garlic Powder',
			'Paprika'
		],
		amount: [
			'400g',       '2 tbs',
			'2',          'Chopped',
			'1/4 ',       '2 sliced',
			'2 large',    '1 cup ',
			'2 tsp',      'Pinch',
			'2 tsp',      '1 1/2 tsp ',
			'1 1/2 tsp ', '1/2 tsp'
		],
		category: 'Beef'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Shawarma',
			image: 'https://www.themealdb.com/images/media/meals/kcv6hj1598733479.jpg',
			tags: '',
			area: 'Egyptian',
			alcoholic: null,
			instructions: 'Combine the marinade ingredients in a large ziplock bag (or bowl).\r\n' +
        'Add the chicken and use your hands to make sure each piece is coated. If using a ziplock bag, I find it convenient to close the bag then massage the bag to disperse the rub all over each chicken piece.\r\n' +
        'Marinate overnight or up to 24 hours.\r\n' +
        'Combine the Yoghurt Sauce ingredients in a bowl and mix. Cover and put in the fridge until required (it will last for 3 days in the fridge).\r\n' +
        'Heat grill/BBQ (or large heavy based pan on stove) on medium high. You should not need to oil it because the marinade has oil in it and also thigh fillets have fat. But if you are worried then oil your hotplate/grill. (See notes for baking)\r\n' +
        'Place chicken on the grill and cook the first side for 4 to 5 minutes until nicely charred, then turn and cook the other side for 3 to 4 minutes (the 2nd side takes less time).\r\n' +
        'Remove chicken from the grill and cover loosely with foil. Set aside to rest for 5 minutes.\r\n' +
        'TO SERVE\r\n' +
        'Slice chicken and pile onto platter alongside flatbreads, Salad and the Yoghurt Sauce.\r\n' +
        'To make a wrap, get a piece of flatbread and smear with Yoghurt Sauce. Top with a bit of lettuce and tomato and Chicken Shawarma. Roll up and enjoy!'
		},
		ingredients: [
			'Chicken Thighs', 'Coriander',
			'Cumin',          'Cardamom',
			'Cayenne Pepper', 'Paprika',
			'Lemon Juice',    'Olive Oil',
			'Greek Yogurt',   'Garlic Clove',
			'Cumin',          'Lemon Juice',
			'Lettuce',        'Tomato',
			'Pita Bread'
		],
		amount: [
			'1 kg',   '1 tbs',  '1 tbs',
			'1 tbs',  '1 tsp ', '2 tsp',
			'2 tbs',  '3 tbs',  '1 cup ',
			'1',      '1 tsp ', 'Splash',
			'Sliced', 'Sliced', '6'
		],
		category: 'Chicken'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Stamppot',
			image: 'https://www.themealdb.com/images/media/meals/hyarod1565090529.jpg',
			tags: 'Savory,Breakfast',
			area: 'Dutch',
			alcoholic: null,
			instructions: '\r\n' +
        'Wash and peel the potatoes and cut into similarly sized pieces for even cooking.\r\n' +
        '\r\n' +
        'In a large soup pot, boil the potatoes and the bay leaves in salted water for 20 minutes. Discard the bay leaves.\r\n' +
        '\r\n' +
        'If you\'re not using a bag of ready-cut curly kale, wash the bunches thoroughly under cool running water to get rid of all soil—you wouldn\'t want that gritty texture in your finished dish. Trim any coarse stems and discard any brown leaves. With a sharp knife, cut the curly kale into thin strips.\r\n' +
        '\r\n' +
        'Peel and chop the shallots.\r\n' +
        '\r\n' +
        'In a frying pan or skillet, melt 1 tbsp. of butter and saute the shallots for a few minutes before adding the curly kale and 2 tbsp. of water. Season and cook for about 10 minutes, or until tender.\r\n' +
        '\r\n' +
        'Warm the milk on the stove or in the microwave.\r\n' +
        '\r\n' +
        'Drain, shake and dry the potatoes with kitchen towels before mashing with a potato masher or ricer. Working quickly, add the warm milk and the remaining butter. Season to taste with nutmeg, salt, and pepper. \r\n' +
        '\r\n' +
        'Mix the cooked curly kale through the cooked mashed potato mixture.\r\n' +
        '\r\n' +
        'Top with slices of the smoked sausage and serve hot with your favorite mustard or gravy.\r\n' +
        '\r\n' +
        'Serve and enjoy!'
		},
		ingredients: [
			'Potatoes', 'Bay Leaf',
			'Shallots', 'Butter',
			'Kale',     'Sausages',
			'Milk',     'Nutmeg',
			'Salt',     'Pepper'
		],
		amount: [
			'1.5kg', '2 leaves',
			'2',     '3 tbs',
			'750g',  '2',
			'500ml', 'Grated',
			'Pinch', 'Pinch'
		],
		category: 'Pork'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Kapsalon',
			image: 'https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg',
			tags: 'Snack',
			area: 'Dutch',
			alcoholic: null,
			instructions: 'Cut the meat into strips. Heat oil in a pan and fry the strips for 6 minutes until it\'s ready.\r\n' +
        'Bake the fries until golden brown in a deep fryrer. When ready transfer to a backing dish. Make sure the fries are spread over the whole dish.\r\n' +
        'Cover the fries with a new layer of meat and spread evenly.\r\n' +
        'Add a layer of cheese over the meat. You can also use grated cheese. When done put in the oven for a few minutes until the cheese is melted.\r\n' +
        'Chop the lettuce, tomato and cucumber in small pieces and mix together. for a basic salad. As extra you can add olives jalapenos and a red union.\r\n' +
        'Dived the salad over the dish and Serve with garlicsauce and hot sauce'
		},
		ingredients: [
			'Fries',
			'Doner Meat',
			'Garlic sauce',
			'Hotsauce',
			'Lettuce',
			'Tomato',
			'Cucumber',
			'Gouda cheese'
		],
		amount: [
			'250 Grams', '500 Grams',
			'Topping',   'Topping',
			'1 Bulb',    '1',
			'3rd',       '100 Grams'
		],
		category: 'Lamb'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Kedgeree',
			image: 'https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg',
			tags: '',
			area: 'British',
			alcoholic: null,
			instructions: 'For the rice, heat the oil in a large, lidded pan, add the onion, then gently fry for 5 mins until softened but not coloured. Add the spices, season with salt, then continue to fry until the mix start to go brown and fragrant; about 3 mins.\r\n' +
        'Add the rice and stir in well. Add 600ml water, stir, then bring to the boil. Reduce to a simmer, then cover for 10 mins. Take off the heat and leave to stand, covered, for 10-15 mins more. The rice will be perfectly cooked if you do not lift the lid before the end of the cooking.\r\n' +
        'Meanwhile, put the haddock and bay leaves in a frying pan, cover with the milk, then poach for 10 mins until the flesh flakes. Remove from the milk, peel away the skin, then flake the flesh into thumbsize pieces. Place the eggs in a pan, cover with water, bring to the boil, then reduce to a simmer. Leave for 4½-5 mins, plunge into cold water, then peel and cut the eggs into quarters. Gently mix the fish, eggs, parsley, coriander and rice together in the pan. Serve hot, sprinkled with a few extra herbs.'
		},
		ingredients: [
			'Smoked Haddock',
			'Bay Leaves',
			'Milk',
			'Eggs',
			'Parsley',
			'Coriander',
			'Vegetable Oil',
			'Onion',
			'Coriander',
			'Curry Powder',
			'Rice'
		],
		amount: [
			'300g',    '2',
			'300ml ',  '4',
			'Handful', 'Handful',
			'2 tbs',   '1 chopped',
			'1 tsp ',  '2 tsp',
			'300g'
		],
		category: 'Seafood'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Fish pie',
			image: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg',
			tags: 'Fish,Pie,Breakfast,Baking',
			area: 'British',
			alcoholic: null,
			instructions: '01.Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat, cover, then simmer gently for 15 minutes until tender. Drain, then return to the pan over a low heat for 30 seconds to drive off any excess water. Mash with 1 tbsp olive oil, then season.\r\n' +
        '02.Meanwhile put the milk in a large sauté pan, add the fish and bring to the boil. Remove from the heat, cover and stand for 3 minutes. Remove the fish (reserving the milk) and pat dry with kitchen paper, then gently flake into an ovenproof dish, discarding the skin and any bones.\r\n' +
        '03.Heat the remaining oil in a pan, stir in the flour and cook for 30 seconds. Gradually stir in 200-250ml of the reserved milk (discard the rest). Grate in nutmeg, season, then bubble until thick. Stir in the cream.\r\n' +
        '04.Preheat the oven to 190°C/fan170°C/gas 5. Grate the artichokes and add to the dish with the leek, prawns and herbs. Stir the lemon zest and juice into the sauce, then pour over. Mix gently with a wooden spoon.\r\n' +
        '05.Spoon the mash onto the fish mixture, then use a fork to make peaks, which will crisp and brown as it cooks. Sprinkle over the cheese, then bake for 35-40 minutes until golden and bubbling. Serve with wilted greens.'
		},
		ingredients: [
			'Floury Potatoes',
			'Olive Oil',
			'Semi-skimmed Milk',
			'White Fish Fillets',
			'Plain flour',
			'Nutmeg',
			'Double Cream',
			'Jerusalem Artichokes',
			'Leek',
			'Prawns',
			'Parsley',
			'Dill',
			'Lemon',
			'Gruyère',
			'Lemon'
		],
		amount: [
			'900g',             '2 tbsp',
			'600ml',            '800g',
			'1 tbsp',           'Grating',
			'3 tbsp',           '200g',
			'1 finely sliced',  '200g peeled raw',
			'Large handful',    'Handful',
			'Grated zest of 1', '25g grated',
			'Juice of 1'
		],
		category: 'Seafood'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Flamiche',
			image: 'https://www.themealdb.com/images/media/meals/wssvvs1511785879.jpg',
			tags: 'Tart',
			area: 'French',
			alcoholic: null,
			instructions: 'For the pastry, sift the flour and salt into the bowl of a food processor, add the butter and lard, then whizz together briefly until the mixture looks like fine breadcrumbs. Tip the mixture into a bowl, then stir in the cheese and enough of the water for the mixture to come together. Tip out onto a lightly floured surface and knead briefly until smooth. Roll out thinly and line a 23cm x 4cm loose-?bottomed fluted flan tin. Prick the base with a fork. Chill for 20 minutes.\r\n' +
        '02.Melt the 75g butter in a saucepan over a low heat, then add the leeks and the salt. Cover and cook for ?10 minutes until soft. Uncover the pan, increase the heat and cook ?for 2 minutes, stirring occasionally, until the liquid has evaporated. Spoon onto a plate and leave to cool.\r\n' +
        '03.Preheat the oven to 200°C/fan180°C/gas 6. Line the pastry case with baking paper and baking beans or rice and blind bake for 15-20 minutes until the edges are biscuit-coloured. Remove the paper and beans/rice and return the case to the oven for 7-10 minutes until the base is crisp and lightly golden. Remove and set aside. Reduce the oven temperature to 190°C/fan170°C/gas 5.\r\n' +
        '04.Put the crème fraîche into a bowl with the whole egg, egg yolks and nutmeg. Lightly beat together, then season. Stir in the leeks. Spoon ?the mixture into the tart case and bake for 35-40 minutes until set ?and lightly golden. Remove from ?the oven and leave for 10 minutes. Take out of the tin and serve.'
		},
		ingredients: [
			'Butter', 'Leek',
			'Salt',   'Creme Fraiche',
			'Egg',    'Egg Yolks',
			'Nutmeg', 'Plain Flour',
			'Salt',   'Butter',
			'Lard',   'Cheddar Cheese',
			'Water'
		],
		amount: [
			'75g',        '1kg',
			'½ tsp',      '300ml ',
			'1',          '3',
			'¼ teaspoon', '225g',
			'½ tsp',      '60g',
			'60g',        '50g',
			'2 tbs'
		],
		category: 'Vegetarian'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Pancakes',
			image: 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
			tags: 'Breakfast,Desert,Sweet,Fruity',
			area: 'American',
			alcoholic: null,
			instructions: 'Put the flour, eggs, milk, 1 tbsp oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. Set aside for 30 mins to rest if you have time, or start cooking straight away.\r\n' +
        'Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper. When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.\r\n' +
        'Serve with lemon wedges and sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.'
		},
		ingredients: [
			'Flour',
			'Eggs',
			'Milk',
			'Sunflower Oil',
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
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Moussaka',
			image: 'https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg',
			tags: '',
			area: 'Greek',
			alcoholic: null,
			instructions: 'Heat the grill to high. Brown the beef in a deep ovenproof frying pan over a high heat for 5 mins. Meanwhile, prick the aubergine with a fork, then microwave on High for 3-5 mins until soft. Mix the yogurt, egg and parmesan together, then add a little seasoning.\r\n' +
        '\r\n' +
        'Stir the tomatoes, purée and potatoes in with the beef with some seasoning and heat through. Smooth the surface of the beef mixture with the back of a spoon, then slice the cooked aubergine and arrange on top. Pour the yogurt mixture over the aubergines, smooth out evenly, then grill until the topping has set and turned golden.'
		},
		ingredients: [
			'Beef',
			'Aubergine',
			'Greek Yogurt',
			'Egg',
			'Parmesan',
			'Tomato',
			'Tomato Puree',
			'Potatoes'
		],
		amount: [
			'500g',  '1 large',
			'150g',  '1 beaten',
			'3 tbs', '400g',
			'4 tbs', '350g'
		],
		category: 'Beef'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Eton Mess',
			image: 'https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg',
			tags: 'Dairy,Fruity,Desert,Treat,Speciality',
			area: 'British',
			alcoholic: null,
			instructions: 'Purée half the strawberries in a blender. Chop the remaining strawberries, reserving four for decoration.\r\n' +
        'Whip the double cream until stiff peaks form, then fold in the strawberry purée and crushed meringue. Fold in the chopped strawberries and ginger cordial, if using.\r\n' +
        'Spoon equal amounts of the mixture into four cold wine glasses. Serve garnished with the remaining strawberries and a sprig of mint.'
		},
		ingredients: [
			'strawberries',
			'double cream',
			'meringue nests',
			'ginger cordial',
			'Mint'
		],
		amount: [ '500g', '400ml', '3 x 7.5cm', '1 tbsp', 'sprigs of fresh' ],
		category: 'Dessert'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Yaki Udon',
			image: 'https://www.themealdb.com/images/media/meals/wrustq1511475474.jpg',
			tags: 'LowCalorie',
			area: 'Japanese',
			alcoholic: null,
			instructions: 'Boil some water in a large saucepan. Add 250ml cold water and the udon noodles. (As they are so thick, adding cold water helps them to cook a little bit slower so the middle cooks through). If using frozen or fresh noodles, cook for 2 mins or until al dente; dried will take longer, about 5-6 mins. Drain and leave in the colander.\r\n' +
        'Heat 1 tbsp of the oil, add the onion and cabbage and sauté for 5 mins until softened. Add the mushrooms and some spring onions, and sauté for 1 more min. Pour in the remaining sesame oil and the noodles. If using cold noodles, let them heat through before adding the ingredients for the sauce – otherwise tip in straight away and keep stir-frying until sticky and piping hot. Sprinkle with the remaining spring onions.'
		},
		ingredients: [
			'Udon Noodles',
			'Sesame Seed Oil',
			'Onion',
			'Cabbage',
			'Shiitake Mushrooms',
			'Spring Onions',
			'Mirin',
			'Soy Sauce',
			'Caster Sugar',
			'Worcestershire Sauce'
		],
		amount: [
			'250g',     '2 tbs',
			'1 sliced', '0.25',
			'10',       '4',
			'4 tbsp',   '2 tbs',
			'1 tblsp ', '1 tblsp '
		],
		category: 'Vegetarian'
	},
	{
		recipeData: {
			recipe_type_id: 2,
			recipe_name: 'Roti john',
			image: 'https://www.themealdb.com/images/media/meals/hx335q1619789561.jpg',
			tags: '',
			area: 'Malaysian',
			alcoholic: null,
			instructions: 'Mix all the ingredients in a bowl.\r\n' +
        'Heat a pan or griddle with a little vegetable oil.\r\n' +
        'Pour the mixture onto the pan and place a piece of open-faced baguette on top.\r\n' +
        'Press on the bread with a spatula and grill for 2 minutes.\r\n' +
        'Turn the bread over to make it a little crispy.\r\n' +
        'Remove from pan and cut the bread into small portions.\r\n' +
        'Add mayonnaise and/or Sambal before cutting the sandwich (optional).'
		},
		ingredients: [
			'Minced Beef',
			'Onion',
			'Eggs',
			'Chilli',
			'Baguette',
			'Salt',
			'Pepper',
			'Mayonnaise'
		],
		amount: [
			'1/4 lb',   '1',
			'3',        '1 tbs',
			'1/2 ',     'To taste',
			'To taste', 'Top'
		],
		category: 'Beef'
	}
];