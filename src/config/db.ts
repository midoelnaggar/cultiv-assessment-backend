import { PrismaClient } from "@prisma/client";

// check to see if there is already an open connection 

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db;


export default db;