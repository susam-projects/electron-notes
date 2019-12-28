import { IPostFinder } from "../ui/Page/IPostFinder";
import { PostFinder } from "./post/service/PostFinder";
import { IPostRepository } from "../ui/Page/IPostRepository";
import { PostRepository } from "./post/service/PostRepository";
import { PostStorage } from "./post/storage/PostStorage";

const postStorage = new PostStorage();

export class Core {
    readonly postFinder: IPostFinder = new PostFinder(postStorage);
    readonly postRepository: IPostRepository = new PostRepository(postStorage);
}
