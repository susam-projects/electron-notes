import * as React from "react";

// @ts-ignore
const bbcodeEditor = window.sceditor;

interface IBBCodeEditorProps {
  className: string;
}

class BBCodeEditor extends React.Component<IBBCodeEditorProps> {
  textareaRef = React.createRef<HTMLTextAreaElement>();

  componentDidMount(): void {
    bbcodeEditor.create(this.textareaRef.current, {
      format: "bbcode",
      style: '/sceditor/themes/default.min.css',
    });
  }

  render() {
    const { className } = this.props;
    return <textarea className={className} ref={this.textareaRef}></textarea>;
  }
}

export default BBCodeEditor;
