import { shell } from "electron";
import * as React from "react";
import { Link } from "react-router-dom";
import { boundMethod } from "autobind-decorator";

interface IAppLayoutProps {
  page: React.ReactElement;
}

export class AppLayout extends React.Component<IAppLayoutProps> {
  navRef: React.RefObject<HTMLElement> = React.createRef();

  render() {
    const { page } = this.props;
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top navbar-custom top-nav-short" ref={this.navRef}>
          <div className="container-fluid" style={{ display: "flex", justifyContent: "center" }}>
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                Записная книжка
              </Link>
            </div>
          </div>
        </nav>
        {page}
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <ul className="list-inline text-center footer-links"></ul>
                <p className="credits copyright text-muted">
                  Susam &nbsp;•&nbsp;© 2020 &nbsp;•&nbsp;
                  <Link to="#">Записная книжка</Link>
                </p>

                <p className="credits theme-by text-muted">
                  На базе темы{" "}
                  <a
                    href="https://github.com/halogenica/beautifulhugo"
                    onClick={this.onBeautifulHugoLinkClick}
                  >
                    Beautiful Hugo
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  @boundMethod
  onBeautifulHugoLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    shell.openExternal(event.currentTarget.href);
  }
}
