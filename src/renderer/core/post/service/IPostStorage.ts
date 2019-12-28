import { IPostData, IStoredPost, TPostId } from "./IStoredPost";

export interface IPostStorage {
    add(post: IPostData): Promise<TPostId>;
    remove(postId: TPostId): Promise<void>;
    update(postId: TPostId, changes: Partial<IPostData>): Promise<void>;
    clear(): Promise<void>;
    get(postId: TPostId): Promise<IStoredPost>;
    getAll(): Promise<IStoredPost[]>;
}
