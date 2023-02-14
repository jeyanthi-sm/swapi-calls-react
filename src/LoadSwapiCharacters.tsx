import { e } from "msw/lib/glossary-de6278a9";
import * as React from "react";
import { useState, useEffect, MouseEventHandler } from "react";

export interface LoadSwapiCharactersProps {
  url: string;
  onClick?: any; // (e: React.MouseEvent<HTMLButtonElement> | undefined) => void;
}
const LoadSwapiCharacters: React.FC<LoadSwapiCharactersProps> = (
  inputLoadSwapiCharacterProps: LoadSwapiCharactersProps
) => {
  const [swapiLoadStatus, setSwapiLoadStatus] = useState("Load API");
  const [swapiGetcharacters, setSwapiGetCharacters] = useState([]);
  const [swapiError, setSwapiError] = useState<string>();

  const fetchSwapiCharacters = async () => {
    try {
      // const response = await fetch(`https://swapi.dev/api/people/`);
      const response = await fetch(inputLoadSwapiCharacterProps.url);
      const json = await response.json();
      setSwapiGetCharacters(json.results);
      setSwapiLoadStatus("API Loaded");
    } catch (error) {
      setSwapiError("error");
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
