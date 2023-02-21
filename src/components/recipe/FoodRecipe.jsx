import React, { useState } from "react";
import Form from "./Form";
import Recipes from "./Recipes";

const FoodRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   fetch("https://dog.ceo/api/breeds/image/random/3")
  //   .then(response => response.json())
  //       // 4. Setting *dogImage* to the image url that we received from the response above
  //   .then(data => setDogImage(data.message))
  // },[])

  const fetchData = async (query) => {
    try {
      const req = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${query}`
      );
      const data = await req.json();
      setRecipes(data.recipes);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };


  const getRecipe = (e) => {
    e.preventDefault();
    const recipeName = e.target.elements.recipeName.value;
    console.log(recipeName);
    fetchData(recipeName);
  };

  console.log(recipes);

  return (
    <section >
      <header className="recipe-header">
        <h1 className="recipe-title">Recipe Search</h1>
      </header>
      <Form getRecipe={getRecipe} />
      {recipes && <Recipes recipes={recipes} />}
    </section>
  );
};

export default FoodRecipe;
