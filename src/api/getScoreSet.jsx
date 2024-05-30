import axios from "axios";
import config from "/config.json";

export default async function getScoreSet(recipeScoreModel) {
  try {
    const response = await axios.post(
      `${config.server.address}api/recipes/scores/set/`,
      recipeScoreModel
    );
  } catch (error) {
    console.error("Error fetching set score:", error);
  }
}
