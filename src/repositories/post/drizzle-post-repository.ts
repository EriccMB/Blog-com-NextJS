import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { error } from 'console';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    console.log('\n', 'Drizzle findAllPublic', '\n');
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    console.log('\n', 'Drizzle findBySlugPublic', '\n');
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.published, true), eq(post.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado');
    return post;
  }
  async findAll(): Promise<PostModel[]> {
    console.log('\n', 'Drizzle findAll', '\n');
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    console.log('\n', 'Drizzle findById', '\n');
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado');

    return post;
  }
}

// (async () => {
//   const repo = new DrizzlePostRepository();

//   const posts = await repo.findAllPublic();
//   posts.forEach((post) => {
//     console.log(post.slug, post.published);
//   });

//   await repo.findBySlugPublic('rsotina-matinal-de-pessoas-altamente-eficazes');

//   const posts = await repo.findAll();
//   posts.forEach((post) => {
//     console.log(post.id, post.published);
//   });

//   const post = await repo.findById('99f8adsd4-7684-4c16-a316-616271db199e');
//   console.log(post.id, post.published);
// })();
