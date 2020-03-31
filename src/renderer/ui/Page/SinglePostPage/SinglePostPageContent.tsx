import * as React from "react";
import { IPostPagePostInfo } from "./IPostPagePostInfo";
import Pager from "../../Component/Pager/Pager";
import PostMeta from "../../Component/PostMeta/PostMeta";
import MarkdownViewer from "../../Component/MarkdownViewer/MarkdownViewer";
import { Link } from "react-router-dom";

interface ISinglePostPageProps {
  post: IPostPagePostInfo;
  editPostUrl: string;
  onDeletePostClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  prevPost?: IPostPagePostInfo;
  prevPostUrl: string;
  nextPost?: IPostPagePostInfo;
  nextPostUrl: string;
}

class SinglePostPageContent extends React.Component<ISinglePostPageProps> {
  static defaultProps: Partial<ISinglePostPageProps> = {
    prevPostUrl: "",
    nextPostUrl: "",
  };

  render() {
    const {
      post,
      editPostUrl,
      onDeletePostClick,
      prevPost,
      prevPostUrl,
      nextPost,
      nextPostUrl,
    } = this.props;
    return (
      <>
        <header className="header-section ">
          <div className="intro-header no-img">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <div className="post-heading">
                    <h1>{post.title}</h1>
                    <h2 className="post-subheading">{post.subtitle}</h2>
                    <PostMeta
                      postDate={post.postDate}
                      author={post.author}
                      content={post.content}
                    />
                    <div className="post-control">
                      <span className="post-control-link post-edit">
                        <i className="fas fa-edit"></i>&nbsp;
                        <Link to={editPostUrl}>Редактировать</Link>
                      </span>
                      &nbsp;|&nbsp;
                      <span className="post-control-link post-delete">
                        <i className="fas fa-trash"></i>&nbsp;
                        <Link to={""} onClick={onDeletePostClick}>
                          Удалить
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container" role="main">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <article role="main" className="blog-post">
                <MarkdownViewer source={post.content} />
              </article>

              <Pager
                className="blog-pager"
                prevBtnLink={
                  prevPost && (
                    <Link
                      to={prevPostUrl}
                      data-toggle="tooltip"
                      data-placement="top"
                      title={prevPost.title}
                    >
                      &larr;Предыдущий
                    </Link>
                  )
                }
                nextBtnLink={
                  nextPost && (
                    <Link
                      to={nextPostUrl}
                      data-toggle="tooltip"
                      data-placement="top"
                      title={nextPost.title}
                    >
                      Следующий&rarr;
                    </Link>
                  )
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SinglePostPageContent;
