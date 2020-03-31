import * as React from "react";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { IPostListPostInfo } from "../IPostListPostInfo";
import PostMeta from "../../../Component/PostMeta/PostMeta";
import MarkdownViewer from "../../../Component/MarkdownViewer/MarkdownViewer";

interface IPostInfoCardProps {
  post: IPostListPostInfo;
  postPageUrl: string;
}

const CONTENT_PREVIEW_MAX_LENGTH = 250;

export class PostInfoCard extends React.Component<IPostInfoCardProps> {
  render() {
    const { post, postPageUrl } = this.props;
    const contentPreview = truncate(post.content, {
      length: CONTENT_PREVIEW_MAX_LENGTH,
    });
    return (
      <article className="post-preview">
        <Link to={postPageUrl}>
          <h2 className="post-title">{post.title}</h2>
          <h3 className="post-subtitle">{post.subtitle}</h3>
        </Link>

        <p className="post-meta">
          <PostMeta postDate={post.postDate} author={post.author} content={post.content} />
        </p>
        <div className="post-entry">
          <MarkdownViewer source={contentPreview} />
          <Link to={postPageUrl} className="post-read-more">
            [Далее]
          </Link>
        </div>
      </article>
    );
  }
}
