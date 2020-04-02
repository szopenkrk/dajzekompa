# dajzekompa

## Setup
In order to run the project locally, you need to install node dependencies first:
```bash
$ npm install
```

Before you start the application, you need to have a running database locally, that the application will use. Easiest way to set it up is with docker. Just use `postgres`/`postgres` as credentials and `dajzekompa` as database name and it'll work. You can use the following command to run the docker database locally:
```bash
$ docker container run -d -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=dajzekompa -p 5432:5432 postgres:12-alpine
```

You can also run the docker-compose stack instead, but it'll first build a docker image of the application, so you need to build & package it before (just once):
```bash
$ npm run build
$ npm run package
$ docker-compose up -d
```

Notice you'll have to rebuild the image every time you make changes (specifying the `--build` flag), so it's usually best used if you just want to quickly run the application, not develop it.

Then, database migrations have to be ran once (to setup the database structure):
```bash
$ npm run db:migrate
```

After that, if you want to just start the project, run:
```bash
$ npm start
```

Note that this runs the project in development mode (a bit slower, source mappings are generated, etc). If you want to run the application in production mode (not production config), set NODE_ENV variable:
```bash
NODE_ENV=production npm start
```

## Development
Application consists of two layers - client and the server (or frontend and backend). All HTTP requests are going through the server, even the initial render (to allow client to use server configuration based on environment variables). The server injects the configuration to initial HTML template, but does not render the application server-side.

This means you need to build both client and server in order to run the application, but there's a handy command that does both:
```bash
$ npm run build
```

If for some reason you want to build only one of them:
```bash
$ npm run build:client
```
or
```bash
$ npm run build:server
```

But for development, it's much easier to run it in watch mode, so the application will restart on every source code change:
```bash
$ npm run dev
```

Note: for all of the above, you can also build/watch the production version by prefixing a command with NODE_ENV=production.
