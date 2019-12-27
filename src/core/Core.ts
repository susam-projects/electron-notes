import { IPostPagePostInfo } from "../ui/Page/SinglePostPage/IPostPagePostInfo";
import { IPostListPostInfo } from "../ui/Page/PostListPage/IPostListPostInfo";

export class Core {
    // TODO: use interface
    readonly postFinder: PostFinder;

    constructor(
    ) {
        this.postFinder = new PostFinder();
    }
}

export class PostFinder {
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
            author: "Post Author"
        }
    }
}
