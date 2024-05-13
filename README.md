# Transport Management API (NestJS + Fastify + Prisma + Typescript + Postgres)

## Running the app

To run the app using docker

```bash
$ docker compose up --build
```

Install dependencies

```bash
$ yarn install
```

To run the app locally

```bash
# development mode
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod:migrate
```

The above command runs server in production mode after migrating the database.

## Secrets

Create a directory `db` inside the project root. Then create a `password.txt` file containing your PostgresDB password. The file path should look as follows.

```bash
$ echo '<your password here>' > ./db/password.txt
```

## Environment Variables

The app needs the following environment variables to function.

```ts
PORT = 5000

DATABASE_URL = `postgresql://user:password@host:port/dbname?schema=public`
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

> Note: Ensure you have a `.env` and a `.env.production` file with same values in both while running the app in a docker container

## Documentation

To view detailed documentation for the endpoints and request objects, start the app and visit

- http://localhost:5000/api (default port)

The documentation page is built using the nestJS swagger package according to the OpenAPI 3.0 Specification

## Limitations

- Update schedule endpoint not implemented due to time constraints
