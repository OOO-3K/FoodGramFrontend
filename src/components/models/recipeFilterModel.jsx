export default class RecipeFilter {
  ratingFrom;
  ratingTo;
  cookingTimeFrom;
  cookingTimeTo;
  ingredients;

  constructor() {
    this.ratingFrom = null;
    this.ratingTo = null;
    this.cookingTimeFrom = null;
    this.cookingTimeTo = null;
    this.ingredients = [];
  }
}
