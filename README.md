
## Description
Builded with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Build infra

```bash

# Start Mongo and MySql
$ docker compose up -d

$ yarn prisma migrate deploy

```
Mysql:
http://localhost:8090/index.php?route=/sql&pos=0&db=movies&table=User

Mongo: http://localhost:8081/db/moviesdb/users?skip=0&key=&value=&type=&query=&projection=



## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
