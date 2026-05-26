# BLOG API

A RESTful API for a blog platform built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- **Node.js** with **Express** — server and routing
- **TypeScript** — type safety
- **Prisma** — ORM for database access
- **PostgreSQL** — database (running in Docker)
- **JWT** — authentication
- **bcryptjs** — password hashing
- **Jest** + **Supertest** — testing

## Getting Started

### Prerequisites

- Node.js
- Docker Desktop

### Installation

1. Clone the repo
2. Install dependencies

```bash
   npm install
```

3. Create a `.env` file

```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5433/blog_api?schema=public"
   JWT_SECRET="your_jwt_secret"
   PORT=3000
```

4. Start the database

```bash
   docker compose up -d
```

5. Run migrations

```bash
   npx prisma migrate dev
```

6. Start the server

```bash
   npm run dev
```

## API Endpoints

### Auth

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get token |

### Posts

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/api/post`     | Create a post     |
| GET    | `/api/post/:id` | Get posts by user |
| PUT    | `/api/post/:id` | Update a post     |
| DELETE | `/api/post/:id` | Delete a post     |

### Comments

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/comment`     | Add a comment        |
| GET    | `/api/comment`     | Get all comments     |
| GET    | `/api/comment/:id` | Get comments by post |
| PUT    | `/api/comment/:id` | Update a comment     |
| DELETE | `/api/comment/:id` | Delete a comment     |

## Testing

```bash
npm test
```

## Database Schema

- **User** — has many Posts and Comments
- **Post** — belongs to a User, has many Comments
- **Comment** — belongs to a User and a Post
