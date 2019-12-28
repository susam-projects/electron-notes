import { ICreatePostInfo } from "./ICreatePostInfo";

export interface IPostRepository {
    addPost(postInfo: ICreatePostInfo): Promise<number>;
    updatePostTitle(postId: number, title: string): Promise<void>;
    updatePostContent(postId: number, content: string): Promise<void>;
    deletePost(postId: number): Promise<void>;
}
