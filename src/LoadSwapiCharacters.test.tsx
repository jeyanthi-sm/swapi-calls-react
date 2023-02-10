import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoadSwapiCharacters from "../src/LoadSwapiCharacters";
import userEvent from "@testing-library/user-event";

test("Fetch StarWar Characters", () => {
  render(<LoadSwapiCharacters />);
  const headingElement = screen.getByText(/Load API/i);
  expect(headingElement).toBeInTheDocument();
});

test("Loaded StarWar Characters", async () => {
  const fetchSwapiCharacters = async () => {
    return "Luke Skywalker";
  };
  const fetchSwapiCharacterName = await fetchSwapiCharacters();
  expect(fetchSwapiCharacterName).toBe("Luke Skywalker");
});

const mockFunction = jest.fn();

const fetchSwapiCharacters = async () => {
  return 1;
};

test("Loaded StarWar Characters  mocking", async () => {
  const fetchSwapiCharacters = async () => {
    mockFunction();
  };
  render(<LoadSwapiCharacters onClick={mockFunction()} />);
  const node = screen.getByRole("button");
  const user = userEvent.setup();

  await user.click(node);

  //fireEvent.click(node);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});
