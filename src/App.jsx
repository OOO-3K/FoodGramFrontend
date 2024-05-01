import "./App.css";
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import MainPage from "./pages/MainPage.jsx";
import RecipePage from "./pages/RecipePage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:recipeId" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}
