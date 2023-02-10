import { useState, useEffect } from "react";
import axios from "axios";
export interface AxiosCallIneterface {
  name: string;
}
function AxiosCall(inputAxiosCall: AxiosCallIneterface) {
  const { name } = inputAxiosCall;
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
    <>
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
    </>
  );
}
export default AxiosCall;
/*
export function AxiosCall(): AxiosCallContext {
  const inputAxiosCallContext: AxiosCallContext = { name: "Testing" };
  return inputAxiosCallContext;
}

export function AxiosCall() {
  const [swapival, setswapival] = useState("Load API");

  const [comments, setComments] = useState([]);

  console.log({ swapival });
  console.log({ comments });

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
      setswapival("Loaded");
    }
  };
  return (
    <>
      <ul>
        {comments &&
          comments.map((comment, index) => {
            return <li key={index}> {comment["name"]} </li>;
          })}
      </ul>
    </>
  );
}
*/
