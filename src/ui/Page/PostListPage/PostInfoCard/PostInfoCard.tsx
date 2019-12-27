import * as React from "react";
import { truncate } from "lodash";

const styles = require("./PostInfoCard.scss");

export interface IPostInfo {
    id: string;
    title: string;
    content: string;
    author: string;
}

interface IPostInfoCardProps {
    post: IPostInfo;
}

const CONTENT_PREVIEW_MAX_LENGTH = 100;

export class PostInfoCard extends React.Component<IPostInfoCardProps> {
    render() {
        const { post } = this.props;
        const contentPreview = truncate(post.content, {
            length: CONTENT_PREVIEW_MAX_LENGTH,
        });
        return (
            <div className={styles.card}>
                <div>{post.title}</div>
                <div>{post.author}</div>
                <div>{contentPreview}</div>
            </div>
        );
    }
}
