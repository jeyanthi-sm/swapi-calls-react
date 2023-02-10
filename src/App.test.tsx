import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders SWAPI React Calls header", () => {
  render(<App />);
  const headingElement = screen.getByText(/SWAPI React Calls/i);
  expect(headingElement).toBeInTheDocument();
});

test("Fetch SW Characters", () => {
  render(<App />);
  const headingElement = screen.getByText(/Load API/i);
  expect(headingElement).toBeInTheDocument();
});
