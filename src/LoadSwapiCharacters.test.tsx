import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import server from "./mocks/server";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadSwapiCharacters from "../src/LoadSwapiCharacters";
import userEvent from "@testing-library/user-event";

const SWAPIURL = "https://swapi.dev/api/people/";
test("Load StarWar Characters", () => {
  render(<LoadSwapiCharacters url={SWAPIURL} />);
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
  render(<LoadSwapiCharacters url={SWAPIURL} onClick={mockFunction()} />); //working fine uncomment if needed

  const node = screen.getByRole("button");
  const user = userEvent.setup();

  await user.click(node);
  expect(mockFunction).toHaveBeenCalledTimes(1);
});

//Mock Server API
test("loads and displays greeting", async () => {
  const greetingMsg = {
    results: [
      {
        name: "Hello There!",
      },
    ],
  };
  const GREETINGURL = "/greeting";
  server.use(
    rest.get(`/greeting`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ greetingMsg }));
    })
  );

  render(<LoadSwapiCharacters url={GREETINGURL} />);
  const node = screen.getByRole("button");
  const user = userEvent.setup();

  await user.click(node);
  await screen.findByText(/API Loaded/i);
  expect(screen.getByText(greetingMsg.results[0].name)).toBeInTheDocument();
});

const notFoundDetail = {
  detail: "no characters found",
};

const GREETINGURL = "/greeting";
test("loads and displays Error Not found", async () => {
  server.use(
    rest.get(`/greeting`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    })
  );

  /*
const ERRORURL = "/error";
  server.use(
    rest.get(`/error`, (req, res, ctx) => {
      return res(ctx.status(404));
    })
  ); */
  render(<LoadSwapiCharacters url={GREETINGURL} />);

  const node = screen.getByRole("button");
  const user = userEvent.setup();

  await user.click(node);
  await screen.findByText(/API Loaded/i);

  //expect(screen.getByText(greetingMsg.results[0].name)).toBeInTheDocument();
  expect(screen.getByText(notFoundDetail.detail)).toBeInTheDocument();
});

const json1 = {
  count: 82,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
  results: [
    {
      name: "Mock Character1",
    },
  ],
};
test("loads and displays the first Mock character", async () => {
  render(<LoadSwapiCharacters url={SWAPIURL} />);

  const node = screen.getByRole("button");
  const user = userEvent.setup();

  server.use(
    rest.get(`https://swapi.dev/api/people/`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(json1));
    })
  );

  await user.click(node);
  await screen.findByText(/API Loaded/i);
  expect(screen.getByText(json1.results[0].name)).toBeInTheDocument();
});
