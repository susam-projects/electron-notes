import { IPostFinder } from "../../../ui/Page/IPostFinder";
import { IPostListPostInfo } from "../../../ui/Page/PostListPage/IPostListPostInfo";
import { IPostPagePostInfo } from "../../../ui/Page/SinglePostPage/IPostPagePostInfo";
import { IPostStorage } from "./IPostStorage";

export class PostFinder implements IPostFinder {
    constructor(private readonly storage: IPostStorage) {}

    async getAllPosts(): Promise<IPostListPostInfo[]> {
        console.log(`getting all posts`);
        const storedPosts = await this.storage.getAllReversed();
        return storedPosts.map((storedPost) => ({
            id: storedPost.id,
            author: storedPost.author,
            title: storedPost.title,
            subtitle: "",
            content: storedPost.content,
            postDate: storedPost.postDate,
        }));
    }

    getPostById(id: number): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post ${id}`);
        return this.storage.get(id);
    }

    async getNextPost(postId: number): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post next of ${postId}`);

        const post = await this.storage.get(postId);
        if (!post) return;

        const postsFromDate = await this.storage.getFromDateAndMoreRecent(post.postDate);
        const moreRecentPosts = postsFromDate.filter((post) => post.id !== postId);
        return moreRecentPosts[0];
    }

    async getPrevPost(postId: number): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post prev to ${postId}`);

        const post = await this.storage.get(postId);
        if (!post) return;

        const postsFromDate = await this.storage.getFromDateAndOlder(post.postDate);
        const olderPosts = postsFromDate.filter((post) => post.id !== postId);
        return olderPosts[olderPosts.length - 1];
    }
}
