import { JsonPostRepository } from "./json-post-repository";
import { PostRepository } from "./post-repository";

// tipagem, que garante que só tera os metodos presentes na interface PostRepository
export const postRepository: PostRepository = new JsonPostRepository();