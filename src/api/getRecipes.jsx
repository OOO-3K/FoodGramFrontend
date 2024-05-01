import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard.jsx';
import config from '/config.json';

export default async function getRecipes() {
  try {
    
    const response = await axios.get(`${config.server.address}api/Home/recipes`);
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
