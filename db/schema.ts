import { integer, sqliteTable,text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
    username: text("username").notNull().unique(),
    password_hash: text("password_hash").notNull(),
});

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull()
});

export const paymentTable = sqliteTable("payment", {
    id: text("id").notNull().primaryKey(),
	userId: text("user_id").notNull().references(() => userTable.id),
    productId: text("product_id").notNull().references(() => itemsTable.id),
    userEmail: text("user_email").notNull(),
    amount: integer("amount").notNull(),
    paymentDetails: text("payment_details").notNull(),
    paymentType: text("payment_type").notNull(),
    createdDate: text("created_date").notNull(),
    currency: text("currency"),
});

export const itemsTable = sqliteTable("items", {
    id: text("id").notNull().primaryKey(),
    productName: text("productName").notNull().unique(),
    image: text("image").notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
});
