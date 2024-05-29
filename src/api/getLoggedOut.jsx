import axios from "axios";
import config from "/config.json";

export default async function getLoggedIn(setLoggedIn, cookie) {
  try {
    const response = await axios.post(
      `${config.server.address}api/users/logout/`,
      { withCredentials: true }
    );
    if (response.status == 200) {
      setLoggedIn(false);
      return "Successfully logged out.";
    }
  } catch (error) {
    console.error("Logout request error:", error);
  }
}
