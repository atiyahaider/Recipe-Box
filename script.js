function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const DISPLAY = 'Display';
const EDIT = 'Edit';
const ADD = 'Add';
const DELETE = 'Delete';
const INFO = 'Information';
const LocalStorageKey = '_atiyahaider_recipes';

class Modal extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "listenKeyboard",


    e => {
      if (e.key === 'Escape' || e.keyCode === 27)
      this.props.handleClose();
    });_defineProperty(this, "onOverlayClick",









    () => {
      this.props.handleClose();
    });_defineProperty(this, "onDialogClick",

    e => {
      e.stopPropagation();
    });}componentDidMount() {window.addEventListener('keydown', this.listenKeyboard.bind(this), true);}componentWillUnmount() {window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);}

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "modalOverlay", onClick: this.onOverlayClick }),

      React.createElement("div", { className: "modalBox", onClick: this.onDialogClick },
      this.props.children)));



  }}


class RecipeCard extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleChange",

















    e => {
      if (e.target.id.startsWith('ingredient')) {
        let index = e.target.id.substr('ingredient'.length);
        let ingredients = [...this.state.ingredients];
        ingredients[index] = e.target.value;
        this.setState({ ingredients });
      } else
      {
        this.setState({
          [e.target.id]: e.target.value });

      }
    });_defineProperty(this, "handleClose",

    () => {
      this.props.closeModal();
    });_defineProperty(this, "handleSubmit",

    e => {
      e.preventDefault();
      this.validateForm();
      this.props.processRecipe(this.state);
    });_defineProperty(this, "addIngredient",

    () => {
      let ingredients = this.state.ingredients.concat(['']);
      this.setState({ ingredients });
    });_defineProperty(this, "removeIngredient",

    i => {
      let ingredients = [
      ...this.state.ingredients.slice(0, i),
      ...this.state.ingredients.slice(i + 1)];

      this.setState({ ingredients });
    });this.state = { name: '', ingredients: [''], directions: '' };}componentDidMount() {if (this.props.operation === EDIT) {this.setState({ name: this.props.recipe.name, ingredients: [...this.props.recipe.ingredients], directions: this.props.recipe.directions });}}

  validateForm() {
    let name = document.getElementById('name');
    if (name.value.trim() === '')
    name.setCustomValidity('Please enter a recipe name');else

    name.setCustomValidity('');

    let ingredients = document.querySelectorAll("#ingredientList input");
    ingredients.forEach(ingredient => {
      if (ingredient.value.trim() === '')
      ingredient.setCustomValidity('Please enter an ingredient');else

      ingredient.setCustomValidity('');
    });
  }

  render() {
    return (
      React.createElement(Modal, { handleClose: this.handleClose },
      React.createElement("div", { id: "recipeCard" },
      React.createElement("div", { id: "recipeCardHeader" },
      React.createElement("span", { className: "close", onClick: this.handleClose }, "\xD7"),
      this.props.operation === EDIT ? React.createElement("h2", null, "Edit Recipe") : React.createElement("h2", null, "Add a New Recipe")),

      React.createElement("form", { onSubmit: this.handleSubmit },
      React.createElement("input", { type: "text", id: "name", value: this.state.name, onChange: this.handleChange, placeholder: "Recipe Name...", onInput: this.validateForm, required: true }),

      React.createElement("h3", null, "Ingredients:"),
      this.state.ingredients.map((ingredient, j) =>
      React.createElement("div", { id: "ingredientList" },
      React.createElement("input", { type: "text", id: 'ingredient' + j, value: ingredient, onChange: this.handleChange, placeholder: "Ingredient...", onInput: this.validateForm, required: true }),
      this.state.ingredients.length > 1 &&
      React.createElement("div", { className: "ingOperation button", onClick: () => this.removeIngredient(j) }, "-"))),



      React.createElement("div", { className: "ingOperation button", id: "addIngredient", onClick: this.addIngredient }, "+"),
      React.createElement("h3", null, "Directions:"),
      React.createElement("textarea", { id: "directions", value: this.state.directions, onChange: this.handleChange, placeholder: "Directions...", rows: "5" }),

      React.createElement("div", { style: { textAlign: 'right' } },
      React.createElement("button", { id: "submit", className: "button", type: "submit" }, "Save"),
      React.createElement("button", { className: "button", onClick: this.handleClose }, "Cancel"))))));





  }}


