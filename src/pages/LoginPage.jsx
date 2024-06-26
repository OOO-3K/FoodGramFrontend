import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Login from "../components/Login.jsx";

export default function LoginPage({ loggedIn, setLoggedIn, setCookie }) {
  return (
    <>
      <Header></Header>
      <Login
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setCookie={setCookie}
      ></Login>
      <Footer></Footer>
    </>
  );
}
