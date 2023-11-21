import { useEffect, useState } from "react";

const PuppiesList = ({
  setShowDetails,
  setPuppy,
  setPuppyArray,
  puppyArray,
  setSearch,
  search,
}) => {
  const [error, setError] = useState(null);

  const url =
    "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players";

  useEffect(() => {
    const fetchPuppyList = async () => {
      try {
        const response = await fetch(url).then((result) => result.json());
        const puppies = response.data.players;

        setPuppyArray(puppies);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPuppyList();
  }, []);

  return (
    <div>
      <h2>{puppyArray.length} puppies in Puppy Roster</h2>
      {error && <p>{error}</p>}

      {search === ""
        ? puppyArray.map((singlePuppyObj) => {
            console.log(singlePuppyObj.name);
            return (
              <div
                key={singlePuppyObj.id}
                onClick={() => {
                  setPuppy(singlePuppyObj);
                  setShowDetails(true);
                }}
                className="card"
              >
                <h3 key={singlePuppyObj.name}>{singlePuppyObj.name}</h3>
                <img src={singlePuppyObj.imageUrl} alt="" />
              </div>
            );
          })
        : puppyArray.map((singlePuppyObj) => {
            if (singlePuppyObj.name === search) {
              return (
                <div
                  key={singlePuppyObj.id}
                  onClick={() => {
                    setPuppy(singlePuppyObj);
                    setShowDetails(true);
                  }}
                  className="card"
                >
                  <h3 key={singlePuppyObj.name}>{singlePuppyObj.name}</h3>
                  <img src={singlePuppyObj.imageUrl} alt="" />
                </div>
              );
            }
          })}
    </div>
  );
};
export default PuppiesList;
