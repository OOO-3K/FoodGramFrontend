import axios from "axios";
import config from "/config.json";

export default async function getFavouritesDelete(
  recipeId,
  inFavourites,
  setInFavourites
) {
  try {
    const response = await axios.delete(
      `${config.server.address}api/recipes/favourites/delete/${recipeId}`
    );
    const post = response.data;
    setInFavourites(!inFavourites);
  } catch (error) {
    console.error("Error fetching favourites in:", error);
  }
}
