import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCardWithSteps from "../components/RecipeCardWithSteps.jsx";
import config from "/config.json";

export default async function getRecipeById(recipeId) {
  try {
    const response = await axios.get(
      `${config.server.address}api/Home/recipes/${recipeId}`
    );
    const post = response.data || [];

    return <RecipeCardWithSteps {...post} key={post.Id}></RecipeCardWithSteps>;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return <div>Error fetching recipes</div>;
  }
}
