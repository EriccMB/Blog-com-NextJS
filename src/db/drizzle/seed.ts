import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonRepository = new JsonPostRepository();
  const posts = await jsonRepository.findAll();

  try {
    // limpa os dados
    //await drizzleDb.delete(postTable);
    await drizzleDb.insert(postsTable).values(posts);
    console.log('Posts inseridos');
  } catch (e) {
    console.log(e);
  }
})();
