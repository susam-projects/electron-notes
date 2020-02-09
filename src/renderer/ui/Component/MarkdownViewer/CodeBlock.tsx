import * as React from "react";
// const hljs = window.hljs
import hljs from "highlight.js";

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

    console.log("rendering code block", language, value);

    language = "js";
    value =
      "```js\n" +
      "var React = require('react');\n" +
      "var Markdown = require('react-markdown');\n" +
      "React.render(\n" +
      '  <Markdown source="# Your markdown here" />,\n' +
      "  document.getElementById('content')\n" +
      ");\n" +
      "```";

    return (
      <pre>
        <code ref={this.codeEl} className={`language-${language || ""}`}>
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
