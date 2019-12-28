import * as React from "react";
import { PostInfoCard } from "./PostInfoCard/PostInfoCard";
import { AppContext, IAppContext } from "../../AppContext";
import { IPostListPostInfo } from "./IPostListPostInfo";

const styles = require("./PostListPage.scss");

interface IPostListPageState {
  posts: IPostListPostInfo[];
}

class PostListPage extends React.Component<{}, IPostListPageState> {
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
}

export default PostListPage;
