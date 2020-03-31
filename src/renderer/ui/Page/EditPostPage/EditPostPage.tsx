import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { AppContext, IAppContext } from "../../AppContext";
import { debounce, clone, isUndefined } from "lodash";
import { IEditPostPagePostInfo } from "./IEditPostPagePostInfo";
import EditPostPageContent from "./EditPostPageContent";

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

const NULL_POST_INFO: IEditPostPagePostInfo = {
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
    const { id } = this.state;

    return (
      <EditPostPageContent
        postPageUrl={`/post/${id}`}
        post={this.state}
        onTitleChange={this.onTitleChange}
        onSubtitleChange={this.onSubtitleChange}
        onContentChange={this.onContentChange}
      />
    );
  }

  onTitleChange = debounceEditPostInput<string>(async (newTitle) => {
    const postRepository = this.context.core.postRepository;
    const postId = this.state.id;
    if (isUndefined(newTitle)) return;
    await postRepository.updatePostTitle(postId, newTitle);
  });

  onSubtitleChange = debounceEditPostInput<string>(async (newSubtitle) => {
    const postRepository = this.context.core.postRepository;
    const postId = this.state.id;
    if (isUndefined(newSubtitle)) return;
    await postRepository.updatePostSubtitle(postId, newSubtitle);
  });

  onContentChange = debounceEditPostInput<string>(async (newContent) => {
    const postRepository = this.context.core.postRepository;
    const postId = this.state.id;
    if (isUndefined(newContent)) return;
    await postRepository.updatePostContent(postId, newContent);
  });
}

function debounceEditPostInput<T>(func: (param: T) => void) {
  return debounce(func, 500, {
    leading: false,
    maxWait: 3000,
    trailing: true,
  });
}

export default withRouter(EditPostPage);
