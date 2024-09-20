import { NavLink } from "react-router-dom";

const MealCards = ({ meals, searchAttempted, loading }) => {
  return (
    <div className="mealCards">
      {loading ? (
        <div>
            <p>Loading...</p>
        </div>
      ) : !meals && searchAttempted ? (
        <div>
          <p>Sorry! We can't find any recipes.</p>
        </div>
      ) : (
        meals?.map((meal) => {
          return (
            <div className="mealCard" key={meal.idMeal}>
              <img src={meal.strMealThumb} alt="meal.jpg" />
              <p>{meal.strMeal}</p>
              <NavLink to={`/${meal.idMeal}`}>
                <button>Recipe</button>
              </NavLink>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MealCards;
