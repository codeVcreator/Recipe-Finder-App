import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import MealCards from "./MealCards";

const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchInputVacancy, setSearchInputVacancy] = useState(true);
  const [meals, setMeals] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false); // Track if the search was made
  const [loading, setLoading] = useState(false); // Track if the API is still fetching

  const searching = async (e) => {
    e.preventDefault();
    setSearchAttempted(true); // Mark that a search was attempted
    setLoading(true); // Set loading to true when search starts

    if (searchInput === "") {
      setSearchInputVacancy(true);
      setMeals(null); // Clear previous search results
      setLoading(false); // Stop loading as no search will be made
      return; // Prevent the API call if the input is empty
    }

    setSearchInputVacancy(false);

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
    );
    const data = await res.json();
    setMeals(data.meals);
    setLoading(false); // Stop loading after the search completes
  };

  // // Log the meals after they are updated
  // useEffect(() => {
  //   if (meals) {
  //     console.log(meals);
  //   }
  // }, [meals]); // This will run every time the meals state changes

  return (
    <div className="container">
      <h1 className="header">Recipe Finder App</h1>

      <div className="searchContainer">
        <div className="searchBar">
          <input
            className="search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for Recipes"
          />
          <button onClick={searching} className="btn">
            Search
          </button>
        </div>
      </div>

      <div className="searchResults">
        <h1
          style={{ display: searchInputVacancy === false ? "block" : "none" }}
        >
          Your Search Results :
        </h1>
        <h1 style={{ display: searchInputVacancy === true ? "block" : "none" }}>
          Please Enter Something!
        </h1>

        {/* Now show all the meals that are fetched */}
        <MealCards
          meals={meals}
          searchAttempted={searchAttempted}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MainPage;
