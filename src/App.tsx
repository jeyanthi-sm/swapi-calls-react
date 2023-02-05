import React, { useEffect, useReducer, useState } from "react";

import "./App.css";
import Button from "./Button";

function App() {
  const [swapival, setswapival] = useState("Click Me");

  const GetSWAPI = async () => {
    try {
      const responseFetch = await fetch(`https://swapi.dev/api/people/?page=1`);
      if (responseFetch.ok) {
        const json = await responseFetch.json(); //as {data: string[];
        setswapival(json.results[0].name);
      }
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> SWAPI React Calls</h1>
      </header>

      <Button onClick={GetSWAPI}> {swapival} </Button>
    </div>
  );
}
export default App;
