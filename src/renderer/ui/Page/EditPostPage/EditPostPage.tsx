import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostPagePostInfo } from "../SinglePostPage/IPostPagePostInfo";
import { boundMethod } from "autobind-decorator";

interface ISinglePostPageUrlParams {
  id: string;
}

interface IEditPostPageProps extends RouteComponentProps<ISinglePostPageUrlParams> {}

interface IEditPostPageState {
  author: string;
  title: string;
  content: string;
}

class EditPostPage extends React.Component<IEditPostPageProps, IEditPostPageState> {
  static contextType = AppContext;
  context: IAppContext;
  state: IEditPostPageState = {
    author: "",
    title: "",
    content: "",
  };

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
      author: post.author,
      title: post.title,
      content: post.content,
    })
  }

  render() {
    const { author, title, content } = this.state;

    return (
      <div>
        <div>{author}</div>
        <div>
          <input type="text" defaultValue={title} />
        </div>
        <div>
          <textarea defaultValue={content} />
        </div>
        <div>
          <button onClick={this.onSaveButtonClick}>Сохранить</button>
        </div>
      </div>
    );
  }

  @boundMethod
  onSaveButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    const postRepository = this.context.core.postRepository;

  }
}

export default withRouter(EditPostPage);
