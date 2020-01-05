import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Core } from "../core/Core";
import "./global.scss";
import "./AppUI.scss";
import { AppContextProvider } from "./AppContext";
import { AppLayout } from "./Layout/AppLayout";
import PostListPage from "./Page/PostListPage/PostListPage";
import SinglePostPage from "./Page/SinglePostPage/SinglePostPage";
import EditPostPage from "./Page/EditPostPage/EditPostPage";
import * as moment from "moment";

moment.locale("ru");

interface IAppUiProps {
  core: Core;
}

export const AppUi: React.FC<IAppUiProps> = ({ core }) => {
  return (
    <BrowserRouter>
      <AppContextProvider core={core}>
        <AppLayout
          page={
            <Switch>
              <Route path="/post/:id" component={SinglePostPage} />
              <Route path="/edit-post/:id" component={EditPostPage} />
              <Route path="/post-list/page/:id" component={PostListPage} />
              <Redirect to="/post-list/page/1" />
            </Switch>
          }
        />
      </AppContextProvider>
    </BrowserRouter>
  );
};
