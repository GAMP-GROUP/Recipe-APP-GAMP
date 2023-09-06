export const usersData = [
  {
    email: "alice@prisma.io",
    username: "Alice",
    password_hash: "12345678",
    nationality: "US",
  },
  {
    email: "bob@prisma.io",
    username: "bob",
    password_hash: "12345678",
    nationality: "BR",
  },
  {
    email: "michael@prisma.io",
    username: "michael",
    password_hash: "12345678",
    nationality: "NZ",
  },
];

export const ingredientsData = [
  {
    ingredients_name: "meat",
  },
  {
    ingredients_name: "potatoes",
  },
];

export const recipeTypesData = [
  {
    name: "drink",
  },
  {
    name: "meal"
  }
]

export const recipeData = [
  {       
    recipe_name: "Meat and Potatoes",
    instructions: "These instructions only apply at the land of hyrule, Put the slab of meat with some chopped potatoes on the pan and stir until you hear a trumpet sound, them serve, trying to break the number o chars of this field, can we see how much text it can hold?",
    image: "https://www.eatwell101.com/wp-content/uploads/2018/03/Garlic-Butter-flank-Steak-and-Potatoes-Skillet.jpg",
    tags: "meat, grilled, potato",
    video_source: "https://www.youtube.com/watch?v=mYfCrSdDAq4",
    area: "EU",
    alcoholic: null,
    recipe_type_id: 2,
  }
]

export const ingredientAmount = [
  {
    recipe_id: 1,
    ingredient_id: 1,
    ing_amount: "A Slab"
  },
  {
    recipe_id: 1,
    ingredient_id: 2,
    ing_amount: "Two whole"
  }
]

export const favorites = [
  {
    user_id: 1,
    recipe_id: 1,
  },
  {
    user_id: 2,
    recipe_id: 1,
  },
  {
    user_id: 3,
    recipe_id: 1,
  },
]

export const author = [
  {
    author_id: 1,
    recipe_id: 1,
  }
]