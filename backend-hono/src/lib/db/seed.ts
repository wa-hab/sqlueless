import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { user } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  // Insert users
  const user1 = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
  };

  const user2 = {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
  };

  await db.insert(user).values([user1, user2]);
  console.log("Sample users created!");

  // Query examples
  const allUsers = await db.select().from(user);
  console.log("All users:", allUsers);

  process.exit(0);
}

main();
