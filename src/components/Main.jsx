import { useState, useEffect } from "react";
import "./Main.css";
import getRecipes from "../api/getRecipes.jsx";
import SearchFilterTab from "./SearchFilterTab";

export default function Main({
  filters,
  setFilters,
  showFiltersTab,
  updateFilters,
  setUpdateFilters,
}) {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes(filters);
        if (data) {
          setRecipes(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [updateFilters]);

  return (
    <main className="Main">
      {showFiltersTab && (
        <SearchFilterTab
          filters={filters}
          setFilters={setFilters}
          updateFilters={updateFilters}
          setUpdateFilters={setUpdateFilters}
        ></SearchFilterTab>
      )}
      {recipes ? recipes : <div>Loading recipes...</div>}
    </main>
  );
}
