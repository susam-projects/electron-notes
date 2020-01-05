import * as React from "react";

// @ts-ignore
const SCEditor = window.sceditor;

interface IBBCodeEditorProps {
  className: string;
  defaultValue: string;
  onChange: (currentValue: string) => void;
  minRows: number;
}

class BBCodeEditor extends React.Component<IBBCodeEditorProps> {
  static defaultProps = {
    className: "",
    defaultValue: "",
  };

  textareaRef = React.createRef<HTMLTextAreaElement>();
  editor: any;

  componentDidMount(): void {
    const textArea = this.textareaRef.current;
    SCEditor.create(textArea, {
      format: "bbcode",
      locale: "ru",
      icons: "monocons",
      emoticonsRoot: "sceditor/",
      style: "sceditor/minified/themes/default.min.css",
      resizeEnabled: false,
      autoExpand: true,
      emoticonsCompat: true,
      toolbarExclude: "print,maximize,source",
      fonts:
        "Lora,Arial,Arial Black,Comic Sans MS,Courier New,Georgia,Impact,Sans-serif,Serif,Times New Roman,Trebuchet MS,Verdana",
      // plugins: "plaintext",
      // pastetext: {
      //   addButton: true,
      //   enabled: true, // Set to true to start in enabled state
      // },
      /*plugins: "dragdrop",
      dragdrop: {
        // allowedTypes: ['image/jpeg', 'image/png'],
        // isAllowed: (file: any) => true,
        handleFile: async (file: any, createPlaceholder: any) => {
          const placeholder = createPlaceholder();
          try {
            const url = await upload(file);
            placeholder.insert(`<img src="${url}" />`)
          } catch {
            placeholder.cancel();
          }
        }
      },*/
    });
    this.editor = SCEditor.instance(textArea);

    const { onChange } = this.props;
    this.editor.bind("valuechanged", (event: any) => {
      onChange(this.editor.val());
    });
  }

  componentDidUpdate(prevProps: Readonly<IBBCodeEditorProps>): void {
    this.editor?.val(this.props.defaultValue);
  }

  componentWillUnmount(): void {
    this.editor?.destroy();
  }

  render() {
    const { className, minRows } = this.props;
    return <textarea className={className} ref={this.textareaRef} rows={minRows}></textarea>;
  }
}

/*async function upload(file: any): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("http://test.com");
    }, 3000);
  });
}*/

export default BBCodeEditor;
