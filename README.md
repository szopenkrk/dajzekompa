# Projekt Miasto

## Setup
In order to run the project locally, you need to install node dependencies first:
> npm install

After that, if you want to just start the project, run:
> npm start

Note that this runs the project in development mode (a bit slower, source mappings are generated, etc). If you want to run the application in production mode (not production config), set NODE_ENV variable:
> NODE_ENV=production npm start

## Development
Application consists of two layers - client and the server (or frontend and backend). All HTTP requests are going through the server, even the initial render (to allow client to use server configuration based on environment variables). The server injects the configuration to initial HTML template, but does not render the application server-side.

This means you need to build both client and server in order to run the application, but there's a handy command that does both:
> npm run build

If for some reason you want to build only one of them:
> npm run build:client

> npm run build:server

But for development, it's much easier to run it in watch mode, so the application will restart on every source code change:
> npm run dev

Note: for all of the above, you can also build/watch the production version by prefixing a command with NODE_ENV=production.
