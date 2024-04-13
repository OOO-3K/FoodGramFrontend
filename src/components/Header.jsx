import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <a href="">
          <h2>FoodGram</h2>
        </a>
        
        <input id="recipe-search-input" type="text" className="input-search" placeholder="Recipe search"></input>
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
