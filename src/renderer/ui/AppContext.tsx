import * as React from "react";
import { Core } from "../core/Core";

export interface IAppContext {
  core: Core;
}
const { Provider, Consumer } = React.createContext<IAppContext>({} as IAppContext);

interface IAppContextProviderProps {
  core: Core;
}

export class AppContextProvider extends React.Component<IAppContextProviderProps> {
  render() {
    const { core, children } = this.props;
    return <Provider value={{ core }}>{children}</Provider>;
  }
}

export const AppContextConsumer = Consumer;
