import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostPagePostInfo } from "./IPostPagePostInfo";
import { boundMethod } from "autobind-decorator";

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

  @boundMethod
  onDeletePostClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const postRepository = this.context.core.postRepository;

    if (confirm("Вы уверены, что хотите удалить пост?")) {
      postRepository.deletePost(this.state.post.id);
    }

    this.props.history.push("/");

    event.preventDefault();
    return false;
  }

  render() {
    const { post, prevPost, nextPost } = this.state;
    return (
      <>
        <header className="header-section ">
          <div className="intro-header no-img">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <div className="post-heading">
                    <h1>To be</h1>
                    <h2 className="post-subheading">... or not to be?</h2>
                    <span className="post-meta">
                      <i className="fas fa-calendar"></i>&nbsp;Опубликовано February 13, 2015
                      &nbsp;|&nbsp;<i className="fas fa-clock"></i>&nbsp;2&nbsp;минут &nbsp;|&nbsp;
                      <i className="fas fa-book"></i>&nbsp;275&nbsp;слова &nbsp;|&nbsp;
                      <i className="fas fa-user"></i>&nbsp;Susam
                    </span>
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
                <p>This is my first post, how exciting!</p>
              </article>

              <ul className="pager blog-pager">
                <li className="previous">
                  <a
                    href="http://localhost:1313/post/2015-01-06-third-post/"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="First post!"
                  >
                    ← Предыдущий
                  </a>
                </li>

                <li className="next">
                  <a
                    href="http://localhost:1313/post/2015-01-04-first-post/"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="First post!"
                  >
                    Следующий →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div>
            <Link to={`/edit-post/${post.id}`}>Редактировать</Link>
          </div>
          <div>
            <a href={""} onClick={this.onDeletePostClick}>
              Удалить пост
            </a>
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
      </>
    );
  }
}

export default withRouter(SinglePostPage);
