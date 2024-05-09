import { useState } from "react";
import "./SearchFilterTab.css";

export default function SearchFilterTab({ filters, setFilters }) {
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
    setFilters({ ...filters, ingredients: ingredients });
  };

  const removeIngredient = (e) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      const newArray = [...ingredients];
      newArray.splice(newArray.length - 1, 1);
      setIngredients(newArray);
      setFilters({ ...filters, ingredients: ingredients });
    }
  };

  return (
    <form className="searchFilterTabCard">
      <div>
        <h3>Rating</h3>
        <input
          type="number"
          placeholder="From"
          onChange={(e) =>
            setFilters({ ...filters, ratingFrom: e.target.value })
          }
        ></input>
        <input
          type="number"
          placeholder="To"
          onChange={(e) => setFilters({ ...filters, ratingTo: e.target.value })}
        ></input>
      </div>
      <div>
        <h3>Cooking time</h3>
        <input
          type="number"
          placeholder="From"
          onChange={(e) =>
            setFilters({ ...filters, cookingTimeFrom: e.target.value })
          }
        ></input>
        <input
          type="number"
          placeholder="To"
          onChange={(e) =>
            setFilters({ ...filters, cookingTimeTo: e.target.value })
          }
        ></input>
      </div>
      <div>
        <h3>Ingredients</h3>
        <button onClick={(e) => removeIngredient(e)}>Remove Ingredient</button>
        <button onClick={(e) => addIngredient(e)}>Add Ingredient</button>
        {ingredients.map((ingredient, index) => (
          <div>
            <input
              type="text"
              name={`ingredients[${index}]`}
              value={ingredient}
              onChange={(e) => {
                const updatedIngredients = [...ingredients];
                updatedIngredients[index] = e.target.value;
                setIngredients(updatedIngredients);
                setFilters({ ...filters, ingredients: ingredients });
              }}
            ></input>
          </div>
        ))}
      </div>
    </form>
  );
}
