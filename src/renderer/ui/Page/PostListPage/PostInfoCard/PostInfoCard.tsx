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
      <article className="post-preview">
        <Link to={`/post/${post.id}`}>
          <h2 className="post-title">{post.title}</h2>
          <h3 className="post-subtitle">{post.subtitle}</h3>
        </Link>

        <p className="post-meta">
          <span className="post-meta">
            <i className="fas fa-calendar"></i>&nbsp;Опубликовано {formatDate(post.postDate)}
            &nbsp;|&nbsp;<i className="fas fa-clock"></i>&nbsp;2&nbsp;минут &nbsp;|&nbsp;
            <i className="fas fa-book"></i>&nbsp;275&nbsp;слова &nbsp;|&nbsp;
            <i className="fas fa-user"></i>&nbsp;{post.author}
          </span>
        </p>
        <div className="post-entry">
          {post.content}
          <Link to={`/post/${post.id}`} className="post-read-more">
            [Далее]
          </Link>
        </div>
      </article>
    );
  }
}

function formatDate(date: number) {
  return (new Date(date)).toLocaleDateString();
}
