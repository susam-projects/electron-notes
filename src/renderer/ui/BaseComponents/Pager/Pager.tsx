import * as React from "react";

interface IPagerProps {
  nextBtnText: string;
  prevBtnText: string;
  nextBtnLink: string;
  prevBtnLink: string;
}

class Pager  extends React.Component<IPagerProps> {
  render() {
    const { nextBtnText, prevBtnText, nextBtnLink, prevBtnLink } = this.props;
    return (
      <ul className="pager main-pager">
        <li className="previous">
          <a href={prevBtnLink}>&larr;{prevBtnText}</a>
        </li>
        <li className="next">
          <a href={nextBtnLink}>{nextBtnText}&rarr;</a>
        </li>
      </ul>
    );
  }
}

export default Pager;
