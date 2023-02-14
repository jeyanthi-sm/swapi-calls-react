import React, { useState, useEffect } from "react";
import "./App.css";
import LoadSwapiCharacters from "./LoadSwapiCharacters";
function App() {
  const [swapiLoadStatus, setSwapiLoadStatus] = useState("Load API ");

  const [swapiGetcharacters, setSwapiGetCharacters] = useState([]);
  const SWAPIURL = `https://swapi.dev/api/people/`;
  /*  useEffect(() => {
    const fetchSwapiCharacters = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=1`);

        const json = await response.json();
        setSwapiGetCharacters(json.results);
        setSwapiLoadStatus("Loaded");
        console.log("hurray");
      } catch (error) {
        console.log("error");
      }
    };
    fetchSwapiCharacters();
  }, [swapiGetcharacters]);
*/
  return (
    <div className="App">
      <header className="App-header">
        <h1> SWAPI React Calls </h1>
      </header>

      <LoadSwapiCharacters url={SWAPIURL} />
    </div>
  );
}
export default App;
