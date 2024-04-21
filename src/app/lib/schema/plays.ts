import { relations } from "drizzle-orm";
import { inet, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { radios } from "./radios";

export const plays = pgTable("plays", {
  id: serial("id").notNull().primaryKey(),
  ip: inet("ip"),
  userId: text("user_id"),
  radioId: integer("radio_id"),
  
});

export const playsRelations = relations(plays, ({ many }) => ({
  radios: many(radios),
}));
