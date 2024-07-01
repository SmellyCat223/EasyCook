export interface Recipe {
    strMeal: string;
    strMealThumb: string;
    strArea?: string;
    strInstructions?: string;
    strYoutube?: string;
}

export interface Meal {
    Breakfast?: Recipe | null;
    Lunch?: Recipe | null;
    Dinner?: Recipe | null;
}

export interface MealPlan {
    Mon: Meal;
    Tues: Meal;
    Wed: Meal;
    Thurs: Meal;
    Fri: Meal;
    Sat: Meal;
    Sun: Meal;
}
