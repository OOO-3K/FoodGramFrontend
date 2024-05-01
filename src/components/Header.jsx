import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({setSearchInput}) {

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
          <button className="filter-button"></button>
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
