import * as React from "react";
import { PostInfoCard } from "./PostInfoCard/PostInfoCard";
import { IPostListPostInfo } from "./IPostListPostInfo";
import { Link } from "react-router-dom";
import Pager from "../../Component/Pager/Pager";

interface IPostListPageContentProps {
  posts: IPostListPostInfo[];
  nextPageUrl?: string;
  prevPageUrl?: string;
  onAddNewPostClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  createSinglePostPageUrl: (postId: number) => string;
}

class PostListPageContent extends React.Component<IPostListPageContentProps> {
  render() {
    const {
      posts,
      nextPageUrl,
      prevPageUrl,
      onAddNewPostClick,
      createSinglePostPageUrl,
    } = this.props;

    return (
      <>
        <header className="header-section ">
          <div className="intro-header no-img">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <div className="page-heading">
                    <h1>Актуальные записи</h1>
                    <hr className="small" />
                    <span className="page-subheading">Notes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container" role="main">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <ul className="pager new-post">
                <li className="previous">
                  <a href="#" onClick={onAddNewPostClick}>
                    Новый пост
                  </a>
                </li>
              </ul>

              <div className="posts-list">
                {posts.map((post) => (
                  <PostInfoCard
                    post={post}
                    key={post.id}
                    postPageUrl={createSinglePostPageUrl(post.id)}
                  />
                ))}
              </div>

              <Pager
                className="main-pager"
                nextBtnLink={!!nextPageUrl && <Link to={nextPageUrl}>Новые записи&rarr;</Link>}
                prevBtnLink={!!prevPageUrl && <Link to={prevPageUrl}>&larr;Предыдущие записи</Link>}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PostListPageContent;
