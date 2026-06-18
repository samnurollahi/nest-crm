# CRM Backend - NestJS

A simple CRM backend built with **NestJS**, **TypeORM**, and **PostgreSQL** to practice backend architecture, authentication, authorization, events, caching, security, and scalable project structure.

## Features

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

### Infrastructure

- PostgreSQL
- TypeORM
- Redis Ready Structure
- Cache Module Integration

### API Documentation

- Swagger Integration

---

## Project Structure

```text
src
├── common
│   ├── decorators
│   ├── filters
│   ├── guards
│   ├── interceptors
│   └── pipes
│
├── config
│
├── infrastructure
│   ├── database
│   └── redis
│
├── modules
│   ├── auth
│   ├── company
│   ├── leads
│   └── user
│
└── types
```

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Swagger
- Redis (Infrastructure Ready)
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

DATABASE_NAME=crm
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=root

JWT_SECRET=your_secret_key
```

### Run Project

```bash
npm run start:dev
```

### Swagger

```text
http://localhost:3000/api
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

## Future Improvements

- Refresh Token Authentication
- Redis Caching
- Audit Logging
- Docker Support
- WebSocket Notifications
- GraphQL API
- Unit & Integration Testing
- Multi-Tenant Enhancements
- Advanced Lead Pipelines

---

## License

MIT
