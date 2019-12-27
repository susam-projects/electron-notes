import * as React from "react";
import { Core } from "../core/Core";
import "./AppUI.scss"
import { AppContextProvider } from "./AppContext";
import { PostListPage } from "./PostListPage/PostListPage";

interface IAppUiProps {
    core: Core;
}

export const AppUi: React.FC<IAppUiProps> = ({ core }) => {
    return (
        <AppContextProvider core={core}>
            <h1>Diary</h1>
            <PostListPage />
        </AppContextProvider>
    );
};
