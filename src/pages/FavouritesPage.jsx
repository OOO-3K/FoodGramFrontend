import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Favourites from "../components/Favourites.jsx";

export default function FavouritesPage({ loggedIn, setLoggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Header>
      <Favourites></Favourites>
      <Footer></Footer>
    </>
  );
}
