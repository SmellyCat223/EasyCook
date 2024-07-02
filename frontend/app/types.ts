export type Profile = {
    id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    profile_picture?: string;
}

export type IngredientCategory = {
    ingredient_category_id: string;
    ingredient_category_name: string;
}

export type Ingredient = {
    ingredient_id: string;
    ingredient_category_id: number;
    ingredient_name: string;
    ingredient_calories: number;
}

export type Inventory = {
    inventory_id: string;
    user_id: string;
    total_no: number;
    expired_no: number;
    wastage_percentage: number;
}

export type ShoppingList = {
    shopping_list_id: string;
    user_id: string;
    date_time_generated: string; // use string type for TIMESTAMP
}

export type Item = {
    item_id: string;
    item_name: string,
    ingredient_id?: string;
    item_inventory_id?: string;
    item_shopping_list_id?: string; // make it optional
    item_quantity: number;
    expiration_date?: string; // use string type for DATE
    purchase_date?: string; // use string type for DATE
    mfg?: string; // use string type for DATE
    user_id: string;
}

export type RecipeCategory = {
    recipe_category_id: string;
    recipe_category_name: string;
}

export type Recipe = {
    recipe_id: number;
    user_id: string;
    recipe_category_id: number;
    recipe_name: string;
    recipe_picture: string;
    recipe_description: string;
    recipe_calories: number;
}

export type RecipeIngredient = {
    recipe_id: number;
    ingredient_id: number;
    ingredient_quantity: number;
    measurement_unit: string;
}

export type Meal = {
    meal_id: number;
    user_id: string;
    meal_date: string; // use string type for DATE
    meal_type: string;
    meal_calories: number;
}

export type MealIngredient = {
    meal_id: number;
    ingredient_id: number;
    portion_no: number;
}
