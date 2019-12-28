import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostPagePostInfo } from "./IPostPagePostInfo";

const styles = require("./SinglePostPage.scss");

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
    post: {} as IPostPagePostInfo,
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

  render() {
    const { post, prevPost, nextPost } = this.state;
    return (
      <div>
        <div>
          <Link to={`/edit-post/${post.id}`}>Редактировать</Link>
        </div>
        <div>{post.title}</div>
        <div>{post.author}</div>
        <div>{post.content}</div>
        <div>
          <Link to={"/"}>На список постов</Link>
        </div>
        <div className={styles.nextPrevContainer}>
          <div className={styles.prev}>
            {prevPost && <Link to={`/post/${prevPost.id}`}>{prevPost.title}</Link>}
          </div>
          <div className={styles.next}>
            {nextPost && <Link to={`/post/${nextPost.id}`}>{nextPost.title}</Link>}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SinglePostPage);
