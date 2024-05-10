export default class RecipeFilter {
  name;
  ratingFrom;
  ratingTo;
  cookingTimeFrom;
  cookingTimeTo;
  ingredients;

  constructor() {
    this.name = null;
    this.ratingFrom = null;
    this.ratingTo = null;
    this.cookingTimeFrom = null;
    this.cookingTimeTo = null;
    this.ingredients = [];
  }
}
