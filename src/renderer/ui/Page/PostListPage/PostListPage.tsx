import * as React from "react";
import { boundMethod } from "autobind-decorator";
import { PostInfoCard } from "./PostInfoCard/PostInfoCard";
import { AppContextConsumer, IAppContext } from "../../AppContext";

const styles = require("./PostListPage.scss");

class PostListPage extends React.Component {
  render() {
    return <AppContextConsumer children={this.renderContent} />;
  }

  @boundMethod
  renderContent({ core }: IAppContext) {
    const posts = core.postFinder.getAllPosts();
    return (
      <div>
        <ul className={styles.list}>
          {posts.map((post) => (
            <li
              key={post.id}
              className={styles.listItem}
            >
              <PostInfoCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostListPage;
