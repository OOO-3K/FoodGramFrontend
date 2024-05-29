import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Recipe from "../components/Recipe.jsx";
import { useParams } from "react-router";

export default function RecipePage({ loggedIn, setLoggedIn }) {
  const { recipeId } = useParams();

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Header>
      <Recipe recipeId={recipeId}></Recipe>
      <Footer></Footer>
    </>
  );
}
