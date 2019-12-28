export interface IStoredPost extends IPostData {
    id: TPostId;
}

export type TPostId = string;

export interface IPostData {
    title: string;
    author: string;
    content: string;
    postDate: number;
}
