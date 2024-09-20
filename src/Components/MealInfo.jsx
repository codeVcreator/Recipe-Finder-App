import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";

const MealInfo = () => {
  const { mealid } = useParams(); // UseParams is used to fetch the parameters given by URL
  const [mealInfo, setMealInfo] = useState(null);

  useEffect(() => {
    // Define the function inside useEffect to avoid dependency issues of INFO function
    const Info = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
      );
      const data = await res.json();
      setMealInfo(data.meals[0]); // Update state with the first meal from the response
    };

    if (mealid) {
      Info(); // Fetch meal info when mealid is available
    }
  }, [mealid]); // Dependency array only tracks mealid changes

  // // To log mealInfo after it updates
  // useEffect(() => {
  //   if (mealInfo) {
  //     console.log(mealInfo);
  //   }
  // }, [mealInfo]); // Log mealInfo whenever it changes

  return (
    mealInfo && (
      <div className="infoContainer">
        <div className="mealInfo">
          <img src={mealInfo.strMealThumb} alt={mealInfo.strMeal} />
          <div className="mealInfoDetails">
            <h1 className="header">"{mealInfo.strMeal}"</h1>
            <h3 className="subheader">Instructions : </h3>
            <p className="details">{mealInfo.strInstructions}</p>
            <NavLink to={mealInfo.strYoutube} target="_blank">
              <button className="videoLink">
                <FontAwesomeIcon icon={faYoutube} className="youtubeIcon" />
                Youtube
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    )
  );
};

export default MealInfo;
