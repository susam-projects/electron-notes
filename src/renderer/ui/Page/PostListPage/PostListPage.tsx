import * as React from "react";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostListPostInfo } from "./IPostListPostInfo";
import { boundMethod } from "autobind-decorator";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PostListPageContent from "./PostListPageContent";

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
      <PostListPageContent
        posts={posts}
        onAddNewPostClick={this.onAddNewPostClick}
        nextPageUrl={haveNextPage ? `/post-list/page/${currentPageNumber - 1}` : undefined}
        prevPageUrl={havePrevPage ? `/post-list/page/${currentPageNumber + 1}` : undefined}
        createSinglePostPageUrl={this.createSinglePostPageUrl}
      />
    );
  }

  @boundMethod
  async onAddNewPostClick(event: React.MouseEvent<HTMLElement>) {
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

  @boundMethod
  createSinglePostPageUrl(postId: number): string {
    return `/post/${postId}`;
  }
}

export default withRouter(PostListPage);
