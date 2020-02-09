import { IPostFinder } from "../../../ui/Page/IPostFinder";
import { IPostListPostInfo } from "../../../ui/Page/PostListPage/IPostListPostInfo";
import { IPostPagePostInfo } from "../../../ui/Page/SinglePostPage/IPostPagePostInfo";
import { IPostStorage } from "./IPostStorage";
import { IStoredPost } from "./IStoredPost";
import { IEditPostPagePostInfo } from "../../../ui/Page/EditPostPage/IEditPostPagePostInfo";

export class PostFinder implements IPostFinder {
    constructor(private readonly storage: IPostStorage) {}

    async getAllPosts(): Promise<IPostListPostInfo[]> {
        console.log(`getting all posts`);
        const storedPosts = await this.storage.getAllReversed();
        return storedPosts.map(storedPostToPostListPostInfo);
    }

    async getPostById(id: number): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post ${id}`);
        const storedPost = await this.storage.get(id);
        return storedPost && storedPostToPostPagePostInfo(storedPost);
    }

    async getPostForEditor(id: number): Promise<IEditPostPagePostInfo | undefined> {
        console.log(`getting post ${id}`);
        const storedPost = await this.storage.get(id);
        return storedPost && storedPostToEditPostInfo(storedPost);
    }

    async getNextPost(postId: number): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post next of ${postId}`);

        const storedPost = await this.storage.get(postId);
        if (!storedPost) return;

        const postsFromDate = await this.storage.getFromDateAndMoreRecent(storedPost.postDate);
        const moreRecentPosts = postsFromDate.filter((post) => post.id !== postId);
        return moreRecentPosts[0] && storedPostToPostPagePostInfo(moreRecentPosts[0]);
    }

    async getPrevPost(postId: number): Promise<IPostPagePostInfo | undefined> {
        console.log(`getting post prev to ${postId}`);

        const storedPost = await this.storage.get(postId);
        if (!storedPost) return;

        const postsFromDate = await this.storage.getFromDateAndOlder(storedPost.postDate);
        const olderPosts = postsFromDate.filter((post) => post.id !== postId);
        const prevPost = olderPosts[olderPosts.length - 1];
        return prevPost && storedPostToPostPagePostInfo(prevPost);
    }
}

function storedPostToPostListPostInfo(storedPost: IStoredPost): IPostListPostInfo {
    return {
        id: storedPost.id,
        author: storedPost.author,
        title: storedPost.title,
        subtitle: storedPost.subtitle,
        content: storedPost.content,
        postDate: storedPost.postDate,
    };
}

function storedPostToPostPagePostInfo(storedPost: IStoredPost): IPostPagePostInfo {
    return {
        id: storedPost.id,
        author: storedPost.author,
        title: storedPost.title,
        subtitle: storedPost.subtitle,
        content: storedPost.content,
        postDate: storedPost.postDate,
    };
}

function storedPostToEditPostInfo(storedPost: IStoredPost): IEditPostPagePostInfo {
    return {
        id: storedPost.id,
        author: storedPost.author,
        title: storedPost.title,
        subtitle: storedPost.subtitle,
        content: storedPost.content,
        postDate: storedPost.postDate,
    };
}
