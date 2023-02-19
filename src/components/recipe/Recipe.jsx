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
    <div className="container">
      <div className="active-recipe">
        <img
          className="active-recipe__img"
          src={activeRecipe.image_url}
          alt={activeRecipe.title}
        />

        <h3 className="active-recipe__title">{activeRecipe.title}</h3>
        {/* <p className="active-recipe__title">{activeRecipe.ingredients}</p> */}
        <ul>
          {activeRecipe.ingredients &&
            activeRecipe["ingredients"].map((prop, index) => (
              <li key={index}> {prop}</li>
            ))}
        </ul>
        <h4 className="active-recipe__publisher">
          Publisher: <span>{activeRecipe.publisher}</span>
        </h4>
        <p className="active-recipe__website">
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
