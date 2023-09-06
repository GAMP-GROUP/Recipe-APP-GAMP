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
    ingredients_name: "potato",
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
    description: "A slab of meat with potatoes",
    recipe_type_id: 2,
    author_id: 1,
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