import * as React from "react";
import { PostInfoCard } from "./PostInfoCard/PostInfoCard";
import { AppContextConsumer, IAppContext } from "../../AppContext";
import { boundMethod } from "autobind-decorator";

const styles = require("./PostListPage.scss");

export class PostListPage extends React.Component {
    render() {
        return <AppContextConsumer children={this.renderContent} />;
    }

    @boundMethod
    renderContent({ core }: IAppContext) {
        const posts = core.getAllPosts();
        return (
            <div>
                <ul className={styles.list}>
                    {posts.map((post) => (
                        <li className={styles.listItem} onClick={this.onPostClick}>
                            <PostInfoCard post={post} key={post.id} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    onPostClick() {
        alert("a post click!");
    }
}
