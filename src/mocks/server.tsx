// src/mocks/server.ts
import { setupWorker } from 'msw';
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.
const server = setupServer()
//const server = setupWorker()
export default server;