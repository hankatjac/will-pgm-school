import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Recipe = () => {
  const [activeRecipe, setActiveRecipe] = useState({});

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(
          `https://forkify-api.herokuapp.com/api/get?rId=${id}`
        );
        const res = await req.json();
        setActiveRecipe(res.recipe);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };

    fetchData();
  }, [id]);

  console.log(activeRecipe.ingredients);

  return (
    <div className="container col-12 col-md-6">
      <div className="text-center">
        <img
          className="img-fluid"
          src={activeRecipe.image_url}
          alt={activeRecipe.title}
        />
        <h3 className="active-recipe__title">{activeRecipe.title}</h3>
      </div>
      <div className="mx-auto w-75">
        <p>Ingredients</p>
        <ul>
          {activeRecipe.ingredients &&
            activeRecipe["ingredients"].map((prop, index) => (
              <li key={index}> {prop}</li>
            ))}
        </ul>
        <p>
          Publisher: <span>{activeRecipe.publisher}</span>
        </p>
        <p>
          Website:
          <span>
            <a href={activeRecipe.publisher_url}>
              {activeRecipe.publisher_url}
            </a>
          </span>
        </p>
        <div className="text-center">
          <Link className="btn btn-outline-primary" to="/recipe">
            Change Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
