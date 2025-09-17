import { drizzleDb } from "."
import { postTable } from "./schemas";

(async () => {
    const posts = await drizzleDb.select().from(postTable);

    console.log(posts);
})()