import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard.jsx";
import config from "/config.json";

export default async function getRecipes(filters) {
  if (filters.name != null && filters.name == "") {
    filters.name = null;
  }
  if (filters.ratingFrom != null && filters.ratingFrom == "") {
    filters.ratingFrom = null;
  }
  if (filters.ratingTo != null && filters.ratingTo == "") {
    filters.ratingTo = null;
  }
  if (filters.cookingTimeFrom != null && filters.cookingTimeFrom == "") {
    filters.cookingTimeFrom = null;
  }
  if (filters.cookingTimeTo != null && filters.cookingTimeTo == "") {
    filters.cookingTimeTo = null;
  }
  try {
    const response = await axios.get(
      `${config.server.address}api/Home/recipes/`,
      {
        params: {
          name: filters.name,
          ratingFrom: filters.ratingFrom,
          ratingTo: filters.ratingTo,
          cookingTimeFrom: filters.cookingTimeFrom,
          cookingTimeTo: filters.cookingTimeTo,
          ingredients: JSON.stringify(filters.ingredients),
        },
      }
    );
    const posts = response.data || [];

    return (
      <ul>
        {posts.map((post) => {
          if (post) {
            return <RecipeCard {...post} key={post.Id} />;
          }
          return null;
        })}
      </ul>
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return <div>Error fetching recipes</div>;
  }
}
