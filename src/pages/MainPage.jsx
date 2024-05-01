import { useState } from "react";

import Main from "../components/Main.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function MainPage() {

  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <Header setSearchInput={setSearchInput}></Header>
      <Main searchInput={searchInput}></Main>
      <Footer></Footer>
    </>
  );
}
