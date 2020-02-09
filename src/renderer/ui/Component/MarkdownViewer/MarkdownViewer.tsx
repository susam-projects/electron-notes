import * as React from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import toc from "remark-toc";
import CodeBlock from "./CodeBlock";

interface IMarkdownViewerProps {
  source: string;
}

class MarkdownViewer extends React.Component<IMarkdownViewerProps> {
  render() {
    const { source } = this.props;
    return (
      <ReactMarkdown
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
