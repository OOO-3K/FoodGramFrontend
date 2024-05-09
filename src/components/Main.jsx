import { useState, useEffect } from "react";
import "./Main.css";
import getRecipes from "../api/getRecipes.jsx";
import SearchFilterTab from "./SearchFilterTab";

export default function Main({
  searchInput,
  filters,
  setFilters,
  showFiltersTab,
}) {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipes(searchInput, filters);
        if (data) {
          setRecipes(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchInput, filters]);

  return (
    <main className="Main">
      {showFiltersTab && (
        <SearchFilterTab
          filters={filters}
          setFilters={setFilters}
        ></SearchFilterTab>
      )}
      {recipes ? recipes : <div>Loading recipes...</div>}
    </main>
  );
}
