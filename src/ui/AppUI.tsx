import * as React from "react";
import { Core } from "../core/Core";
import "./AppUI.scss"

interface IAppUiProps {
    core: Core;
}

export const AppUi: React.FC<IAppUiProps> = ({ core }) => {
    return <h1>The Diary</h1>;
};
