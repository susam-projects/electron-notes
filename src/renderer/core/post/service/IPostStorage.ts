import { IPostData, IStoredPost, TPostDate, TPostId } from "./IStoredPost";

export interface IPostStorage {
    add(post: IPostData): Promise<TPostId>;
    remove(postId: TPostId): Promise<void>;
    update(postId: TPostId, changes: Partial<IPostData>): Promise<void>;
    clear(): Promise<void>;
    get(postId: TPostId): Promise<IStoredPost>;
    getAll(): Promise<IStoredPost[]>;
    getAllReversed(): Promise<IStoredPost[]>;
    getFromDateAndOlder(postDate: TPostDate): Promise<IStoredPost[]>;
    getFromDateAndMoreRecent(postDate: TPostDate): Promise<IStoredPost[]>;
}
