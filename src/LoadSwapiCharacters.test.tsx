import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoadSwapiCharacters from "../src/LoadSwapiCharacters";

import userEvent from "@testing-library/user-event";

test("Fetch StarWar Characters", () => {
  render(<LoadSwapiCharacters />);
  const headingElement = screen.getByText(/Load API/i);
  expect(headingElement).toBeInTheDocument();
});

test("Loaded StarWar Characters", async () => {
  render(<LoadSwapiCharacters />);
  //const mockAPICall = jest.fn();
  //const mockAPICall = jest.fn(() => {});
  jest.mock("../src/LoadSwapiCharacters");

  const node = screen.getByRole("button");
  console.log(node);
  const user = userEvent.setup();

  await user.click(node);
  //fireEvent.click(node);
  //expect(mockAPICall).toHaveBeenCalledTimes(1);
  expect(node).toHaveTextContent("API Loaded");
});
