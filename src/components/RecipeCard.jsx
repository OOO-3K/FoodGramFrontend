import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getFavouritesIn from "../api/getFavouritesIn.jsx";
import getFavouritesAdd from "../api/getFavouritesAdd.jsx";
import getFavouritesDelete from "../api/getFavouritesDelete.jsx";
import getScoreGet from "../api/getScoreGet.jsx";
import getScoreSet from "../api/getScoreSet.jsx";
import recipeScoreModel from "./models/recipeScoreModel.jsx";
import "./RecipeCard.css";

export default function RecipeCard(recipe) {
  const ingredients = recipe.Ingredients || [];

  const [InFavourites, setInFavourites] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(null);

  const [userScore, setUserScore] = useState(null);
  const [userSetScore, setUserSetScore] = useState(() => {
    const recipe = new recipeScoreModel();
    return recipe;
  });
  const [toggleSetScore, setToggleSetScore] = useState(null);

  useEffect(() => {
    const fetchGetScore = async () => {
      try {
        const data = await getScoreGet(recipe.Id);
        setUserScore(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGetScore();
  }, []);

  useEffect(() => {
    const fetchSetScore = async () => {
      if (toggleSetScore == null) {
        return;
      }
      try {
        userSetScore.recipeId = recipe.Id;
        userSetScore.scoreValue = userScore;
        await getScoreSet(userSetScore);
        setToggleSetScore(null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSetScore();
  }, [toggleSetScore]);

  useEffect(() => {
    const fetchIsFavourite = async () => {
      try {
        const data = await getFavouritesIn(recipe.Id);
        if (data) {
          setInFavourites(true);
        } else {
          setInFavourites(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchIsFavourite();
  }, []);

  useEffect(() => {
    const fetchIsFavourite = async () => {
      if (toggleUpdate == null) {
        return;
      }
      try {
        if (InFavourites) {
          const data = await getFavouritesDelete(
            recipe.Id,
            InFavourites,
            setInFavourites
          );
        } else {
          const data = await getFavouritesAdd(
            recipe.Id,
            InFavourites,
            setInFavourites
          );
        }
        setToggleUpdate(null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIsFavourite();
  }, [toggleUpdate]);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <li key={recipe.Id} className="recipeCard">
      <Link to={`/recipes/${recipe.Id}`}>
        <h3 className="recipeCard-title">
          {capitalizeFirstLetter(recipe.Name)}
        </h3>
      </Link>
      {recipe.ImagePath && (
        <img
          src={recipe.ImagePath}
          alt={`Picture for ${recipe.Name} wasn't found.`}
          className="recipeCard-image"
        ></img>
      )}
      <p>{recipe.Description}</p>
      {InFavourites ? (
        <button
          className="favouritesButton"
          onClick={(e) => {
            e.preventDefault();
            setToggleUpdate(true);
          }}
        >
          Remove from favourites
        </button>
      ) : (
        <button
          className="favouritesButton"
          onClick={(e) => {
            e.preventDefault();
            setToggleUpdate(false);
          }}
        >
          Add to favourites
        </button>
      )}
      <p>
        <strong>Cooking Time</strong>: {recipe.CookingTime} min.
      </p>
      <p>
        <strong>Rating</strong>: {recipe.Rating ? recipe.Rating : "N/A"}
      </p>
      <p>
        <strong>Your rating:</strong>
        <input
          type="number"
          className="userScoreInput"
          value={userScore}
          min="0"
          max="10"
          onChange={(e) => {
            e.preventDefault();
            setUserScore(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.keyCode === 13) {
              e.preventDefault();
              setUserScore(e.target.value);
              setToggleSetScore(true);
            }
          }}
        />
      </p>
      <p>
        <strong>Ingredients</strong>:
      </p>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.Id}>
            {ingredient.Name} ({ingredient.Amount} {ingredient.Unit})
          </li>
        ))}
      </ul>
    </li>
  );
}
