export interface IStoredPost extends IPostData {
    id: TPostId;
}

export type TPostId = number;

export interface IPostData {
    title: string;
    subtitle: string;
    author: string;
    content: string;
    postDate: TPostDate;
}

export type TPostDate = number;
