import * as React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { boundMethod } from "autobind-decorator";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/display/fullscreen";
import "./CodeMirror.global.scss";

interface ITextEditorProps {
  defaultValue?: string;
  onChange: (newValue: string) => void;
}

class MarkdownEditor extends React.Component<ITextEditorProps> {
  render() {
    const { defaultValue } = this.props;
    return (
      <div>
        <CodeMirror
          options={{
            mode: "markdown",
            theme: "monokai",
            lineWrapping: true,
            extraKeys: {
              F11: function(editor) {
                // @ts-ignore
                editor.setOption("fullScreen", !editor.getOption("fullScreen"));
              },
              Esc: function(editor) {
                // @ts-ignore
                if (editor.getOption("fullScreen")) editor.setOption("fullScreen", false);
              },
            },
          }}
          value={defaultValue}
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
