import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostPagePostInfo } from "./IPostPagePostInfo";
import { boundMethod } from "autobind-decorator";
import SinglePostPageContent from "./SinglePostPageContent";

interface ISinglePostPageUrlParams {
  id: string;
}

interface ISinglePostPageProps extends RouteComponentProps<ISinglePostPageUrlParams> {}

interface ISinglePostPageState {
  post: IPostPagePostInfo;
  nextPost?: IPostPagePostInfo;
  prevPost?: IPostPagePostInfo;
}

class SinglePostPage extends React.Component<ISinglePostPageProps, ISinglePostPageState> {
  static contextType = AppContext;
  context: IAppContext;
  state: ISinglePostPageState = {
    post: {
      id: 0,
      title: "",
      subtitle: "",
      author: "",
      content: "",
      postDate: 0,
    } as IPostPagePostInfo,
    nextPost: undefined,
    prevPost: undefined,
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps: Readonly<ISinglePostPageProps>) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.loadPosts();
  }

  async loadPosts() {
    const postFinder = this.context.core.postFinder;
    const { id } = this.props.match.params;
    const postId = parseInt(id, 10);
    const post =
      (await postFinder.getPostById(postId)) ??
      ({
        title: "",
        author: "",
        content: "",
      } as IPostPagePostInfo);
    const nextPost = await postFinder.getNextPost(postId);
    const prevPost = await postFinder.getPrevPost(postId);
    this.setState({
      post,
      nextPost,
      prevPost,
    });
  }

  @boundMethod
  onDeletePostClick(event: React.MouseEvent<HTMLElement>) {
    const postRepository = this.context.core.postRepository;

    if (confirm("Точно удалить?")) {
      postRepository.deletePost(this.state.post.id);
      this.props.history.push("/");
    }

    event.preventDefault();
    return false;
  }

  render() {
    const { post, prevPost, nextPost } = this.state;
    return (
      <SinglePostPageContent
        post={post}
        editPostUrl={`/edit-post/${post.id}`}
        onDeletePostClick={this.onDeletePostClick}
        prevPostUrl={`/post/${prevPost?.id}`}
        prevPost={prevPost}
        nextPostUrl={`/post/${nextPost?.id}`}
        nextPost={nextPost}
      />
    );
  }
}

export default withRouter(SinglePostPage);
