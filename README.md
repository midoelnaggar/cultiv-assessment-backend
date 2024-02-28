# Node.js Express App with Prisma, PostgreSQL, TypeScript

This is a Node.js Express application with TypeScript that provides a REST API for user authentication and contact management. It uses Prisma as the ORM (Object-Relational Mapping) tool and connects to a PostgreSQL database hosted on Supabase.

## Features

- Node.js version 18.18.2 or newer
- Prisma for ORM
- PostgreSQL with Supabase
- REST API for user authentication and contact management
- TypeScript for type safety

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/midoelnaggar/cultiv-assessment-backend.git

Create a .env file in the root directory with the following variables:

PORT=3000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret

You can use the data provided in the .env.example file and modify it accordingly.

Install dependencies:
npm install

Pull the database schema using Prisma:
npx prisma db pull

Generate Prisma client:
npx prisma generate

Run the server:
npm run dev
Now the server is up and running.

Integration with Frontend
To integrate this backend with a frontend project, you can make HTTP requests to the endpoints provided by the REST API for user authentication and contact management. Ensure to handle authentication using JWT tokens provided by the server.

Contributing
Contributions are welcome! Feel free to open issues or pull requests.

License
This project is licensed under the MIT License.
