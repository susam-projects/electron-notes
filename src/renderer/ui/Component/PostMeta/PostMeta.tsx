import * as React from "react";
import * as moment from "moment";
import { calculateReadTime, countWords } from "../../../utils/TextUtils";

interface IPostMetaProps {
  postDate?: number;
  author: string;
  content: string;
}

class PostMeta extends React.Component<IPostMetaProps> {
  static defaultProps = {
    content: "",
  };

  render() {
    const { postDate, author, content } = this.props;

    const wordsCount = countWords(content);
    const readTime = calculateReadTime(wordsCount);

    return (
      <span className="post-meta">
        {postDate && (
          <>
            <i className="fas fa-calendar" />
            &nbsp;Опубликовано {moment(postDate).format("D MMMM YYYY")}
          </>
        )}
        &nbsp;|&nbsp;
        <i className="fas fa-clock" />
        &nbsp;{readTime}&nbsp;минут &nbsp;|&nbsp;
        <i className="fas fa-book" />
        &nbsp;{wordsCount}&nbsp;слова &nbsp;|&nbsp;
        <i className="fas fa-user" />
        &nbsp;{author}
      </span>
    );
  }
}

export default PostMeta;
