import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard.jsx";
import config from "/config.json";

export default async function getRecipes(searchInput, filters) {
  try {
    const response = await axios.get(
      `${config.server.address}api/Home/recipes`
    );
    const posts = response.data || [];

    return (
      <ul>
        {posts.map((post) => {
          if (post) {
            if (
              searchInput == "" ||
              (searchInput != "" &&
                post.Name.toString()
                  .toLowerCase()
                  .includes(searchInput.toString().toLowerCase()))
            ) {
              if (
                filters.ratingFrom == null ||
                filters.ratingFrom == "" ||
                (filters.ratingFrom != null &&
                  post.Rating >= filters.ratingFrom)
              ) {
                if (
                  filters.ratingTo == null ||
                  filters.ratingTo == "" ||
                  (filters.ratingTo != null && post.Rating <= filters.ratingTo)
                ) {
                  if (
                    filters.cookingTimeFrom == null ||
                    filters.cookingTimeFrom == "" ||
                    (filters.cookingTimeFrom != null &&
                      post.CookingTime >= filters.cookingTimeFrom)
                  ) {
                    if (
                      filters.cookingTimeTo == null ||
                      filters.cookingTimeTo == "" ||
                      (filters.cookingTimeTo != null &&
                        post.CookingTime <= filters.cookingTimeTo)
                    ) {
                      if (
                        filters.ingredients.length == 0 ||
                        (filters.ingredients.length == 1 &&
                          filters.ingredients[0] == "") ||
                        filters.ingredients.every((ingredient) =>
                          post.Ingredients.some((x) =>
                            x.Name.toString()
                              .toLowerCase()
                              .includes(
                                ingredient.toString().toLowerCase().trim()
                              )
                          )
                        )
                      ) {
                        return <RecipeCard {...post} key={post.Id} />;
                      }
                    }
                  }
                }
              }
            }
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
