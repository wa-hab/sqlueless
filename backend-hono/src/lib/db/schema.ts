import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
  index,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

export const user = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),

    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),

    created_at: timestamp("created_at").defaultNow(),
  },
  (user) => ({
    email_index: index("email_idx").on(user.email),
    name_index: index("name_idx").on(user.name),
  }),
);

export const password = mysqlTable(
  "password",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => user.id),

    hash: text("hash").notNull(),

    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
  }),
);

export const session = mysqlTable(
  "session",
  {
    id: varchar("id", { length: 128 }).primaryKey(),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => user.id),
    expiresAt: timestamp("expires_at", {
      mode: "date",
    }).notNull(),
  },
  (table) => ({
    userIdIdx: index("user_id_session_idx").on(table.userId),
  }),
);
