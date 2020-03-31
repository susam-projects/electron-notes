import * as React from "react";
import { Link } from "react-router-dom";
import PostMeta from "../../Component/PostMeta/PostMeta";
import classNames from "classnames";
import MarkdownEditor from "../../Component/MarkdownEditor/MarkdownEditor";
import { IEditPostPagePostInfo } from "./IEditPostPagePostInfo";

const styles = require("./EditPostPage.scss");

interface IEditPostPageProps {
  postPageUrl: string;
  post: IEditPostPagePostInfo;
  onTitleChange: (newTitle: string) => void;
  onSubtitleChange: (newSubtitle: string) => void;
  onContentChange: (newContent: string) => void;
}

class EditPostPageContent extends React.Component<IEditPostPageProps> {
  titleInputRef = React.createRef<HTMLInputElement>();
  subtitleInputRef = React.createRef<HTMLInputElement>();

  render() {
    const { post, postPageUrl } = this.props;

    return (
      <>
        <header className="header-section ">
          <div className="intro-header no-img">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <div className="post-heading">
                    <PostMeta
                      postDate={post.postDate}
                      author={post.author}
                      content={post.content}
                    />
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
                  defaultValue={post.title}
                  ref={this.titleInputRef}
                  onChange={this.onTitleChange}
                  placeholder="Заголовок пока пуст..."
                />
              </div>
              <div>
                <input
                  className={classNames("form-control", styles.input, styles.subtitle)}
                  type="text"
                  defaultValue={post.subtitle}
                  ref={this.subtitleInputRef}
                  onChange={this.onSubtitleChange}
                  placeholder="Подзаголовок пока пуст..."
                />
              </div>
              <div>
                <MarkdownEditor onChange={this.onContentChange} defaultValue={post.content} />
              </div>

              <ul className="pager blog-pager end-edit">
                <li className="previous">
                  <Link to={postPageUrl}>Назад к посту</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  onTitleChange = () => {
    this.props.onTitleChange(this.titleInputRef.current?.value ?? "");
  };

  onSubtitleChange = () => {
    this.props.onSubtitleChange(this.subtitleInputRef.current?.value ?? "");
  };

  onContentChange = (content?: string) => {
    this.props.onContentChange(content ?? "");
  };
}

export default EditPostPageContent;
