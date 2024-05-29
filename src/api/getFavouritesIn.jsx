import axios from "axios";
import config from "/config.json";

export default async function getFavouritesIn(recipeId) {
  try {
    const response = await axios.get(
      `${config.server.address}api/recipes/favourites/in/${recipeId}`
    );
    const post = response.data;

    return post;
  } catch (error) {
    console.error("Error fetching favourites in:", error);
  }
}
