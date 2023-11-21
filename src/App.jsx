import { useState } from "react";
import PuppiesList from "./components/PuppiesList";
import PuppyDetail from "./components/PuppyDetail";
import "./App.css";

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [puppyArray, setPuppyArray] = useState([]);
  const [puppy, setPuppy] = useState({});
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [puppyToSubmit, setPuppyToSubmit] = useState({});
  const [search, setSearch] = useState("");
  const resetForm = () => {
    setName("");
    setImgUrl("");
    setBreed("");
    setStatus("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setPuppyToSubmit({
      name: name,
      breed: breed,
      imageUrl: imgUrl,
      status: status,
    });
    const url =
      "https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(puppyToSubmit),
      }).then((result) => result.json());
      setPuppyArray([...puppyArray, puppyToSubmit]);
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <>
      <div>
        <h1>2023 Puppy Bowl</h1>

        {showDetails ? (
          <PuppyDetail
            setShowDetails={setShowDetails}
            puppy={puppy}
            setPuppyArray={setPuppyArray}
            puppyArray={puppyArray}
          />
        ) : (
          <div>
            <div className="forms">
              <form className="newPupForm" onSubmit={submitHandler}>
                <p>Register Your Pup</p>
                <label>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <br />
                <br />
                <label>
                  ImageURL:
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </label>
                <br />
                <br />
                <label>
                  Breed:
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </label>
                <br />
                <br />
                <label>
                  Field:
                  <input
                    type="radio"
                    name="status"
                    value="field"
                    checked={status === "field"}
                    onChange={() => setStatus("field")}
                  />
                </label>
                <label>
                  Bench:
                  <input
                    type="radio"
                    name="status"
                    value="bench"
                    checked={status === "bench"}
                    onChange={() => setStatus("bench")}
                  />
                </label>
                <br />
                <br />
                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
              </form>
              <form className="search" onSubmit={searchHandler}>
                <label>
                  Find Your Pup
                  <br />
                  <br />
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <br />
                <br />
                <button>Search</button>
              </form>
            </div>

            <PuppiesList
              setShowDetails={setShowDetails}
              setPuppy={setPuppy}
              setPuppyArray={setPuppyArray}
              puppyArray={puppyArray}
              setSearch={setSearch}
              search={search}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
