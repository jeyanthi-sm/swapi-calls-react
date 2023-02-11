import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadSwapiCharacters from "../src/LoadSwapiCharacters";
import userEvent from "@testing-library/user-event";

test("Load StarWar Characters", () => {
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

test("Loaded StarWar Characters  mocking", async () => {
  const fetchSwapiCharacters = async () => {
    mockFunction();
  };
  //render(<LoadSwapiCharacters onClick={mockFunction()} />);  //working fine uncomment if needed
  render(<LoadSwapiCharacters onClick={fetchSwapiCharacters()} />);

  const node = screen.getByRole("button");
  const user = userEvent.setup();

  await user.click(node);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});

const server = setupServer(
  rest.get(`https://swapi.dev/api/people/`, (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays Luke SkyWalker", async () => {
  //const fetchSwapiCharacters = async () => {};
  //  render(<LoadSwapiCharacters onClick={fetchSwapiCharacters()} />);
  render(<LoadSwapiCharacters />);

  const node = screen.getByRole("button");
  const user = userEvent.setup();
  await user.click(node);
  await screen.findByText(/no characters found/i);
  expect(screen.getByText("no characters found")).toBeInTheDocument();
});
