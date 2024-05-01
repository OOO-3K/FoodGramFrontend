import { useState, useEffect } from "react";
import "./Main.css";
import getRecipeById from "../api/getRecipeById.jsx";

export default function Recipe({recipeId}) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeById(recipeId);
        if (data) {
          setRecipe(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="Main">
      {recipe ? (
        recipe
      ) : (
        <div>Loading recipe...</div>
      )}
    </main>
  );
}
