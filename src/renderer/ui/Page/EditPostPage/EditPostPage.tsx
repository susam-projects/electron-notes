import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostPagePostInfo } from "../SinglePostPage/IPostPagePostInfo";
import { debounce } from "lodash";

interface ISinglePostPageUrlParams {
  id: string;
}

interface IEditPostPageProps extends RouteComponentProps<ISinglePostPageUrlParams> {}

interface IEditPostPageState {
  id: number;
  author: string;
  title: string;
  content: string;
}

class EditPostPage extends React.Component<IEditPostPageProps, IEditPostPageState> {
  static contextType = AppContext;
  context: IAppContext;
  state: IEditPostPageState = {
    id: 0,
    author: "",
    title: "",
    content: "",
  };

  titleInputRef = React.createRef<HTMLInputElement>();
  contentInputRef = React.createRef<HTMLTextAreaElement>();

  async componentDidMount() {
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

    this.setState({
      id: post.id,
      author: post.author,
      title: post.title,
      content: post.content,
    });
  }

  render() {
    const { id, author, title, content } = this.state;

    return (
      <div>
        <div>{author}</div>
        <div>
          <input
            type="text"
            defaultValue={title}
            ref={this.titleInputRef}
            onChange={this.onTitleChange}
          />
        </div>
        <div>
          <textarea
            defaultValue={content}
            ref={this.contentInputRef}
            onChange={this.onContentChange}
          />
        </div>
        <div>
          <Link to={`/post/${id}`}>Назад к посту</Link>
        </div>
      </div>
    );
  }

  onTitleChange = debounce(
    async () => {
      const postRepository = this.context.core.postRepository;
      const postId = this.state.id;
      const title = this.titleInputRef.current?.value;
      if (title) {
        await postRepository.updatePostTitle(postId, title);
      }
    },
    500,
    {
      leading: false,
      maxWait: 3000,
      trailing: true,
    },
  );

  onContentChange = debounce(
    async () => {
      const postRepository = this.context.core.postRepository;
      const postId = this.state.id;
      const content = this.contentInputRef.current?.value;
      if (content) {
        await postRepository.updatePostContent(postId, content);
      }
    },
    500,
    {
      leading: false,
      maxWait: 3000,
      trailing: true,
    },
  );
}

export default withRouter(EditPostPage);
