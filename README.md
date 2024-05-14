# Transport Management API (NestJS + Fastify + Prisma + Typescript + Postgres)

CRUD endpoints to manage vehicle operations. Built as part of the assessment for Wiot360 by Adnan.

## Overview

The app lets users schedule vehicles for events based on availability. Users can see available vehicles based booking period. The API expects the front end to return id's of vehicles that need to be booked. The API will book the vehicles only if the schedule duration does not overlap the vehicles' current schedule.

- Vehicles can't be deleted from the system until they have an active upcoming schedule.

## Assumptions

Based on the information provided in the assessment, the following assumptions are made while building the app

- Vehicles are booked on a daily basis.
- Vehicles can be booked for minimum 1 day.
- A vehicle can have multiple schedules, if they do not overlap.
- Distance is not taken into consideration for this demo.

## Running the app

To run the app using docker

```pwsh
docker compose up --build
```

Install dependencies

```pwsh
yarn install
```

To run the app locally

```pwsh
# development mode
yarn start

# watch mode
yarn start:dev

# production mode
yarn build
yarn start:prod:migrate
```

The above command runs server in production mode after migrating the database.

## Generating Vehicle Data

To fill the db with sample vehicle data, ensure you have `ts-node` installed and run the following

```pwsh
yarn ts-node index.ts
```

The above command will generate the following data

[![Sample Data](https://i.postimg.cc/d1TnCycM/sample-data.png)](https://postimg.cc/xJnKDqdg)

> [!IMPORTANT]
> Before running the above script, ensure the `host` is set to `localhost` in your .env file

## Secrets

Create a directory `db` inside the project root. Then create a `password.txt` file containing your PostgresDB password. The file path should look as follows.

```bash
$ echo '<your password here>' > ./db/password.txt
```

## Environment Variables

The app needs the following environment variables to function.

```dotenv
PORT=5000

DATABASE_URL=postgresql://user:password@host:port/dbname?schema=public
```

Additionally the `NODE_ENV` variable is added to the environment when we start the app using npm scripts.

The value of `password` the url is the same password inside the `./db/password.txt` file.

When running the app locally set the value of `host` to `localhost`.

When running the app inside a docker container set the value of `host` to `db` (default container name in the compose.yaml file)

The default `port` is `5432` for Postgres.

The default `user` is `postgres` for Postgres.

## .env files

For development create a `.env.development` file with the variables mentioned above inside the root directory

For production create a `.env.production` file with the variables mentioned above inside the root directory

> [!WARNING]
> Ensure you have a `.env` and a `.env.production` file with same values in both while running the app in a docker container

## Documentation

To view detailed documentation for the endpoints and request objects, start the app and visit

- http://localhost:5000/api (default port)

The documentation page is built using the nestJS swagger package according to the OpenAPI 3.0 Specification

[![swagger.png](https://i.postimg.cc/k4tRsN5c/swagger.png)](https://postimg.cc/njpLcDBj)

## Database Diagram

[![Database diagram](https://i.postimg.cc/7hGChHgL/db-diagram.png)](https://postimg.cc/BP3ZwG7W)

Interactive diagram can be found [here](https://dbdiagram.io/d/Transport-Api-6642e4ad9e85a46d55c45afa)

## Limitations

- Update schedule endpoint not implemented due to time constraints
