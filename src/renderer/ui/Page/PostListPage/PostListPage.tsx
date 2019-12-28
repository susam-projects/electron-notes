import * as React from "react";
import { PostInfoCard } from "./PostInfoCard/PostInfoCard";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostListPostInfo } from "./IPostListPostInfo";
import { boundMethod } from "autobind-decorator";
import { withRouter, RouteComponentProps } from "react-router-dom";

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
      <div>
        <button onClick={this.onAddNewPostClick}>Новый пост</button>
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <PostInfoCard post={post} />
            </li>
          ))}
        </ul>
      </div>
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
