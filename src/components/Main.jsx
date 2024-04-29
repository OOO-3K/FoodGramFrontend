import { useState, useEffect } from "react";
import "./Main.css";
import getRecipes from "C:\\Users\\andre\\Desktop\\FoodGramFrontend\\src\\api\\getRecipes.jsx";

export default function Main() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes();
        if (data) {
          setRecipes(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="Main">
      {recipes ? (
        recipes
      ) : (
        <div>Loading recipes...</div>
      )}
    </main>
  );
}
