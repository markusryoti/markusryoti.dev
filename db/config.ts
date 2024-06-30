import { NOW, column, defineDb, defineTable } from "astro:db";

const Users = defineTable({
  columns: {
    email: column.text({ unique: true, primaryKey: true }),
    createdAt: column.date({ default: NOW }),
  },
});

const Inquiries = defineTable({
  columns: {
    id: column.text({ unique: true, primaryKey: true }),
    email: column.text(),
    subject: column.text(),
    message: column.text(),
    createdAt: column.date({ default: NOW }),
  },
});

export default defineDb({
  tables: { Users, Inquiries },
});
