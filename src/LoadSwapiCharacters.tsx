import React, { useState, useEffect } from "react";
interface LoadSwapiCharactersInterface {
  name: string;
}
//function LoadSwapiCharacters(): React.FC {
//const LoadSwapiCharacters = (inprops: LoadSwapiCharactersInterface) => {
const LoadSwapiCharacters: React.FC = () => {
  const [swapiLoadStatus, setSwapiLoadStatus] = useState("Load API");
  const [swapiGetcharacters, setSwapiGetCharacters] = useState([]);

  const fetchSwapiCharacters = async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/people/?page=1`);

      const json = await response.json();
      setSwapiGetCharacters(json.results);
      setSwapiLoadStatus("API Loaded");
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {}, [swapiGetcharacters]);
  return (
    <>
      <button onClick={fetchSwapiCharacters}> {swapiLoadStatus} </button>

      {swapiGetcharacters ? (
        <ul>
          {swapiGetcharacters &&
            swapiGetcharacters.map((character, index) => {
              return <li key={index}> {character["name"]} </li>;
            })}
        </ul>
      ) : (
        <p> no characters found </p>
      )}
    </>
  );
};
export default LoadSwapiCharacters;
