import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({
  setSearchInput,
  setShowFiltersTab,
  showFiltersTab,
}) {
  const [style, setStyle] = useState("filter-button");

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <h2>FoodGram</h2>
        </Link>
        <div>
          <input
            id="recipe-search-input"
            type="text"
            className="input-search"
            placeholder="Recipe search"
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.keyCode === 13) {
                const recipeName = e.target.value.trim();

                setSearchInput(recipeName);
              }
            }}
          ></input>
          <button
            className={style}
            onClick={() => {
              setShowFiltersTab(!showFiltersTab);
              if (!showFiltersTab) {
                setStyle("filter-button-activated");
              } else {
                setStyle("filter-button");
              }
            }}
          ></button>
        </div>
        <ul>
          <a href="">
            <li>
              <h2>Settings</h2>
            </li>
          </a>
          <a href="">
            <li>
              <h2>Profile</h2>
            </li>
          </a>
        </ul>
      </nav>
    </header>
  );
}
