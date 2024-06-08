CREATE SCHEMA users;

CREATE TABLE users.users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNo VARCHAR(12) NOT NULL,
    profilePicture VARCHAR(300)
);

CREATE TABLE users.ingredientCategory (
    ingredientCategoryID SERIAL PRIMARY KEY,
    ingredientCategoryName VARCHAR(100) NOT NULL
);

CREATE TABLE users.ingredient (
    ingredientID SERIAL PRIMARY KEY,
    ingredientCategoryID INT NOT NULL,
    ingredientName VARCHAR(100) NOT NULL,
    ingredientCalories INT NOT NULL,
    FOREIGN KEY (ingredientCategoryID) REFERENCES users.ingredientCategory(ingredientCategoryID)
);

CREATE TABLE users.inventory (
    inventoryID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    totalNo INT NOT NULL,
    expiredNo INT NOT NULL,
    wastagePercentage INT NOT NULL
);

CREATE TABLE users.shoppingList (
    shoppingListID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    dateTimeGenerated TIMESTAMP NOT NULL
);

CREATE TABLE users.item (
    itemID SERIAL PRIMARY KEY,
    ingredientID INT NOT NULL,
    inventoryID INT NOT NULL,
    shoppingListID INT,
    FOREIGN KEY (ingredientID) REFERENCES users.ingredient(ingredientID),
    FOREIGN KEY (inventoryID) REFERENCES users.inventory(inventoryID),
    FOREIGN KEY (shoppingListID) REFERENCES users.shoppingList(shoppingListID),
    itemQuantity INT NOT NULL,
    expirationDate DATE,
    purchaseDate DATE,
    mfg DATE
);

CREATE TABLE users.recipeCategory (
    recipeCategoryID SERIAL PRIMARY KEY,
    recipeCategoryName VARCHAR(100) NOT NULL
);

CREATE TABLE users.recipe (
    recipeID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    recipeCategoryID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    FOREIGN KEY (recipeCategoryID) REFERENCES users.recipeCategory(recipeCategoryID),
    recipeName VARCHAR(100) NOT NULL,
    recipePicture VARCHAR(300) NOT NULL,
    recipeDescription VARCHAR(300) NOT NULL,
    recipeCalories INT NOT NULL
);

CREATE TABLE users.recipeIngredient (
    recipeID INT NOT NULL,
    ingredientID INT NOT NULL,
    FOREIGN KEY (recipeID) REFERENCES users.recipe(recipeID),
    FOREIGN KEY (ingredientID) REFERENCES users.ingredient(ingredientID),
    ingredientQuantity INT NOT NULL,
    measurementUnit VARCHAR(5) NOT NULL
);

CREATE TABLE users.meal (
    mealID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users.users(userID),
    mealDate DATE NOT NULL,
    mealType VARCHAR(50) NOT NULL,
    mealCalories INT NOT NULL
);

CREATE TABLE users.mealIngredient (
    mealID INT NOT NULL,
    ingredientID INT NOT NULL,
    FOREIGN KEY (mealID) REFERENCES users.meal(mealID),
    FOREIGN KEY (ingredientID) REFERENCES users.ingredient(ingredientID),
    portionNo INT NOT NULL
);