import { PrismaClient } from "@prisma/client";

class Database {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["error"],
      });
    }
    return Database.instance;
  }
}

const prisma = Database.getInstance();
export default prisma;
