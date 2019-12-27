import { IPostListPostInfo } from "./PostListPage/IPostListPostInfo";
import { IPostPagePostInfo } from "./SinglePostPage/IPostPagePostInfo";

// TODO: use promises
export interface IPostFinder {
    getAllPosts(): IPostListPostInfo[];
    getPostById(postId: string): IPostPagePostInfo;
    getPrevPost(postId: string): IPostPagePostInfo | undefined;
    getNextPost(postId: string): IPostPagePostInfo | undefined;
}
