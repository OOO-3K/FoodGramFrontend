import { useState, useEffect } from "react";
import userDataModel from "./models/userDataModel.jsx";
import getLoggedIn from "../api/getLoggedIn.jsx";
import "./Main.css";

export default function Login({ loggedIn, setLoggedIn, setCookie }) {
  const [userData, setUserData] = useState(() => {
    const user = new userDataModel();
    return user;
  });

  const [updateLogIng, setUpdateLogIng] = useState();

  useEffect(() => {
    const fetchLogIn = async () => {
      try {
        if (
          userData.name == null ||
          userData.name == "" ||
          userData.password == null ||
          userData.password == ""
        ) {
          return;
        }
        const data = await getLoggedIn(setLoggedIn, userData, setCookie);
        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogIn();
  }, [updateLogIng]);

  return (
    <main className="Main">
      <div>
        <label for="username_input">Username</label>
        <input id="username_input" type="text"></input>
      </div>
      <div>
        <label for="password_input">Password</label>
        <input id="password_input" type="text"></input>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            userData.name = document.getElementById("username_input").value;
            userData.password = document.getElementById("password_input").value;
            setUpdateLogIng(!updateLogIng);
          }}
        >
          Log in
        </button>
      </div>
    </main>
  );
}
