# Blogs App

[![Build and Deploy](https://github.com/anmolshah80/blogs-app/actions/workflows/deploy_production.yml/badge.svg)](https://github.com/anmolshah80/blogs-app/actions/workflows/deploy_production.yml)

- [Project Deployed Link](https://blogs-app-sooty.vercel.app/)
- Blog platform with user register, login, post creation, editing, listing, and deletion functionality
- Create `use-posts` custom hook to fetch blogs data from postgres database
- Add pagination to only render a certain number of posts per page
- Fix pagination for blog posts
- Fix loading spinner and error message UI
- Create reusable `text-form-field` and `textarea-form-field` components to render `input text` and `textarea` fields
- Add `sonner` UI component from `Shadcn` to render `success` and `error` toasts
- Create `create-form` component to implement `zod` validation and integrate `react hook form` to submit form data
- Add `useEffect` hook to render success or error toast messages while creating the blog post
- Create `login` and `register` pages
- Add `useRouter` hook from `next/navigation` to navigate to home page after a blog post is created or updated
- Create `proxy.ts` next.js middleware to manage protected and public routes, and redirect unauthorized users
- Create `app/actions.ts` server actions to create, update and delete posts
- Create `app/api/auth/login/actions.ts` server actions to register users in database, create login and logout sessions
- Add `bcryptjs` npm package to hash the password before storing it in the database
- Create blogs page to render the header component and blogs list from a database
- Add validation and form errors to register & login pages, and create & edit forms of blog posts
- Create a delete modal to confirm the deletion of posts
- Create `lib/db.ts` to instantiate a single global object of prisma client
- Create server only `getPost` and `getPosts` server utils to fetch individual or all available posts from the database respectively
- Create `lib/session.ts` to create a json web token (jwt) and store it in cookies
- Create a `prisma/schema.prisma` to create database schema for `Post` and `User` models
- Create `prisma/seeders/data.ts` and `prisma/seeders/seed.ts` to populate the database with dummy data
- Fix eslint warnings and errors

## Local Setup

- Clone this [git repository](https://github.com/anmolshah80/blogs-app.git)

- Change directory to `blogs-app` and install the npm packages

  ```bash
  cd blogs-app

  pnpm install
  ```

- Create an `.env` file in the root directory inside `blogs-app` folder with the following contents. Look for the detailed information on `DATABASE_URL` key contents below in the `PostgreSQL Setup (Local & Vercel)` section

  ```properties
  DATABASE_URL="postgresql://<postgres_superuser_name>:<superuser_password>@localhost:<postgres_server_port>/<database_name>?schema=public"
  ```

  _Note: Please ensure you have [PostgreSQL](https://www.postgresql.org/download/) installed in your local machine_

- After you are done with postgres setup, run the development server

  ```bash
  pnpm dev
  ```

  Then, open [localhost](http://localhost:3000) in your browser to see the result.

## PostgreSQL Setup (Local & Vercel)

- Configure prisma with default database i.e., postgres. It will create a `schema.prisma` file in the `prisma` folder.

  ```bash
  npx prisma init
  ```

  - Create tables after defining your models in `schema.prisma` file

    ```bash
    npx prisma db push
    ```

  - Edit the `DATABASE_URL` value in `.env` file for postgres

    ```properties
    DATABASE_URL="postgresql://<postgres_superuser_name>:<superuser_password>@localhost:<postgres_server_port>/<database_name>?schema=public"
    ```

    | Key                     | Description                                               |
    | ----------------------- | --------------------------------------------------------- |
    | postgres_superuser_name | Usually it's `postgres` itself                            |
    | superuser_password      | Superuser's password set during installation              |
    | postgres_server_port    | Usually it's `5432` or `5433`                             |
    | database_name           | Your desired database name (for e.g., `blogs-app-db-dev`) |

    _Note: If you have multiple versions of postgres installed in your pc (let's say v14 and v17). To use the specific one, say v17 (the server where you would want to create your database), go to `C:\Program Files\PostgreSQL\17\installation_summary.log` (in Windows) and look for port info within the log._

    _Note: Remove all angular brackets before saving the contents in `.env` file_

  - Execute the seed command defined under the `prisma` key in `package.json`. [Source](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript)

    ```bash
    npx prisma db seed
    ```

  - Open Prisma Studio to view the seeded data from the database

    ```bash
    npx prisma studio
    ```

  - Resources
    - [How to Build a Fullstack App with Next.js, Prisma, and Postgres](https://vercel.com/guides/nextjs-prisma-postgres)
    - [How to use Prisma ORM with Next.js](https://www.prisma.io/docs/guides/nextjs#introduction)

- `5433` is the port for `PostgreSQL v17` meanwhile `5432` is the port for `PostgreSQL v14` (it's my personal local configuration)

  - To confirm the port for `PostgreSQL v14`, read the log from `C:\Program Files\PostgreSQL\14\installation_summary.log`

- Setup Prisma Postgres database in Vercel

  - Create a [Prisma Postgres database in Vercel](https://vercel.com/dashboard/stores)

  - Copy the `.env.local` contents of your newly created prisma postgres database, into your local `.env` file

  - Create the tables in your newly created prisma postgres database, defined in your `schema.prisma` file using the following command (from your local bash terminal)

    ```bash
    npx prisma db push
    ```

  - Once the tables are created, you can seed your data to your remote prisma postgres database via the following command (given that you have a `seed.ts` file in your `prisma/seeders` folder)

    ```bash
    npx prisma db seed
    ```

  - Visit [Prisma Console](https://console.prisma.io/) to view the data seeded into your prisma postgres database

## Notes

- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
