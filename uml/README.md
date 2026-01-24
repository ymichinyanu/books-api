# Entity Relationship Diagram

In this project there is no need to create Entity Relationship Diagram, you can read the `prisma/schema.prisma` file to understand the DB schema or you can generate the diagram using Prisma Studio:

**1. Apply database migrations**

``` 
npx prisma migrate deploy
```

**2. Launch Prisma Studio**

```
npx prisma studio
```

# Class Diagram

Class diagrams are unnecessary because Nest.js relies on composition and dependency injection rather than complex inheritance hierarchies.