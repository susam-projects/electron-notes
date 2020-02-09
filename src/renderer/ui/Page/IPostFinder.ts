import { IPostListPostInfo } from "./PostListPage/IPostListPostInfo";
import { IPostPagePostInfo } from "./SinglePostPage/IPostPagePostInfo";
import { IEditPostPagePostInfo } from "./EditPostPage/IEditPostPagePostInfo";

export interface IPostFinder {
    getAllPosts(): Promise<IPostListPostInfo[]>;
    getPostById(postId: number): Promise<IPostPagePostInfo | undefined>;
    getPrevPost(postId: number): Promise<IPostPagePostInfo | undefined>;
    getNextPost(postId: number): Promise<IPostPagePostInfo | undefined>;
    getPostForEditor(postId: number): Promise<IEditPostPagePostInfo | undefined>;
}
