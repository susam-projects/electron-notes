import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostPagePostInfo } from "../SinglePostPage/IPostPagePostInfo";
import { debounce, clone, isUndefined } from "lodash";
import PostMeta from "../../BaseComponents/PostMeta/PostMeta";
import classNames from "classnames";
import BBCodeEditor from "../../BaseComponents/BBCodeEditor/BBCodeEditor";

const styles = require("./EditPostPage.scss");

interface ISinglePostPageUrlParams {
  id: string;
}

interface IEditPostPageProps extends RouteComponentProps<ISinglePostPageUrlParams> {}

interface IEditPostPageState {
  id: number;
  author: string;
  title: string;
  subtitle: string;
  content: string;
  postDate: number;
}

// TODO: use separate type for this page
const NULL_POST_INFO: IPostPagePostInfo = {
  id: 0,
  title: "",
  subtitle: "",
  author: "",
  content: "",
  postDate: 0,
};

class EditPostPage extends React.Component<IEditPostPageProps, IEditPostPageState> {
  static contextType = AppContext;
  context: IAppContext;
  state: IEditPostPageState = clone(NULL_POST_INFO);

  titleInputRef = React.createRef<HTMLInputElement>();
  subtitleInputRef = React.createRef<HTMLInputElement>();

  async componentDidMount() {
    const postFinder = this.context.core.postFinder;
    const { id } = this.props.match.params;
    const postId = parseInt(id, 10);
    const post = (await postFinder.getPostById(postId)) ?? clone(NULL_POST_INFO);

    this.setState({
      id: post.id,
      author: post.author,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      postDate: post.postDate,
    });
  }

  render() {
    const { id, author, title, subtitle, content, postDate } = this.state;

    return (
      <>
        <header className="header-section ">
          <div className="intro-header no-img">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <div className="post-heading">
                    <PostMeta postDate={postDate} author={author} contentLength={content.length} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container" role="main">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <div>
                <input
                  className={classNames("form-control", styles.input, styles.title)}
                  type="text"
                  defaultValue={title}
                  ref={this.titleInputRef}
                  onChange={this.onTitleChange}
                  placeholder="Заголовок пока пуст..."
                />
              </div>
              <div>
                <input
                  className={classNames("form-control", styles.input, styles.subtitle)}
                  type="text"
                  defaultValue={subtitle}
                  ref={this.subtitleInputRef}
                  onChange={this.onSubTitleChange}
                  placeholder="Подзаголовок пока пуст..."
                />
              </div>
              <div>
                <BBCodeEditor
                  className={classNames("form-control", styles.input, styles.content)}
                  defaultValue={content}
                  onChange={this.onContentChange}
                  minRows={10}
                />
              </div>

              <ul className="pager blog-pager end-edit">
                <li className="previous">
                  <Link to={`/post/${id}`}>Назад к посту</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  onTitleChange = debounceEditPostInput(async () => {
    const postRepository = this.context.core.postRepository;
    const postId = this.state.id;
    const title = this.titleInputRef.current?.value;
    if (isUndefined(title)) return;
    await postRepository.updatePostTitle(postId, title);
  });

  onSubTitleChange = debounceEditPostInput(async () => {
    const postRepository = this.context.core.postRepository;
    const postId = this.state.id;
    const subtitle = this.subtitleInputRef.current?.value;
    if (isUndefined(subtitle)) return;
    // TODO: create and use the method
    // await postRepository.updatePostSubtitle(postId, subtitle);
  });

  onContentChange = debounceEditPostInput(async (content) => {
    const postRepository = this.context.core.postRepository;
    const postId = this.state.id;
    if (isUndefined(content)) return;
    await postRepository.updatePostContent(postId, content);
  });
}

function debounceEditPostInput<T extends (...args: any[]) => any>(func: T) {
  return debounce(func, 500, {
    leading: false,
    maxWait: 3000,
    trailing: true,
  });
}

export default withRouter(EditPostPage);
