/**
 * COMP
 */

import { useState } from 'react';

function AddEditRecipeForm({ handleAddRecipe }) {
  // handleAddRecipe refers to the attribute in the App.js where this component is called for.
  // by doing so, the handleAddRecipe on its turn calls the function handleAddRecipe defined in App.js

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [directions, setDirections] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');

  function handleRecipeFormSubmit(e) {
    console.log('this is the start of handle recipe from submit');
    // preventing the form from being submitted to a server
    e.preventDefault();

    // checking whether the ingredients is present
    if (ingredients.length === 0) {
      alert('a recipe requires an ingredient....!');
      return;
    }

    // isPublished as boolean, whether the recipe has been published already
    const isPublished = new Date(publishDate) <= new Date() ? true : false;

    // wrap all the data in a recipe object
    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
    };

    handleAddRecipe(newRecipe);
  }

  function handleAddIngredient(e) {
    console.log('adding an ingerdient ... !');
    // For adding an ingredient, either the button is used or the enter-key (onKeyPress)
    // If there is a key pressed AND it is NOT the enter-key => return is called,
    // such preventing from other keys to initiate this entire function
    // THIS WOULD MEAN DURING TYPING ANYTHING (BUT THE ENTER), THIS FUNCTION LOOPS
    // THE RETURN - AND BECAUSE OF CHANGING STATE - IN INPUT THE TARGET FIELD
    if (e.key && e.key !== 'Enter') {
      return;
    }
    // preventing the form from being submitted to a server
    e.preventDefault();

    // checking whether the ingredientName is filled other than ""
    if (!ingredientName) {
      alert('please give us an ingredient....');
      return;
    }

    // in state ingredients, create a new [], put in all existing ingredients and add the
    // ingredientName (by user) to the newly [].
    // next use that newly formed [], and put it in the ingredients list.
    setIngredients([...ingredients, ingredientName]);

    // set the ingredientName to empty, so new state can be used for new input
    setIngredientName('');
    console.log('end of adding an ingerdient ... !');
  }

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      <h2>Add a new Recipe</h2>
      <div className="top-form-section">
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe Name:
            <input
              type="text"
              required
              // state of name
              value={name}
              // when changing, the event happens that setName takes up the name
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="recipe-label input-label">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
              aria-required
            >
              <option value=""></option>
              <option value="breadsSandwichesAndPizza">
                Breads, Sandwiches and Pizza
              </option>
              <option value="eggsAndBreakfast"> Eggs & Breakfast</option>
              <option value="dessertsAndBakedGoods">
                Desserts & Baked Goods
              </option>
              <option value="fishAndSeafood">Fish & Seafood</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>
          <label className="recipe-label input-label">
            Directions:
            <textarea
              required
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="input-text directions"
            ></textarea>
          </label>
          <label className="recipe-label input-label">
            Publish Date:
            <input
              type="date"
              required
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="input-text"
            />
          </label>
        </div>
      </div>
      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingedients</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* if there are ingredients and [] is not 0 => true =>
            map through the ingrdients (In React Native: List or Flash) =>
            for each ingredient a tablerow is created with table data*/}
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient) => {
                  return (
                    <tr key={ingredient}>
                      <td className="table-data text-center">{ingredient}</td>
                      <td className="ingredient-delete-box">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                          // onClick={() => handleDeleteIngredient(ingredient)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {/* conditional returning UI, within form, blow the table */}
        {ingredients && ingredients.length === 0 ? (
          <h3 className="text-center no-ingredients">
            No Ingredients Added Yet
          </h3>
        ) : null}
        <div className="ingredient-form">
          <label className="ingredient-label">
            Ingredient:
            <input
              input="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              className="input-text"
              placeholder="eg. 1 cup of sugar"
              onKeyPress={handleAddIngredient}
            />
          </label>
          <button
            type="button"
            className="primary-button add-ingredient-button"
            onClick={handleAddIngredient}
          >
            Add ingredient
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="button" className="primary-button action-button">
          Create Recipe
        </button>
      </div>
    </form>
  );
}

export default AddEditRecipeForm;
