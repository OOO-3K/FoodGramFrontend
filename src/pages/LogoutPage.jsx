import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Logout from "../components/Logout.jsx";

export default function LogoutPage({ loggedIn, setLoggedIn, cookie }) {
  return (
    <>
      <Header></Header>
      <Logout
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        cookie={cookie}
      ></Logout>
      <Footer></Footer>
    </>
  );
}
