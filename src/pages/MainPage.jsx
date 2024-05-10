import { useState } from "react";
import recipeFilterModel from "../components/models/recipeFilterModel.jsx";
import Main from "../components/Main.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function MainPage() {
  const [filters, setFilters] = useState(() => {
    const recipeFilter = new recipeFilterModel();
    return recipeFilter;
  });
  const [showFiltersTab, setShowFiltersTab] = useState(false);
  const [updateFilters, setUpdateFilters] = useState(false);

  return (
    <>
      <Header
        filters={filters}
        setFilters={setFilters}
        setShowFiltersTab={setShowFiltersTab}
        showFiltersTab={showFiltersTab}
        updateFilters={updateFilters}
        setUpdateFilters={setUpdateFilters}
      ></Header>
      <Main
        filters={filters}
        setFilters={setFilters}
        showFiltersTab={showFiltersTab}
        updateFilters={updateFilters}
        setUpdateFilters={setUpdateFilters}
      ></Main>
      <Footer></Footer>
    </>
  );
}
