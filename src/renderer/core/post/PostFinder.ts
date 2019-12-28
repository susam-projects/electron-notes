import { IPostFinder } from "../../ui/Page/IPostFinder";
import { IPostListPostInfo } from "../../ui/Page/PostListPage/IPostListPostInfo";
import { IPostPagePostInfo } from "../../ui/Page/SinglePostPage/IPostPagePostInfo";

export class PostFinder implements IPostFinder {
    getAllPosts(): IPostListPostInfo[] {
        console.log(`getting all posts`);
        const posts: IPostListPostInfo[] = [
            {
                content: "post test content",
                author: "Test Author",
                title: "Post Title",
                id: "1",
            },
            {
                content: "post test content",
                author: "Test Author",
                title: "Post Title",
                id: "2",
            },
            {
                content: "post test content",
                author: "Test Author",
                title: "Post Title",
                id: "3",
            },
        ];
        return posts;
    }

    getPostById(id: string): IPostPagePostInfo {
        console.log(`getting post ${id}`);
        return {
            id: "1",
            content: "post test content",
            title: "Test Title",
            author: "Post Author",
        };
    }

    getNextPost(postId: string): IPostPagePostInfo {
        console.log(`getting post next of ${postId}`);
        return {
            id: "2",
            content: "post test content",
            title: "Test Next Title",
            author: "Post Author"
        }
    }

    getPrevPost(postId: string): IPostPagePostInfo {
        console.log(`getting post prev to ${postId}`);
        return {
            id: "0",
            content: "post test content",
            title: "Test Prev Title",
            author: "Post Author"
        }
    }
}
