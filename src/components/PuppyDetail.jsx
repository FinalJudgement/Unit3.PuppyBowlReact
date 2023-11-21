import { useEffect, useState } from "react";

const PuppyDetail = ({ setPuppyArray, puppyArray, setShowDetails, puppy }) => {
  const url =
    "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players";

  const clickHandler = async (puppyId) => {
    fetch(url, { method: "DELETE" });
    try {
      const response = await fetch(`${url}/${puppyId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="detail">
      <div>
        <img src={puppy.imageUrl} alt="" />
      </div>
      <div>
        <h2>Name: {puppy.name}</h2>

        <p>Breed: {puppy.breed}</p>
        <p>Status: {puppy.status}</p>
        <button
          onClick={() => {
            setShowDetails(false);
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            setPuppyArray(puppyArray.filter((item) => item.id === puppy.id));
            clickHandler(puppy.id);
            setShowDetails(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PuppyDetail;
