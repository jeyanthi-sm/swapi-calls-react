import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import App from "./App";

const server = setupServer(
  rest.get("/greeting", (req, res, ctx) => {
    return res(ctx.json({ greeting: "hello there" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays greeting", async () => {
  //  render(<Fetch url="https://swapi.dev/api/people/" />);
  //<Button onClick={App.GetSWAPI}> {swapival} </Button>
  // render(Button onclick={swa})
  fireEvent.click(screen.getByText("Load Greeting"));

  // await waitFor(() => screen.getByRole("heading"));
  const someValue = await screen.findByRole("heading");

  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
});

test("handles server error", async () => {
  server.use(
    rest.get("/greeting", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  //  render(<Button url="/greeting" />);

  fireEvent.click(screen.getByText("loading"));

  //  await waitFor(() => screen.getByRole("alert"));

  screen.getByRole("alert");

  expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to fetch!");
  expect(screen.getByRole("button")).not.toBeDisabled();
});
