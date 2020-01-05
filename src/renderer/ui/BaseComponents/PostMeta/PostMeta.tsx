import * as React from "react";
import * as moment from "moment";

interface IPostMetaProps {
  postDate?: number;
  author: string;
  contentLength: number;
}

class PostMeta extends React.Component<IPostMetaProps> {
  static defaultProps = {
    contentLength: 0,
  };

  render() {
    const { postDate, author, contentLength } = this.props;

    const wordsCount = estimateWordCount(contentLength);
    const readTime = calculateReadTime(wordsCount);

    return (
      <span className="post-meta">
        {postDate && (
          <>
            <i className="fas fa-calendar"></i>&nbsp;Опубликовано{" "}
            {moment(postDate).format("D MMMM YYYY")}
          </>
        )}
        &nbsp;|&nbsp;
        <i className="fas fa-clock"></i>&nbsp;{readTime}&nbsp;минут &nbsp;|&nbsp;
        <i className="fas fa-book"></i>&nbsp;{wordsCount}&nbsp;слова &nbsp;|&nbsp;
        <i className="fas fa-user"></i>&nbsp;{author}
      </span>
    );
  }
}

const AVERAGE_WORD_LENGTH = 5;

function estimateWordCount(contentLength: number) {
  return Math.ceil(contentLength / AVERAGE_WORD_LENGTH);
}

function calculateReadTime(wordsCount: number) {
  return Math.ceil(wordsCount / 220.0);
}

export default PostMeta;
