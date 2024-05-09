import "./RecipeCard.css";

export default function RecipeCardWithSteps(recipe) {
  const ingredients = recipe.Ingredients || [];
  const steps = recipe.RecipeSteps || [];

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <ul>
      <li key={recipe.Id} className="recipeCard">
        <h3 className="recipeCard-title">
          {capitalizeFirstLetter(recipe.Name)}
        </h3>
        {recipe.ImagePath && (
          <img
            src={recipe.ImagePath}
            alt={`Picture for ${recipe.Name} wasn't found.`}
            className="recipeCard-image"
          ></img>
        )}
        <p>{recipe.Description}</p>
        <p>
          <strong>Cooking Time</strong>: {recipe.CookingTime} min.
        </p>
        <p>
          <strong>Rating</strong>: {recipe.Rating ? recipe.Rating : "N/A"}
        </p>
        <p>
          <strong>Ingredients</strong>:
        </p>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.Id}>
              {ingredient.Name} ({ingredient.Amount} {ingredient.Unit})
            </li>
          ))}
        </ul>
      </li>
      <ul>
        {steps.map((step) => (
          <li key={step.Id} className="recipeCard">
            <h3 className="recipeCard-title">
              {step.StepNumber}. {capitalizeFirstLetter(step.Name)}
            </h3>
            {step.ImagePath && (
              <img
                src={step.ImagePath}
                alt={`Picture for ${step.Name} wasn't found.`}
                className="recipeCard-image"
              ></img>
            )}
            <p>{step.Description}</p>
            <p>
              <strong>Cooking Time</strong>: {step.CookingTime} min.
            </p>
          </li>
        ))}
      </ul>
    </ul>
  );
}
