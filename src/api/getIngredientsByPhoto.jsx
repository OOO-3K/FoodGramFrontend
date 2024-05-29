import axios from "axios";
import config from "/config.json";

export default async function getIngredientsByPhoto(file) {
  try {
    const response = await axios.post(
      `${config.server_detector.address}detector/`,
      file,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    const post = response.data || [];

    return post;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return <div>Error fetching ingredients</div>;
  }
}