const DisplayRecipe = ({ recipe, closeModal }) => {
  let md = window.markdownit();

  return (
    React.createElement(Modal, { handleClose: closeModal },
    React.createElement("div", { id: "recipeCard" },
    React.createElement("div", { id: "recipeCardHeader" },
    React.createElement("span", { className: "close", onClick: closeModal }, "\xD7"),
    React.createElement("h2", null, recipe.name)),

    React.createElement("div", null,
    React.createElement("h3", null, "Ingredients:"),
    React.createElement("ul", null,
    recipe.ingredients.map((ingredient, j) =>
    React.createElement("li", { id: j }, ingredient)))),



    React.createElement("div", null,
    React.createElement("h3", null, "Directions:"),
    React.createElement("p", { dangerouslySetInnerHTML: { __html: md.render(recipe.directions) } })))));





};

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleYes",


    () => {
      this.props.processRecipe();
    });_defineProperty(this, "handleClose",

    () => {
      this.props.closeModal();
    });}

  render() {
    return (
      React.createElement(Modal, { handleClose: this.handleClose },
      React.createElement("div", { id: "recipeCard" },
      React.createElement("div", { id: "recipeCardHeader" },
      React.createElement("span", { className: "close", onClick: this.handleClose }, "\xD7"),
      React.createElement("h3", null, "Delete Recipe")),

      React.createElement("div", null, "Are you sure you want to delete this recipe?", React.createElement("br", null), React.createElement("br", null)),
      React.createElement("div", { style: { textAlign: 'right' } },
      React.createElement("button", { className: "button", onClick: this.handleYes }, "Yes"),
      React.createElement("button", { className: "button", onClick: this.handleClose }, "Cancel")))));




  }}


const DisplayInfo = ({ closeModal }) => {
  return (
    React.createElement(Modal, { handleClose: closeModal },
    React.createElement("div", { id: "recipeCard" },
    React.createElement("div", { id: "recipeCardHeader" },
    React.createElement("span", { className: "close", onClick: closeModal }, "\xD7"),
    React.createElement("h2", null, "Information")),

    React.createElement("div", { id: "information" },
    React.createElement("ul", null,
    React.createElement("li", null, "Create recipes with ingredients and directions."),
    React.createElement("li", null, "The Recipe Box has recipe cards displaying the recipe name and some of its ingredients. If there are more ingredients, \"...\" will be displayed at the bottom of the recipe card. To view a recipe in detail, click on the recipe card."),
    React.createElement("li", null, "To add a new recipe, click on the add (plus) button on top of the recipe box."),
    React.createElement("li", null, "To edit a recipe, click on the edit (pencil) button at the bottom of the recipe card."),
    React.createElement("li", null, "To add more ingredients when adding or editing a recipe, click on the + sign. To delete an ingredient, click on the - sign. Each recipe must have atleast one ingredient."),
    React.createElement("li", null, "To delete a recipe, click on the delete (trash) button at the bottom of the recipe card."),
    React.createElement("li", null, "All new recipes added, are saved in the browser's local storage. If the page is refreshed, these recipes will still be there. But if the browser's temp files are deleted, all the recipes will be lost."),
    React.createElement("li", null, "Mark-up is supported for entering the directions for the recipe."))))));





};

const HeaderButtons = ({ addRecipe, displayInfo }) => {
  return (
    React.createElement("div", { id: "header" },
    React.createElement("div", { className: "headerButton", onClick: addRecipe, title: "Add New Recipe" }, React.createElement("i", { className: "fas fa-plus" })),
    React.createElement("div", { className: "headerButton", onClick: displayInfo, title: "Information" }, React.createElement("i", { className: "fas fa-info" }))));


};

const Buttons = ({ editRecipe, confirmDelete }) => {
  return (
    React.createElement("div", { id: "buttonDiv" },
    React.createElement("button", { className: "button", onClick: editRecipe, title: "Edit Recipe" }, React.createElement("i", { className: "fas fa-pencil-alt fa-lg" })),
    React.createElement("button", { className: "button", onClick: confirmDelete, title: "Delete Recipe" }, React.createElement("i", { className: "fas fa-trash-alt fa-lg" }))));


};

const Recipe = ({ id, recipe, displayRecipe, editRecipe, confirmDelete }) => {
  return (
    React.createElement("div", { className: "recipe", id: id },
    React.createElement("div", { id: "recipeBody", onClick: displayRecipe }, React.createElement("h3", null, recipe.name),
    React.createElement("ul", null,
    recipe.ingredients.slice(0, 4).map((ingredient, j) =>
    React.createElement("li", { id: 'ing' + j }, ingredient)),

    recipe.ingredients.length > 4 && React.createElement("span", { style: { fontSize: '1.5rem' } }, "..."))),


    React.createElement(Buttons, {
      editRecipe: editRecipe,
      confirmDelete: confirmDelete })));



};

