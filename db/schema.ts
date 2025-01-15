import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const eventsTable = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  date: timestamp('date').notNull(),
  description: text('description'),
})