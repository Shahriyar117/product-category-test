# Product Management Application

## Background

Product Management Application key features:

- Ability to create a product (from web and cli)
- A listing products with ability to sort by price, or/and filter by a category (from web)

This application is built using [tech stack details such as Node.js, Expressjs, Prisma, MySQL, Remix etc.] and follows a clean architecture to ensure reusability, readability and maintainability.

## Prerequisites

Ensure you have the following installed:

- Node.js
- Expressjs
- Typescript
- Remix
- MySQL
- Prisma CLI
- Git

## Getting Started

### Backend Application

#### Clone the Repository

First, clone the repository and navigate to the backend directory:

```sh
git clone https://github.com/Shahriyar117/product-category-test.git
cd product-category-test/backend
```

#### Set Up Environment Variables

Copy the .env.example file to create a new .env file:

```sh
cp .env.example .env
```

#### Configure Database

Set up your MySQL database and update the DATABASE_URL in the .env file with your database credentials:
`DATABASE_URL="mysql://user:password@localhost:3306/database_name"`

#### Install Dependencies

Install the required npm packages:

```sh
yarn
```

#### Run Database Migrations

Use Prisma to run the migrations and set up your database schema:

```sh
npx prisma migrate dev --name init
```

#### Start the Application

```sh
yarn run dev
```

Your application should now be running on `http://localhost:8800`

### Frontend Application

#### Move to the frontend directory

```sh
cd product-category-test/frontend
```

#### Install the dependencies:

```sh
npm install
```

#### Start the development server:

```sh
npm run dev
```

Your application should now be running on `http://localhost:5173/`

#### Chnage the backend port

- If you want to change the port of backend just need to update it in the config/index.ts file.
