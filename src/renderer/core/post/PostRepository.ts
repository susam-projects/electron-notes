import { IPostRepository } from "../../ui/Page/IPostRepository";
import { ICreatePostInfo } from "../../ui/Page/ICreatePostInfo";

export class PostRepository implements IPostRepository {
    async addPost(postInfo: ICreatePostInfo): Promise<string> {
        return "";
    }

    async updatePostContent(postId: string, content: string): Promise<void> {
        return undefined;
    }

    async updatePostTitle(postId: string, title: string): Promise<void> {
        return undefined;
    }

    async clear(): Promise<void> {}
}
