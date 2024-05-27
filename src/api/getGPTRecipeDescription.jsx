import axios from "axios";
import config from "/config.json";

export default async function getGPTRecipeDescription(
  recipeGPTDescriptionModel
) {
  try {
    const response = await axios.post(
      `${config.server_gpt.address}gemini/description/en/`,
      recipeGPTDescriptionModel, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    const post = response.data || [];

    return post;
  } catch (error) {
    console.error("Error fetching GPT description:", error);
  }
}
