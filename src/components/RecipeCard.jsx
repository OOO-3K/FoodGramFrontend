import "./RecipeCard.css";

export default function RecipeCard(recipe) {

    const ingredients = recipe.Ingredients || [];

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    return (
        <li key={recipe.Id} className="recipeCard">
            <h3 className="recipeCard-title">{capitalizeFirstLetter(recipe.Name)}</h3>
            <p>{recipe.Description}</p>
            <p>Cooking Time: {recipe.CookingTime} min.</p>
            <p>Rating: {recipe.Rating ? recipe.Rating : 'N/A'}</p>
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
