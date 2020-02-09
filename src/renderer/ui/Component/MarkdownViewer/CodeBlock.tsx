import * as React from "react";
import hljs from "highlight.js";
import "./CodeBlock.global.scss";

interface ICodeBlockProps {
  value: string;
  language: string;
}

class CodeBlock extends React.PureComponent<ICodeBlockProps> {
  static defaultProps = {
    language: "",
  };

  codeEl = React.createRef<HTMLDivElement>();

  render() {
    let { language, value } = this.props;
    return (
      <pre>
        <code ref={this.codeEl} className={`language-${language}`}>
          {value}
        </code>
      </pre>
    );
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    if (!this.codeEl.current) {
      return console.error("no dom node to highlight!");
    }
    hljs.highlightBlock(this.codeEl.current);
  }
}

export default CodeBlock;
