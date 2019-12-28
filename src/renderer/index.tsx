import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppUi } from "./ui/AppUI";
import { Core } from "./core/Core";

const core = new Core();

ReactDOM.render(<AppUi core={core} />, document.getElementById("app"));
