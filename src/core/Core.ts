import { IPostInfo } from "../ui/Page/PostListPage/PostInfoCard/PostInfoCard";

export class Core {
    getAllPosts() {
        const posts: IPostInfo[] = [
            { content: "post test content", author: "Test Author", title: "Post Title", id: "1" },
            { content: "post test content", author: "Test Author", title: "Post Title", id: "2" },
            { content: "post test content", author: "Test Author", title: "Post Title", id: "3" },
        ];
        return posts;
    }
}
