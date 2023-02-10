import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [swapival, setSwapival] = useState("Load API ");

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=1`);

        const json = await response.json();
        setCharacters(json.results);
        setSwapival("Loaded");
        console.log("hurray");
      } catch (error) {
        /* {
      if (error.response)
        console.log("REquest made but the server responded with an error");
      else if (error.request)
        console.log("REquest made but no response is received from the server");
      else console.log("error occured while setting up the request");
    } */
        console.log("error");
      }
    };
    fetchCharacters();
  }, [characters]);

  return (
    <div className="App">
      <header className="App-header">
        <h1> SWAPI React Calls </h1>
      </header>
      <>
        <h2> {swapival} </h2>

        {characters ? (
          <ul>
            {characters &&
              characters.map((character, index) => {
                return <li key={index}> {character["name"]} </li>;
              })}
          </ul>
        ) : (
          <p> no characters found </p>
        )}
      </>
    </div>
  );
}
export default App;
