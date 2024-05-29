import axios from "axios";
import config from "/config.json";

export default async function getFavouritesAdd(
  recipeId,
  inFavourites,
  setInFavourites
) {
  try {
    const response = await axios.put(
      `${config.server.address}api/recipes/favourites/add/${recipeId}`
    );
    const post = response.data;
    setInFavourites(!inFavourites);
  } catch (error) {
    console.error("Error fetching favourites in:", error);
  }
}
