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

## Project Status

🚧 Work in progress 🚧

## License

This project is available under the MIT license. See [LICENSE](LICENSE) for details.