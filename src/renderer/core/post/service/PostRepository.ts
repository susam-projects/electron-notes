import { IPostRepository } from "../../../ui/Page/IPostRepository";
import { ICreatePostInfo } from "../../../ui/Page/ICreatePostInfo";
import { IPostStorage } from "./IPostStorage";
import { IPostData } from "./IStoredPost";

export class PostRepository implements IPostRepository {
    constructor(private readonly storage: IPostStorage) {}

    async addPost(postInfo: ICreatePostInfo): Promise<string> {
        const postData: IPostData = {
            ...postInfo,
            postDate: Date.now(),
        };
        return this.storage.add(postData);
    }

    async updatePostContent(postId: string, content: string): Promise<void> {
        return this.storage.update(postId, { content });
    }

    async updatePostTitle(postId: string, title: string): Promise<void> {
        return this.storage.update(postId, { title });
    }

    async clear(): Promise<void> {
        return this.storage.clear();
    }
}
