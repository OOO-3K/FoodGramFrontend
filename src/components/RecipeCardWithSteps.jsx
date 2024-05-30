import "./RecipeCard.css";
import "./RecipeCardWithSteps.css";
import { useState, useEffect } from "react";
import recipeGPTDescription from "./models/recipeGPTDescription.jsx";
import recipeGPTAnswers from "./models/recipeGPTAnswers.jsx";
import getGPTRecipeDescription from "../api/getGPTRecipeDescription.jsx";
import getGPTRecipeQuestions from "../api/getGPTRecipeQuestions.jsx";
import getGPTRecipeAnswers from "../api/getGPTRecipeAnswers.jsx";
import getFavouritesIn from "../api/getFavouritesIn.jsx";
import getFavouritesAdd from "../api/getFavouritesAdd.jsx";
import getFavouritesDelete from "../api/getFavouritesDelete.jsx";
import getScoreGet from "../api/getScoreGet.jsx";
import getScoreSet from "../api/getScoreSet.jsx";
import recipeScoreModel from "./models/recipeScoreModel.jsx";

export default function RecipeCardWithSteps(recipe) {
  const [recipeModel, setRecipeModel] = useState(() => {
    const recipe = new recipeGPTDescription();
    return recipe;
  });
  const [recipeAnswerModel, setRecipeAnswerModel] = useState(() => {
    const recipe = new recipeGPTAnswers();
    return recipe;
  });
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeQuestions, setRecipeQuestions] = useState("");
  const [recipeAnswers, setRecipeAnswers] = useState("");

  const [toggleAnswers, setToggleAnswers] = useState(false);

  const [currentStep, setCurrentStep] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const ingredients = recipe.Ingredients || [];
  const steps = recipe.RecipeSteps || [];

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

  useEffect(() => {
    const fetchDataDescription = async () => {
      try {
        recipeModel.recipe_name = recipe.Name;
        recipeModel.time = recipe.CookingTime;
        recipeModel.ingredients = JSON.stringify(
          ingredients.map((ingredient) => ingredient.Name)
        );
        recipeModel.steps = JSON.stringify(steps.map((step) => step.Name));
        if (steps.length == 0) recipeModel.steps = JSON.stringify("no data");
        if (
          recipeModel.recipe_name == null ||
          recipeModel.time == null ||
          recipeModel.ingredients.length === 0 ||
          recipeModel.steps.length === 0
        ) {
          return;
        }
        const data = await getGPTRecipeDescription(recipeModel);
        if (data) {
          setRecipeDescription(data.description);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataQuestions = async () => {
      try {
        recipeModel.recipe_name = recipe.Name;
        recipeModel.time = recipe.CookingTime;
        recipeModel.ingredients = JSON.stringify(
          ingredients.map((ingredient) => ingredient.Name)
        );
        recipeModel.steps = JSON.stringify(steps.map((step) => step.Name));
        if (
          recipeModel.recipe_name == null ||
          recipeModel.time == null ||
          recipeModel.ingredients.length === 0 ||
          recipeModel.steps.length === 0
        ) {
          return;
        }
        const data = await getGPTRecipeQuestions(recipeModel);
        if (data) {
          setRecipeQuestions(data.questions);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataDescription();
    fetchDataQuestions();
  }, []);

  useEffect(() => {
    const fetchDataAnswers = async () => {
      try {
        recipeAnswerModel.recipe_name = recipe.Name;
        recipeAnswerModel.time = recipe.CookingTime;
        recipeAnswerModel.ingredients = JSON.stringify(
          ingredients.map((ingredient) => ingredient.Name)
        );
        recipeAnswerModel.steps = JSON.stringify(
          steps.map((step) => step.Name)
        );
        recipeAnswerModel.step_num = currentStep + 1;
        recipeAnswerModel.question = currentQuestion;
        if (
          recipeAnswerModel.recipe_name == null ||
          recipeAnswerModel.time == null ||
          recipeAnswerModel.ingredients.length === 0 ||
          recipeAnswerModel.steps.length === 0 ||
          recipeAnswerModel.step_num === null ||
          recipeAnswerModel.question === null
        ) {
          return;
        }
        const data = await getGPTRecipeAnswers(recipeAnswerModel);
        if (data) {
          setRecipeAnswers(data.answer);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAnswers();
  }, [toggleAnswers]);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <ul>
      <li key={recipe.Id} className="recipeCard">
        <h3 className="recipeCard-title">
          {capitalizeFirstLetter(recipe.Name)}
        </h3>
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
          {recipeDescription ? (
            <div>
              <strong>
                GPT Description:<br></br>
              </strong>
              <div style={{ padding: "0px 10px" }}>{recipeDescription}</div>
            </div>
          ) : (
            ""
          )}
        </p>
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
      <ul>
        {steps.map((step, index) => (
          <li key={step.Id} className="recipeCard">
            <h3 className="recipeCard-title">
              {step.StepNumber}. {capitalizeFirstLetter(step.Name)}
            </h3>
            {step.ImagePath && (
              <img
                src={step.ImagePath}
                alt={`Picture for ${step.Name} wasn't found.`}
                className="recipeCard-image"
              ></img>
            )}
            <p>{step.Description}</p>
            <p>
              <strong>Cooking Time</strong>: {step.CookingTime} min.
            </p>
            <div>
              {recipeQuestions[index] ? (
                <div>
                  <strong>
                    GPT Questions:<br></br>
                  </strong>
                  <div style={{ padding: "0px 10px" }}>
                    <ul>
                      {recipeQuestions[index]?.map((question) => (
                        <li>
                          <button
                            className="buttonQuestion"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentQuestion(question);
                              setCurrentStep(index);
                              setToggleAnswers(!toggleAnswers);
                              setRecipeAnswers("");
                            }}
                          >
                            {question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {currentStep == index ? (
              <input
                type="text"
                className="inputQuestion"
                placeholder="Write your question here"
                onKeyUp={(e) => {
                  if (e.key === "Enter" || e.keyCode === 13) {
                    const yoursQuestion = e.target.value.trim();

                    if (yoursQuestion.length > 0) {
                      setCurrentQuestion(yoursQuestion);
                      setCurrentStep(index);
                      setToggleAnswers(!toggleAnswers);
                      setRecipeAnswers("");
                    }
                  }
                }}
              ></input>
            ) : (
              <input
                type="text"
                className="inputQuestion"
                placeholder="Write your question here"
                onKeyUp={(e) => {
                  if (e.key === "Enter" || e.keyCode === 13) {
                    const yoursQuestion = e.target.value.trim();

                    if (yoursQuestion.length > 0) {
                      setCurrentQuestion(yoursQuestion);
                      setCurrentStep(index);
                      setToggleAnswers(!toggleAnswers);
                      setRecipeAnswers("");
                    }
                  }
                }}
              ></input>
            )}
            {currentStep == index ? (
              <div>
                <strong>
                  GPT Answer:<br></br>
                </strong>
                <div style={{ padding: "0px 10px" }}>{recipeAnswers}</div>
              </div>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </ul>
  );
}
