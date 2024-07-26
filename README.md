
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

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
## Links

Mysql:
http://localhost:8090/index.php?route=/sql&pos=0&db=movies&table=User

Mongo: 
http://localhost:8081/db/moviesdb/users?skip=0&key=&value=&type=&query=&projection=

Swagger:
http://localhost:3000/api


## Data examples

### New user

```json
{
  "username": "user-one",
  "password": "M*e83KJ3*",
  "email": "mail@mail.com"
}
```

### Plans

> `Admin token` will output on `console` when application start

```json
[
  { "name": "standard", "version": "v1" },
  { "name": "premium", "version": "v1" }
]
```

### Add Genre to Plan

> `Admin token` will output on `console` when application start

plan_name: "standard"

```json
["Drama", "Family"] 
```
plan_name: "premium"

```json
["Action", "Horror"]
```


### Login user

```json
{
  "username": "user-one",
  "password": "M*e83KJ3*"
}
```

### Subscribe user to a plan
plan_name: `standard`

