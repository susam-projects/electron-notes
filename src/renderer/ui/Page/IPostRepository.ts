import { ICreatePostInfo } from "./ICreatePostInfo";

export interface IPostRepository {
    addPost(postInfo: ICreatePostInfo): Promise<string>;
    updatePostTitle(postId: string, title: string): Promise<void>;
    updatePostContent(postId: string, content: string): Promise<void>;
}
