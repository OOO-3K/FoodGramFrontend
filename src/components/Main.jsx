import { useState, useEffect } from "react";
import "./Main.css";
import getRecipes from "../api/getRecipes.jsx";

export default function Main(searchInput) {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes(searchInput);
        if (data) {
          setRecipes(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchInput]);

  return (
    <main className="Main">
      {recipes ? recipes : <div>Loading recipes...</div>}
    </main>
  );
}
