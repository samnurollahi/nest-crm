# CRM Backend - NestJS

A simple CRM backend built with **NestJS**, **TypeORM**, and **PostgreSQL** to practice backend architecture, authentication, authorization, events, caching, security, and scalable project structure.

### Authentication & Authorization

- JWT Authentication
- Role-Based Access Control (RBAC)
- Custom Auth Guard
- Custom Role Guard
- User Payload Decorator

### Company Management

- Company Registration
- Automatic Owner Creation
- Company Domain Events
- Event Listeners

### User Management

- Add Employees
- User Roles
- Company-Based User Isolation

### Lead Management

- Create Leads
- Change Lead Status
- Lead Listing with Pagination
- Company Scoped Data Access

### Architecture

- Modular Architecture
- DTO Validation
- Event Driven Design
- Global Exception Filter
- Global Response Interceptor
- Environment Validation
- Config Management

### Security

- JWT Authentication
- Role-Based Authorization
- Request Throttling (Rate Limiting)
- Environment Variable Validation
- Password Hashing (bcrypt)

### API Documentation

- Swagger Integration

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Swagger
- EventEmitter2
- Cache Manager

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development

DATABASE_NAME=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=

JWT_SECRET=
```

### Run Project

```bash
npm run start:dev
```

### Swagger

```text
http://localhost:3000/api/docs
```

---

## Learning Goals

This project was built to practice:

- NestJS Architecture
- TypeORM
- Authentication & Authorization
- Event-Driven Design
- Clean Code Principles
- Modular Design
- API Security
- Backend Best Practices

---

## License

MIT
