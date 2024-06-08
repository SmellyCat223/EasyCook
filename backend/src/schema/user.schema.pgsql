CREATE SCHEMA users;

CREATE TABLE users.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNo INT NOT NULL
    profilePicture VARCHAR(300)
);

CREATE TABLE users.ingredientCategory (
    ingredientCategoryID SERIAL PRIMARY KEY,
    ingredientCategoryName VARCHAR(100) NOT NULL
);

CREATE TABLE users.ingredient (
    ingredientID SERIAL PRIMARY KEY,
    FOREIGN KEY (ingredientCategoryID) REFRENCES users.ingredientCategory(ingredientCategoryID),
    ingredientName VARCHAR(100) NOT NULL,
    ingredientCalories DOUBLE NOT NULL
);

CREATE TABLE users.inventory (
    inventoryID SERIAL PRIMARY KEY,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    totalNo INT NOT NULL,
    expiredNo INT NOT NULL,
    wastagePercentage DOUBLE NOT NULL
);

CREATE TABLE users.shoppingList (
    shoppingListID SERIAL PRIMARY KEY,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    dateTimeGenerated DATETIME NOT NULL
);

CREATE TABLE users.item (
    itemID SERIAL PRIMARY KEY,
    FOREIGN KEY (ingredientID) REFERENCES users.ingredient(ingredientID),
    FOREIGN KEY (inventoryID) REFERENCES users.inventory(inventoryID),
    FOREIGN KEY (shoppingListID) REFERENCES users.inventory(shoppingListID),
    itemQuantity DOUBLE NOT NULL,
    expirationDate DATE,
    purchaseDate DATE,
    mfg DATE
);

CREATE TABLE users.recipeCategory (
    recpieCategoryID SERIAL PRIMARY KEY,
    recipeCategoryName VARCHAR(100) NOT NULL
);

CREATE TABLE users.recipe (
    recipeID SERIAL PRIMARY KEY,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    FOREIGN KEY (recipeCategoryID) REFERENCES users.recipeCategory(recipeCategoryID),
    recipeName VARCHAR(100) NOT NULL,
    recipePicture VARCHAR(300) NOT NULL,
    recipeDescription VARCHAR(300) NOT NULL,
    recipeCalories DOUBLE NOT NULL
);

CREATE TABLE users.recupeIngredient (
    FOREIGN KEY (recipeID) REFERENCES users.recipe(recipeID),
    FOREIGN KEY (ingredientID) REFERENCES users.ingredient(ingredientID),
    ingredientQuantity DOUBLE NOT NULL,
    measurementUnit VARCHAR(5) NOT NULL
);

CREATE TABLE users.meal (
    mealID SERIAL PRIMARY KEY,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    mealDate DATE NOT NULL,
    mealType VARCHAR(50) NOT NULL,
    mealCalories DOUBLE NOT NULL
);

CREATE TABLE users.mealIngredient (
    FOREIGN KEY (mealID) REFERENCES users.meal(mealID),
    FOREIGN KEY (ingredientID) REFERENCES users.ingredient(ingredientID),
    portionNo DOUBLE NOT NULL,
);