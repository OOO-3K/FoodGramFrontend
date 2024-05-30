import axios from "axios";
import config from "/config.json";

export default async function getScoreGet(recipeId) {
  try {
    const response = await axios.get(
      `${config.server.address}api/recipes/scores/get/${recipeId}`
    );
    const post = response.data;

    return post;
  } catch (error) {
    console.error("Error fetching score:", error);
  }
}
