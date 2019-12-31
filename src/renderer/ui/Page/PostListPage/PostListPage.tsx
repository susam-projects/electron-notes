import * as React from "react";
import { PostInfoCard } from "./PostInfoCard/PostInfoCard";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostListPostInfo } from "./IPostListPostInfo";
import { boundMethod } from "autobind-decorator";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Pager from "../../BaseComponents/Pager/Pager";

const styles = require("./PostListPage.scss");

interface IPostListPageProps extends RouteComponentProps {}

interface IPostListPageState {
  posts: IPostListPostInfo[];
}

class PostListPage extends React.Component<IPostListPageProps, IPostListPageState> {
  static contextType = AppContext;
  context: IAppContext;
  state: IPostListPageState = {
    posts: [],
  };

  async componentDidMount() {
    const allPosts = await this.context.core.postFinder.getAllPosts();
    this.setState({ posts: allPosts });
  }

  render() {
    const { posts } = this.state;
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
                    <span className="page-subheading">Самовыражение и свобода мысли!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container" role="main">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <button onClick={this.onAddNewPostClick}>Новый пост</button>

              <div className="posts-list">
                {posts.map((post) => (
                  <PostInfoCard post={post} key={post.id} />
                ))}
              </div>

              <Pager
                nextBtnText="Предыдущие записи"
                prevBtnText="Новые записи"
                nextBtnLink={`/post-list/page/1`}
                prevBtnLink={`/post-list/page/2`}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  @boundMethod
  async onAddNewPostClick(event: React.MouseEvent<HTMLButtonElement>) {
    const postRepository = this.context.core.postRepository;

    const newPostId = await postRepository.addPost({
      title: "Sample Title",
      author: "Post Author",
      content: "Type your content here...",
    });

    this.props.history.push(`/edit-post/${newPostId}`);
  }
}

export default withRouter(PostListPage);
