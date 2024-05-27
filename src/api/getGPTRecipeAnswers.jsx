import axios from "axios";
import config from "/config.json";

export default async function getGPTRecipeAnswers(
  recipeGPTAnswersModel
) {
  try {
    const response = await axios.post(
      `${config.server_gpt.address}gemini/answers/en/`,
      recipeGPTAnswersModel, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    const post = response.data || [];

    return post;
  } catch (error) {
    console.error("Error fetching GPT answers:", error);
  }
}
