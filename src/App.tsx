import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./Button";
//import { AxiosCall } from "./AxiosCall";
import axios from "axios";
function App() {
  const [swapival, setswapival] = useState("Load API ");

  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(`https://swapi.dev/api/people/?page=1`);
      if (response.status === 200) {
        setCharacters(response.data.results);
        setswapival("Loaded");
      } else setError("Something Went wrong");
    };
    fetchCharacters();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1> SWAPI React Calls </h1>
      </header>
      <body>
        <h2> {swapival} </h2>
        {error && <div> {error} </div>}
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
      </body>
    </div>
  );
}
export default App;
