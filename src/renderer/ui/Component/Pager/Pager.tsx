import * as React from "react";

interface IPagerProps {
  className?: string;
  nextBtnLink?: React.ReactElement | boolean;
  prevBtnLink?: React.ReactElement | boolean;
}

class Pager extends React.Component<IPagerProps> {
  render() {
    const { className, nextBtnLink, prevBtnLink } = this.props;
    return (
      <ul className={`pager ${className}`}>
        {prevBtnLink && <li className="previous">{prevBtnLink}</li>}
        {nextBtnLink && <li className="next">{nextBtnLink}</li>}
      </ul>
    );
  }
}

export default Pager;
