# Books Service API

This project is REST API Application for a books service. It allows users to register, authenticate, and work with books. The project was developed as part of [KeepSolid Education Fund](https://keepsolideducationfund.org) practice.

## Tech Stack

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [NestJS](https://nestjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Prisma ORM](https://www.prisma.io)
- [JWT Authentication](https://jwt.io)

## Architecture

- Controllers handle HTTP requests and responses
- Services contain business logic
- Modules group related functionality
- DTOs are used for data validation and transfer
- Prisma is used for database access

## Setup

1. Install Node.js & PostgreSQL
2. Create your user and database in PostgreSQL
3. Create your `.env` file based on the [.env.example](.env.example)
4. Make sure your PostgreSQL connection information in the `.env` file is valid.
5. Install all npm packages using the following command:
```
npm install
```
6. Set up Prisma and migrate
```
npx prisma generate && npx prisma migrate deploy
```
7. Run using the following command:
```
npm run start:dev
```

## Docker Setup

You can run the project using Docker Compose:

```
docker-compose up --build
```

## API Documentation

After starting the application, API documentation will be available at http://localhost:3000/api

## Granting and revoking roles

Example of granting admin:
```
npm run grant-role -- example@example.com Admin
```

Example of revoking admin:
```
npm run revoke-role -- example@example.com Admin
```

## Frontend Demo

A simple frontend demo is included in the project to showcase the API functionality.

### How to open the frontend demo

It will be available at http://localhost:3000/demo if `NODE_ENV` in the .env file is set to `development`.

## License

This project is available under the MIT license. See [LICENSE](LICENSE) for details.
