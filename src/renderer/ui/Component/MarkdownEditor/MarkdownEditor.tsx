import * as React from "react";
import * as Codemirror from "codemirror";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { boundMethod } from "autobind-decorator";
import "codemirror/mode/markdown/markdown";
import "./CodeMirror.global.scss";

interface ITextEditorProps {
  value?: string;
  onChange: (newValue: string) => void;
}

class MarkdownEditor extends React.Component<ITextEditorProps> {
  render() {
    const { value } = this.props;
    return (
      <div>
        <CodeMirror
          options={{
            mode: "markdown",
            theme: "monokai",
          }}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }

  @boundMethod
  onChange(editor: CodeMirror.Editor, data: CodeMirror.EditorChange, value: string) {
    this.props.onChange(value);
  }
}

export default MarkdownEditor;
