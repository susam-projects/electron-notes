import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { AppContextConsumer, IAppContext } from "../../AppContext";
import { boundMethod } from "autobind-decorator";

const styles = require("./SinglePostPage.scss");

interface ISinglePostPageUrlParams {
  id: string;
}

interface ISinglePostPageProps extends RouteComponentProps<ISinglePostPageUrlParams> {}

class SinglePostPage extends React.Component<ISinglePostPageProps> {
  private postId: string;

  render() {
    const { id: postId } = this.props.match.params;
    console.log(`rendering post ${postId}`);
    this.postId = postId;
    return <AppContextConsumer children={this.renderContent} />;
  }

  @boundMethod
  renderContent({ core }: IAppContext) {
    const postId = this.postId;
    const postInfo = core.postFinder.getPostById(postId);
    const nextPostInfo = core.postFinder.getNextPost(postId);
    const prevPostInfo = core.postFinder.getPrevPost(postId);
    return (
      <div>
        <div>{postInfo.title}</div>
        <div>{postInfo.author}</div>
        <div>{postInfo.content}</div>
        <div>
          <Link to={"/"}>На список постов</Link>
        </div>
        <div className={styles.nextPrevContainer}>
          {prevPostInfo && <Link to={`/post/${prevPostInfo.id}`}>{prevPostInfo.title}</Link>}
          {nextPostInfo && <Link to={`/post/${nextPostInfo.id}`}>{nextPostInfo.title}</Link>}
        </div>
      </div>
    );
  }
}

export default withRouter(SinglePostPage);
