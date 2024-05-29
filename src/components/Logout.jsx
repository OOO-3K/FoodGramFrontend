import { useState, useEffect } from "react";
import getLoggedOut from "../api/getLoggedOut.jsx";
import "./Main.css";

export default function Logout({ loggedIn, setLoggedIn, cookie }) {
  const [updateLogOut, setUpdateLogOut] = useState();

  useEffect(() => {
    const fetchLogOut = async () => {
      try {
        const data = await getLoggedOut(setLoggedIn, cookie);
        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogOut();
  }, [updateLogOut]);

  return (
    <main className="Main">
      <div>Are you sure, that you want to log out?</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setUpdateLogOut(!updateLogOut);
        }}
      >
        Yes
      </button>
    </main>
  );
}
