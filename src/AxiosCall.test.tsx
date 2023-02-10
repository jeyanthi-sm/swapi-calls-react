import React from "react";
import AxiosCall, { AxiosCallIneterface } from "../src/AxiosCall";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockFunction = jest.fn();

const mockAxiosCallInterface: AxiosCallIneterface = {
  name: "Testing",
};
const server = setupServer(
  rest.get("/greeting", (req, res, ctx) => {
    return res(ctx.json({ greeting: "hello there" }));
  })
);

const swapicallresult: AxiosCallIneterface = {
  name: "Luke Skywalker",
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function beforeEachTest() {
  render(<AxiosCall {...mockAxiosCallInterface} />);
}

it("renders AxiosCall data", async () => {
  render(<AxiosCall {...mockAxiosCallInterface} />);
  expect(screen.getByDisplayValue("Hello there")).toBeInTheDocument();
});
