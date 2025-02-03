import type { user } from "@/lib/db/schema";
import lucia from "@/lib/auth";
import type { InferSelectModel } from "drizzle-orm";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }

  interface DatabaseUserAttributes extends InferSelectModel<typeof user> {}
}

declare module "hono" {
  interface Context {
    user: User | null;
    session: Session | null;
  }
}

declare global {
  interface User {
    id: string;
  }

  interface Session {
    id: string;
  }
}
