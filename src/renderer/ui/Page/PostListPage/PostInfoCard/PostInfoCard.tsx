import * as React from "react";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { IPostListPostInfo } from "../IPostListPostInfo";

const styles = require("./PostInfoCard.scss");

interface IPostInfoCardProps {
  post: IPostListPostInfo;
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
        <div className={styles.showPostContainer}>
          <Link to={`/post/${post.id}`}>Читать далее</Link>
        </div>
      </div>
    );
  }
}
