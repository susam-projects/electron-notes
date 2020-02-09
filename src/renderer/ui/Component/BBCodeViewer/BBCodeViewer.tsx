import * as React from "react";
// @ts-ignore
import reactRender from "@bbob/react/es/render";
// @ts-ignore
import presetReact from "@bbob/preset-react";

interface IBBCodeViewerProps {
  text: string;
}

const myPreset = presetReact.extend((tags: any) => {
  return {
    ...tags,
    font: (node: any, params: any) => {
      const fontName = Object.keys(node.attrs).join(" ");
      return {
        tag: "span",
        attrs: {
          style: { fontFamily: fontName },
        },
        content: node.content,
      };
    },
    size: (node: any, params: any) => {
      const fontSize = Object.values(node.attrs)[0];
      return {
        tag: "font",
        attrs: {
          size: fontSize,
        },
        content: node.content,
      };
    },
    color: (node: any, params: any) => {
      const color = Object.keys(node.attrs).join(" ");
      return {
        tag: "span",
        attrs: {
          style: { color },
        },
        content: node.content,
      };
    },
  };
});

class BBCodeViewer extends React.Component<IBBCodeViewerProps> {
  render() {
    const { text } = this.props;
    return <>{reactRender(text, myPreset())}</>;
  }
}

export default BBCodeViewer;
