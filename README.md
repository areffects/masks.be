# Masks Backend

The server side application based on [Nest.js](https://nestjs.com/).

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install:

- `node=12.16.1` (recommend to use [nvm](https://github.com/nvm-sh/nvm) to manage version multiple active node.js versions)

### Installing

*If you use `nvm`, you should to execute the next command:

```bash
nvm use
```

To the first you need to clone project:

```bash
git clone git@github.com:daniel-morozov/ma.test.back.git
```

Next you should to install npm dependencies of project:

```bash
yarn
```

### Usage

You should create the `.env` file with necessary variables. You can take them from the `.env.example`.

#### Development environment

#### Locally

The development environment are based on [node.js](https://nodejs.org/). You can run `dev` environment using next npm command:

App

```bash
# Development
yarn start

# Watch mode
yarn start:dev

# Production mode
yarn start:prod
```

Test

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

#### Docker

Need to write.

#### Production environment

Need to write.

### Linter

Need to write.

### Unit testing

Need to write.

### Deploy

Need to write.
