import * as React from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import toc from "remark-toc";
import classNames from "classnames";
import CodeBlock from "./CodeBlock";

const styles = require("./MarkdownViewer.scss");

interface IMarkdownViewerProps {
  source: string;
  className?: string;
}

class MarkdownViewer extends React.Component<IMarkdownViewerProps> {
  render() {
    let { source, className } = this.props;
    return (
      <ReactMarkdown
        className={classNames(className, styles.viewer)}
        source={source}
        skipHtml={false}
        escapeHtml={false}
        renderers={{ code: CodeBlock }}
        plugins={[toc]}
      />
    );
  }
}

export default MarkdownViewer;
