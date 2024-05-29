import { useState, useEffect } from "react";
import "./Main.css";
import getFavourites from "../api/getFavourites.jsx";

export default function Favourites() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFavourites();
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
      {recipes ? recipes : <div>Loading favourites...</div>}
    </main>
  );
}
