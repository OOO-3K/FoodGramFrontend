import { useState } from "react";
import recipeFilterModel from "../components/models/recipeFilterModel.jsx";
import Main from "../components/Main.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function MainPage() {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState(() => {
    const recipeFilter = new recipeFilterModel();
    return recipeFilter;
  });
  const [showFiltersTab, setShowFiltersTab] = useState(false);

  return (
    <>
      <Header
        setSearchInput={setSearchInput}
        setShowFiltersTab={setShowFiltersTab}
        showFiltersTab={showFiltersTab}
      ></Header>
      <Main
        searchInput={searchInput}
        filters={filters}
        setFilters={setFilters}
        showFiltersTab={showFiltersTab}
      ></Main>
      <Footer></Footer>
    </>
  );
}
