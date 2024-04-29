import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from 'C:\\Users\\andre\\Desktop\\FoodGramFrontend\\src\\components\\RecipeCard.jsx';

export default async function getRecipes() {
  try {
    const response = await axios.get('https://localhost:7242/api/Home/recipes');
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
    console.error('Error fetching recipes:', error);
    return <div>Error fetching recipes</div>;
  }
}
