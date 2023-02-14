import { rest } from "msw";

function getPeople() {
  return rest.get(`https://swapi.dev/api/people/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "admin",
      })
    );
  });
}
function getGreeting() {
  rest.get(`/greeting`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Hello There!",
      })
    );
  });
}

function getError() {
  rest.get(`/Error`, (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        name: "Error",
      })
    );
  });
}

export const handlers = [getPeople(), getGreeting(), getError()];
