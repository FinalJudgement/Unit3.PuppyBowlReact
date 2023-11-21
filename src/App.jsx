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
            <form onSubmit={submitHandler}>
              <p>Register Your Pup</p>
              <label htmlFor="">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <br />
              <label htmlFor="">
                ImageURL:
                <input
                  type="text"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </label>
              <br />
              <br />
              <label htmlFor="">
                Breed:
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                />
              </label>
              <br />
              <br />
              <label htmlFor="">
                Field:
                <input
                  type="radio"
                  name="status"
                  value="field"
                  checked={status === "field"}
                  onChange={() => setStatus("field")}
                />
              </label>
              <label htmlFor="">
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
            <PuppiesList
              setShowDetails={setShowDetails}
              setPuppy={setPuppy}
              setPuppyArray={setPuppyArray}
              puppyArray={puppyArray}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
