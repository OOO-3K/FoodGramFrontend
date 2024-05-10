import "./SearchFilterTab.css";

export default function SearchFilterTab({
  filters,
  setFilters,
  updateFilters,
  setUpdateFilters,
}) {
  const addIngredient = (e) => {
    e.preventDefault();
    if (filters.ingredients.length < 10) {
      setFilters({ ...filters, ingredients: [...filters.ingredients, ""] });
    }
  };

  const removeIngredient = (e) => {
    e.preventDefault();
    if (filters.ingredients.length > 0) {
      const newArray = [...filters.ingredients];
      newArray.splice(newArray.length - 1, 1);
      setFilters({ ...filters, ingredients: newArray });
    }
  };

  return (
    <form className="searchFilterTabCard">
      <div>
        <h3>Rating</h3>
        <input
          type="number"
          placeholder="From"
          className="searchFilterInput"
          min={0}
          max={10}
          onChange={(e) =>
            setFilters({ ...filters, ratingFrom: e.target.value })
          }
        ></input>
        <input
          type="number"
          placeholder="To"
          min={0}
          max={10}
          className="searchFilterInput"
          onChange={(e) => setFilters({ ...filters, ratingTo: e.target.value })}
        ></input>
      </div>
      <div>
        <h3>Cooking time</h3>
        <input
          type="number"
          placeholder="From"
          className="searchFilterInput"
          min={0}
          onChange={(e) =>
            setFilters({ ...filters, cookingTimeFrom: e.target.value })
          }
        ></input>
        <input
          type="number"
          placeholder="To"
          className="searchFilterInput"
          min={0}
          onChange={(e) =>
            setFilters({ ...filters, cookingTimeTo: e.target.value })
          }
        ></input>
      </div>
      <div>
        <h3>Ingredients</h3>
        <button
          className="searchFilterIngredientButton"
          onClick={(e) => removeIngredient(e)}
        >
          Remove Ingredient
        </button>
        <button
          className="searchFilterIngredientButton"
          onClick={(e) => addIngredient(e)}
        >
          Add Ingredient
        </button>
        <div>
          {filters.ingredients.map((ingredient, index) => (
            <>
              {index % 2 === 0 ? (
                <>
                  <div></div>
                </>
              ) : (
                <></>
              )}
              <input
                type="text"
                name={`ingredients[${index}]`}
                key={`ingredients[${index}]`}
                value={ingredient === null ? "" : ingredient}
                className="searchFilterInput"
                onChange={(e) => {
                  const updatedIngredients = [...filters.ingredients];
                  updatedIngredients[index] =
                    e.target.value === null ? "" : e.target.value;
                  setFilters({ ...filters, ingredients: updatedIngredients });
                }}
              ></input>
            </>
          ))}
        </div>
        <button
          className="searchFilterApplyButton"
          onClick={(e) => {
            e.preventDefault();
            setUpdateFilters(!updateFilters);
          }}
        >
          Apply filters
        </button>
      </div>
    </form>
  );
}
