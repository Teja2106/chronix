import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const projects = pgTable('projects', {
    id: uuid('id').primaryKey().$defaultFn(() => uuidv7()),
    name: varchar('name', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 120 }).notNull().unique(),
    description: text('description'),
    colour: varchar('colour', { length: 7 }).notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', {
        withTimezone: true
    }).defaultNow().notNull()
});