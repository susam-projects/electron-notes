import { IPostListPostInfo } from "./PostListPage/IPostListPostInfo";
import { IPostPagePostInfo } from "./SinglePostPage/IPostPagePostInfo";

export interface IPostFinder {
    getAllPosts(): Promise<IPostListPostInfo[]>;
    getPostById(postId: string): Promise<IPostPagePostInfo | undefined>;
    getPrevPost(postId: string): Promise<IPostPagePostInfo | undefined>;
    getNextPost(postId: string): Promise<IPostPagePostInfo | undefined>;
}
