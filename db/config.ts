import { NOW, column, defineDb, defineTable } from "astro:db";

const Users = defineTable({
  columns: {
    email: column.text({ unique: true, primaryKey: true }),
    createdAt: column.date({ default: NOW }),
  },
});

export default defineDb({
  tables: { Users },
});
