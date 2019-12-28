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

    async getNextPost(postId: string): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post next of ${postId}`);

        const post = await this.storage.get(postId);
        if (!post) return;

        const postsFromDate = await this.storage.getFromDateAndMoreRecent(post.postDate);
        const moreRecentPosts = postsFromDate.filter(post => post.id !== postId);
        return moreRecentPosts[0];
    }

    async getPrevPost(postId: string): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post prev to ${postId}`);

        const post = await this.storage.get(postId);
        if (!post) return;

        const postsFromDate = await this.storage.getFromDateAndOlder(post.postDate);
        const olderPosts = postsFromDate.filter(post => post.id !== postId);
        return olderPosts[olderPosts.length - 1];
    }
}
