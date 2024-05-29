import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [cookie, setCookie] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/recipes/:recipeId"
          element={<RecipePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/recipes/favourites"
          element={
            <FavouritesPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setCookie={setCookie}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <LogoutPage
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              cookie={cookie}
            />
          }
        />
      </Routes>
    </Router>
  );
}
