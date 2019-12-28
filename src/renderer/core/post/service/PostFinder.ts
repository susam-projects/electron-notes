import { IPostFinder } from "../../../ui/Page/IPostFinder";
import { IPostListPostInfo } from "../../../ui/Page/PostListPage/IPostListPostInfo";
import { IPostPagePostInfo } from "../../../ui/Page/SinglePostPage/IPostPagePostInfo";
import { IPostStorage } from "./IPostStorage";

export class PostFinder implements IPostFinder {
    constructor(private readonly storage: IPostStorage) {}

    getAllPosts(): Promise<IPostListPostInfo[]> {
        console.log(`getting all posts`);
        return this.storage.getAll();
    }

    getPostById(id: string): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post ${id}`);
        return this.storage.get(id);
    }

    getNextPost(postId: string): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post next of ${postId}`);
        return this.storage.get(postId);
    }

    getPrevPost(postId: string): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post prev to ${postId}`);
        return this.storage.get(postId);
    }
}
