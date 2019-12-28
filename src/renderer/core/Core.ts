import { IPostFinder } from "../ui/Page/IPostFinder";
import { PostFinder } from "./post/PostFinder";
import { IPostRepository } from "../ui/Page/IPostRepository";
import { PostRepository } from "./post/PostRepository";

export class Core {
    readonly postFinder: IPostFinder = new PostFinder();
    readonly postRepository: IPostRepository = new PostRepository();
}
