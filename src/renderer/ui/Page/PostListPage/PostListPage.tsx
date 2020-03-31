import * as React from "react";
import { PostInfoCard } from "./PostInfoCard/PostInfoCard";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostListPostInfo } from "./IPostListPostInfo";
import { boundMethod } from "autobind-decorator";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import Pager from "../../Component/Pager/Pager";

const PAGE_SIZE = 5;

interface IPostListPageProps extends RouteComponentProps<IPostListPageRouteParams> {}

interface IPostListPageRouteParams {
  number: string;
}

interface IPostListPageState {
  posts: IPostListPostInfo[];
  havePrevPost: boolean;
}

class PostListPage extends React.Component<IPostListPageProps, IPostListPageState> {
  static contextType = AppContext;
  context: IAppContext;
  state: IPostListPageState = {
    posts: [],
    havePrevPost: false,
  };

  async componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps: Readonly<IPostListPageProps>) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.loadPosts();
  }

  async loadPosts() {
    const pageNumber = parseInt(this.props.match.params.number);
    const posts = await this.getPagePosts(pageNumber);

    const lastPost = posts[posts.length - 1];
    const prevPost = await this.context.core.postFinder.getPrevPost(lastPost.id);

    this.setState({ posts, havePrevPost: !!prevPost });
  }

  async getPagePosts(pageNumber: number) {
    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
    if (pageNumber < 1) {
      return [];
    }
    const offset = (pageNumber - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
    return this.context.core.postFinder.getSeveralPosts(offset, limit);
  }

  render() {
    const { posts, havePrevPost } = this.state;
    const { number } = this.props.match.params;
    const currentPageNumber = parseInt(number);

    const haveNextPage = currentPageNumber > 1;
    const havePrevPage = havePrevPost;

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
                  <a href="#" onClick={this.onAddNewPostClick}>
                    Новый пост
                  </a>
                </li>
              </ul>

              <div className="posts-list">
                {posts.map((post) => (
                  <PostInfoCard post={post} key={post.id} />
                ))}
              </div>

              <Pager
                className="main-pager"
                nextBtnLink={
                  haveNextPage && (
                    <Link to={`/post-list/page/${currentPageNumber - 1}`}>Новые записи&rarr;</Link>
                  )
                }
                prevBtnLink={
                  havePrevPage && (
                    <Link to={`/post-list/page/${currentPageNumber + 1}`}>
                      &larr;Предыдущие записи
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

  @boundMethod
  async onAddNewPostClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const postRepository = this.context.core.postRepository;

    const newPostId = await postRepository.addPost({
      title: "Sample Title",
      subtitle: "",
      author: "Post Author",
      content: "Type your content here...",
    });

    this.props.history.push(`/edit-post/${newPostId}`);

    return false;
  }
}

export default withRouter(PostListPage);
