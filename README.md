# ⚡ Autom8

> **A distributed, event-driven workflow automation platform built with Next.js, Express, Apache Kafka, PostgreSQL, and Turborepo.**

Autom8 is an open-source workflow automation engine (inspired by Zapier) designed for resilience, decoupled scalability, and high-throughput execution. It enables users to configure multi-step event triggers and sequential actions (such as sending emails or executing blockchain transactions) with guaranteed execution powered by the **Transactional Outbox Pattern** and **Apache Kafka**.

---

## 📑 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [How an Autom Executes](#-how-an-autom-executes)
- [Repository Structure](#-repository-structure)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Clone and Install Dependencies](#1-clone-and-install-dependencies)
  - [2. Environment Configuration](#2-environment-configuration)
  - [3. Database Setup & Seeding](#3-database-setup--seeding)
  - [4. Start Kafka Broker](#4-start-kafka-broker)
  - [5. Run the Application](#5-run-the-application)
- [Environment Variables Guide](#-environment-variables-guide)
- [API & Service Endpoints](#-api--service-endpoints)
- [Available Scripts](#-available-scripts)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🏛 Architecture Overview

Autom8 adopts a decoupled microservice architecture orchestrated within a Turborepo monorepo:

```
                    ┌─────────────────────────┐
                    │    Primary Frontend     │ (Next.js 16 + Tailwind CSS)
                    │  (Workflow Builder UI)  │
                    └────────────┬────────────┘
                                 │ HTTP / NextAuth
                                 ▼
                    ┌─────────────────────────┐
                    │     Primary Backend     │ (Express REST API)
                    │  Auth / Automs / Schema │
                    └────────────┬────────────┘
                                 │
                                 ▼
External Webhook ──► ┌─────────────────────────┐
   Payload           │      Hooks Service      │ (Express - Port 3001)
                     │ (Fast Webhook Receiver) │
                     └────────────┬────────────┘
                                  │
                                  │ Atomic DB Transaction (Prisma)
                                  ▼
                     ┌─────────────────────────┐
                     │   PostgreSQL Database   │
                     │  - AutomRun             │
                     │  - AutomRunOutbox (Queue│
                     └────────────┬────────────┘
                                  │
                                  │ Polls pending records in batches
                                  ▼
                     ┌─────────────────────────┐
                     │    Processor Service    │
                     │  (Transactional Outbox) │
                     └────────────┬────────────┘
                                  │
                                  │ Publishes `autom-events` (Stage 0)
                                  ▼
                     ┌─────────────────────────┐
                     │       Apache Kafka      │
                     │   Topic: `autom-events` │
                     └────────────┬────────────┘
                                  │
                                  │ Consumes events & commits offsets
                                  ▼
                     ┌─────────────────────────┐
                     │     Worker Service      │ ──► [Action 1: Send Solana]
                     │ (Multi-Stage Execution) │ ──► [Action 2: Send Email]
                     └────────────┬────────────┘
                                  │
                                  │ If more stages remain:
                                  └─► Re-publishes (Stage + 1) to Kafka
```

---

## 🔄 How an Autom Executes

1. **Trigger Ingestion**: An external system triggers a webhook `POST /hooks/catch/:userId/:automId` containing custom JSON payload.
2. **Transactional Outbox**: The `hooks` service writes the execution record (`AutomRun`) and queues it in `AutomRunOutbox` within an **atomic database transaction**. This guarantees zero message loss even under heavy traffic without relying directly on downstream message queues.
3. **Outbox Polling**: The `processor` service continuously polls `AutomRunOutbox`, dispatches the event to the Kafka topic `autom-events` at initial stage `0`, and purges the row from the outbox table.
4. **Execution & Dynamic Variable Interpolation**: The `worker` service consumes the message, resolves the action defined for that stage, and resolves placeholders like `{comment.amount}` or `{comment.email}` against the webhook metadata using a recursive key path resolver.
5. **Stage Progression**: Once the action completes (e.g., email sent or crypto transferred), the worker checks if further actions exist in the pipeline. If so, it publishes `stage: stage + 1` back to Kafka, enabling chainable multi-step workflows.

---

## 📂 Repository Structure

```
autom8/
├── apps/
│   ├── primary-frontend/   # Next.js 16 App Router UI, NextAuth, canvas builder
│   ├── primary-backend/    # Express API (Users, Automs, Triggers, Actions, OTP verification)
│   ├── hooks/              # Dedicated lightweight webhook ingestion server
│   ├── processor/          # Outbox processor pushing records from DB to Kafka
│   └── worker/             # Distributed action execution engine consuming Kafka
├── packages/
│   ├── db/                 # Prisma ORM schema, client (@repo/db), and seed data
│   ├── types/              # Shared TypeScript definitions
│   ├── ui/                 # Shared UI components
│   ├── eslint-config/      # Shared ESLint configuration
│   └── typescript-config/  # Shared tsconfig bases
├── turbo.json              # Turborepo task definitions
└── package.json            # Monorepo root configuration
```

---

## 💻 Tech Stack

| Category                    | Technologies                                                                                                                                                                                         |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monorepo Engine**         | [Turborepo](https://turbo.build/) & npm Workspaces                                                                                                                                                   |
| **Frontend**                | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/), [NextAuth.js](https://next-auth.js.org/) |
| **Backend & Microservices** | [Express](https://expressjs.com/), [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), [esbuild](https://esbuild.github.io/)                                              |
| **Database & ORM**          | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM v7](https://www.prisma.io/)                                                                                                                   |
| **Message Broker**          | [Apache Kafka](https://kafka.apache.org/) via [KafkaJS](https://kafka.js.org/)                                                                                                                       |
| **Validation & Auth**       | [Zod](https://zod.dev/), [JSON Web Tokens (JWT)](https://jwt.io/), [bcryptjs](https://github.com/dcodeIO/bcrypt.js)                                                                                  |
| **Integrations**            | [Nodemailer](https://nodemailer.com/) (Resend SMTP), Solana transaction dispatcher                                                                                                                   |

---

## ✨ Key Features

- **Reliable Distributed Pipelines**: Uses the **Transactional Outbox Pattern** to prevent dual-write vulnerabilities between the database and the message broker.
- **Dynamic Template Substitution**: Reference webhook payloads directly in downstream actions using `{field.nestedKey}` syntax.
- **Multi-Step Workflows**: Build workflows chaining multiple actions sequentially with stage-by-stage Kafka execution.
- **Email Verification & OTP**: Built-in 2-factor OTP verification for secure user onboarding.
- **Pluggable Triggers & Actions Catalog**: Easily extendable database models for new triggers (Webhooks, File Uploads, Form Submissions) and actions (Emails, Crypto Transfers, PDFs).
- **Fast Development Cycle**: Turbo-cached build pipeline with centralized TypeScript and lint configurations.

---

## ⚙️ Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm**: `v11` or higher
- **PostgreSQL**: Local instance or hosted provider (e.g., Neon, Supabase, Aiven)
- **Apache Kafka & Zookeeper**: Running locally on `127.0.0.1:9092` (or via Docker)

---

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/HeyAdin/autom8.git
cd autom8
npm install
```

### 2. Environment Configuration

Create or update `.env` files in the respective app directories:

#### Root `.env` / `packages/db/.env`

```env
DATABASE_URL="postgresql://<user>:<password>@127.0.0.1:5432/autom8?schema=public"
```

#### `apps/primary-backend/.env`

```env
DATABASE_URL="postgresql://<user>:<password>@127.0.0.1:5432/autom8?schema=public"
JWT_SECRET="your_jwt_secret_key"
SMTP_ENDPOINT="smtp.resend.com"
SMTP_USER="resend"
SMTP_PASSWORD="your_smtp_api_key"
```

#### `apps/primary-frontend/.env`

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
BACKEND_JWT_SECRET="your_jwt_secret_key"
DATABASE_URL="postgresql://<user>:<password>@127.0.0.1:5432/autom8?schema=public"
# Optional OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_AUTH_KEY="your_google_client_secret"
```

#### `apps/hooks/.env`

```env
DATABASE_URL="postgresql://<user>:<password>@127.0.0.1:5432/autom8?schema=public"
```

#### `apps/worker/.env`

```env
DATABASE_URL="postgresql://<user>:<password>@127.0.0.1:5432/autom8?schema=public"
SMTP_ENDPOINT="smtp.resend.com"
SMTP_USER="resend"
SMTP_PASSWORD="your_smtp_api_key"
```

---

### 3. Database Setup & Seeding

Generate the Prisma client, push migrations, and seed initial triggers and actions:

```bash
# Generate Prisma client and sync schema
npm run db:generate --workspace=@repo/db
npm run db:migrate --workspace=@repo/db

# Seed default Available Triggers and Actions
npm run db:seed --workspace=@repo/db
```

Default seeded items:

- **Triggers**: `Webhook`, `File Upload`, `Form Submission`
- **Actions**: `Send Email`, `Download PDF`, `Send Solana`

---

### 4. Start Kafka Broker

If running Kafka locally via Docker:

```bash
docker run -d --name kafka \
  -p 9092:9092 \
  -e KAFKA_ENABLE_KRAFT=yes \
  -e KAFKA_CFG_NODE_ID=1 \
  -e KAFKA_CFG_PROCESS_ROLES=broker,controller \
  -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
  -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 \
  -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT \
  -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092 \
  -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@127.0.0.1:9093 \
  -e ALLOW_PLAINTEXT_LISTENER=yes \
  bitnami/kafka:latest
```

Ensure the topic `autom-events` exists (Kafka will automatically create it on first message if `auto.create.topics.enable` is enabled).

---

### 5. Run the Application

Launch all services concurrently using Turborepo:

```bash
npm run dev
```

Alternatively, run specific services individually:

```bash
# Frontend (Port 3000)
npm run dev --workspace=web

# Primary REST Backend (Port 3004)
npm run dev --workspace=primary-backend

# Webhooks Ingestion (Port 3001)
npm run dev --workspace=hooks

# Outbox Processor
npm run dev --workspace=processor

# Kafka Worker
npm run dev --workspace=worker
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the Autom8 dashboard.

---

## 📡 API & Service Endpoints

### 1. Webhook Ingestion Service (`apps/hooks` — Port 3001)

| Method | Endpoint                        | Description                                                |
| :----- | :------------------------------ | :--------------------------------------------------------- |
| `POST` | `/health`                       | Healthcheck endpoint                                       |
| `POST` | `/hooks/catch/:userId/:automId` | Triggers an execution run for the specified user and autom |

#### Sample Webhook Payload

```bash
curl -X POST http://localhost:3001/hooks/catch/<USER_ID>/<AUTOM_ID> \
  -H "Content-Type: application/json" \
  -d '{
    "comment": {
      "amount": "0.5",
      "address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      "email": "recipient@example.com"
    }
  }'
```

---

### 2. Primary Backend API (`apps/primary-backend` — Port 3004)

| Method | Endpoint                    | Auth Required | Description                             |
| :----- | :-------------------------- | :-----------: | :-------------------------------------- |
| `POST` | `/api/v1/user/signup`       |      No       | Register a new user                     |
| `POST` | `/api/v1/user/signin`       |      No       | Login and receive JWT                   |
| `POST` | `/api/v1/user/sent-otp`     |      Yes      | Request profile email verification OTP  |
| `POST` | `/api/v1/user/verify-email` |      Yes      | Verify email OTP                        |
| `GET`  | `/api/v1/user/`             |      Yes      | Get current user profile                |
| `POST` | `/api/v1/autom`             |      Yes      | Create and publish a new autom workflow |
| `GET`  | `/api/v1/autom`             |      Yes      | List all automs created by the user     |
| `GET`  | `/api/v1/trigger/available` |      Yes      | List all available triggers             |
| `GET`  | `/api/v1/action/available`  |      Yes      | List all available actions              |

---

## 🛠 Available Scripts

From the repository root:

| Command               | Description                                          |
| :-------------------- | :--------------------------------------------------- |
| `npm run dev`         | Starts all apps and packages in watch/dev mode       |
| `npm run build`       | Builds all packages and services using Turborepo     |
| `npm run lint`        | Runs ESLint across the monorepo                      |
| `npm run check-types` | Type-checks all TypeScript packages and applications |
| `npm run format`      | Formats code with Prettier                           |

---

## 🗺 Roadmap

- [ ] Visual workflow drag-and-drop canvas with condition branching.
- [ ] Live execution run logs and status tracking dashboard.
- [ ] Dead-letter queue (DLQ) for failed Kafka worker actions and retry strategies.
- [ ] OAuth integration for third-party services (Google Sheets, Discord, GitHub, Slack).
- [ ] Rate limiting and webhook signature verification (`HMAC-SHA256`).

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