class RecipeList extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "displayRecipe",

















    index => {
      this.setState({ operation: DISPLAY,
        selectedIndex: index });

    });_defineProperty(this, "addRecipe",

    () => {
      this.setState({ operation: ADD });
    });_defineProperty(this, "editRecipe",

    index => {
      this.setState({ operation: EDIT,
        selectedIndex: index });

    });_defineProperty(this, "confirmDelete",

    index => {
      this.setState({ operation: DELETE,
        selectedIndex: index });

    });_defineProperty(this, "processRecipe",

    newRecipe => {
      let recipes;
      switch (this.state.operation) {
        case ADD:
          recipes = [...this.state.recipes,
          { name: newRecipe.name,
            ingredients: newRecipe.ingredients,
            directions: newRecipe.directions }];

          break;

        case EDIT:
          recipes = [...this.state.recipes];
          recipes[this.state.selectedIndex] = { name: newRecipe.name,
            ingredients: newRecipe.ingredients,
            directions: newRecipe.directions };
          break;

        case DELETE:
          recipes = [...this.state.recipes];
          recipes.splice(this.state.selectedIndex, 1);
          break;}


      this.setState({ recipes });
      this.storeLocally(recipes);
      this.closeModal();
    });_defineProperty(this, "storeLocally",

    recipes => {
      localStorage.setItem(LocalStorageKey, JSON.stringify(recipes));
    });_defineProperty(this, "closeModal",

    () => {
      this.setState({ operation: '',
        selectedIndex: 0 });

    });_defineProperty(this, "displayInfo",

    () => {
      this.setState({ operation: INFO });
    });this.state = { recipes: [{ name: 'Fresh Lemonade', ingredients: ['1 cup freshly squeezed lemon juice (5 to 6 lemons)', '1/2 to 3/4 cup superfine sugar', '1 cup crushed ice', '4 cups water'], directions: 'Place all the ingredients in a blender and process until completely smooth. Serve over ice.' }, { name: 'Spaghetti', ingredients: ['1 lb hamburger', '2 cubes beef bouillion', '1 can tomato sauce 8 oz', '1 can tomato paste 6 oz', 'pepper to taste', '2 cups hot water', '2 tsp sugar', '1/2 tsp dried basil', '1/2 tsp dried oregano', 'dash of garlic', '16 oz spaghetti noodles'], directions: '1. Brown your hamburger in a large pan.\n2. Once cooked, throw in salt, pepper, tomato sauce and paste, water (with the bouillon cubes in it), sugar, basil, oregano and garlic. Simmer on low for an hour.\n3. A few minutes before the hour is done, cook box of spaghetti noodles as directed on package.\n4. Once the noodles are cooked, drain and add to spaghetti sauce.' }, { name: 'Vanilla Ice Cream', ingredients: ['1 3/4 cups heavy cream', '1 1/4 cup whole milk', '3/4 cup sugar', '1/8 tsp fine sea salt', '1 tbsp vanilla extract or 1 vanilla bean split in half lengthwise'], directions: '- Pour 1 cup of the cream into a saucepan and add the sugar, salt. Scrape the seeds of the vanilla bean into the pot and then add the vanilla pod to the pot. Warm the mixture over medium heat, just until the sugar dissolves. Remove from the heat and add the remaining cream, milk, and vanilla extract (if using extract). Stir to combine and chill in the refrigerator.\n- When ready to churn, remove the vanilla pod, whisk mixture again and pour into ice cream maker. Churn according to the manufacturer\'s instructions. \n- Transfer the finished ice cream to an airtight container and place in the freezer until ready to serve.' }], operation: '', selectedIndex: -1 };}componentDidMount() {let recipes = JSON.parse(localStorage.getItem(LocalStorageKey)); //if any recipes found in the local storage, load them, else the default recipes will display
    if (recipes && recipes.length) this.setState({ recipes });}
  render() {
    return (
      React.createElement("div", { id: "recipeBox" },
      React.createElement(HeaderButtons, { addRecipe: this.addRecipe, displayInfo: this.displayInfo }),

      this.state.recipes.length === 0 ?
      React.createElement("div", { className: "noRecipe" },
      React.createElement("p", null, "No recipes found. Please add new recipes.")) :



      React.createElement("div", { id: "recipeList" },
      this.state.recipes.map((recipe, i) =>
      React.createElement(Recipe, {
        id: i,
        recipe: recipe,
        displayRecipe: () => this.displayRecipe(i),
        editRecipe: () => this.editRecipe(i),
        confirmDelete: () => this.confirmDelete(i) }))),






      (this.state.operation === ADD || this.state.operation === EDIT) &&
      React.createElement(RecipeCard, {
        operation: this.state.operation,
        recipe: this.state.operation === EDIT ? this.state.recipes[this.state.selectedIndex] : {},
        closeModal: this.closeModal,
        processRecipe: this.processRecipe }),



      this.state.operation === DISPLAY &&
      React.createElement(DisplayRecipe, {
        recipe: this.state.recipes[this.state.selectedIndex],
        closeModal: this.closeModal }),



      this.state.operation === DELETE &&
      React.createElement(ConfirmDelete, {
        closeModal: this.closeModal,
        processRecipe: this.processRecipe }),



      this.state.operation === INFO &&
      React.createElement(DisplayInfo, { closeModal: this.closeModal })));



  }}


const Footer = () => {
  return (
    React.createElement("div", { id: "footer" },
    React.createElement("p", null, "Designed and coded by"),
    React.createElement("a", { target: "_blank", href: "https://s.codepen.io/atiyahaider/debug/oaZxeb/dGrXWdOKgPWM" }, "Atiya Haider")));


};

const RecipeBox = () => {
  return (
    React.createElement("div", null,
    React.createElement("h1", null, "Recipe Box"),
    React.createElement(RecipeList, null),
    React.createElement(Footer, null)));


};

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('recipeBoxApp'));