import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Button from "./Button";

function App() {
  const [swapival, setswapival] = useState("Click Me");

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const fetchComments = async () => {
    const response = await Axios.get(`https://swapi.dev/api/people/?page=1`);
    if (response.status === 200) {
      setComments(response.data.results);
    }
  };

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

      <Button onClick={GetSWAPI}> {swapival}</Button>
      <>
        <ol>
          {comments &&
            comments.map((comment, index) => {
              return <li key={index}> {comment["name"]} </li>;
            })}
        </ol>
      </>
    </div>
  );
}
export default App;
