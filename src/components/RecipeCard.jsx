import { Link } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard(recipe) {
  const ingredients = recipe.Ingredients || [];

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <li key={recipe.Id} className="recipeCard">
      <Link to={`/${recipe.Id}`}>
        <h3 className="recipeCard-title">
          {capitalizeFirstLetter(recipe.Name)}
        </h3>
      </Link>
      {recipe.ImagePath && <img src={recipe.ImagePath} alt={`Picture for ${recipe.Name} wasn't found.`} className="recipeCard-image"></img>}
      <p>{recipe.Description}</p>
      <p><strong>Cooking Time</strong>: {recipe.CookingTime} min.</p>
      <p><strong>Rating</strong>: {recipe.Rating ? recipe.Rating : "N/A"}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.Id}>
            {ingredient.Name} ({ingredient.Amount} {ingredient.Unit})
          </li>
        ))}
      </ul>
    </li>
  );
}
