import axios from "axios";
import config from "/config.json";

export default async function getLoggedIn(setLoggedIn, userData, setCookie) {
  try {
    const response = await axios.post(
      `${config.server.address}api/users/login/`,
      userData
    );
    if (response.status == 200) {
      setLoggedIn(true);
      return "Successfully logged in.";
    }
  } catch (error) {
    if (response.status == 401) {
      setLoggedIn(false);
      return "Incorrect username or password.";
    }
    console.error("Login request error:", error);
  }
}
