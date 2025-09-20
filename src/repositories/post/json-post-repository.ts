import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

// pega o caminho root do projeto
const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json'
);
const TIMEOUT = 0;

export class JsonPostRepository implements PostRepository {
  private async timeoutLoad() {
    if (TIMEOUT <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT));
  }
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonData = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJsonData = JSON.parse(jsonData);
    const { posts } = parsedJsonData;
    return posts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.timeoutLoad();
    const posts = await this.readFromDisk();
    return posts.filter((post) => post.published);
  }

   async findAll(): Promise<PostModel[]> {
    await this.timeoutLoad();
    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublished();
    const post = posts.find((post) => post.id === id);
    if (!post) throw new Error('Post não encontrado');
    return post;
  }

  async findBySlug(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublished();
    const post = posts.find(post => post.slug === slug);
    if(!post) throw new Error('Post não encontrado');
    return post;
  }
}
