import * as React from "react";
import { Core } from "../core/Core";

export interface IAppContext {
  core: Core;
}
export const AppContext = React.createContext<IAppContext>({} as IAppContext);

interface IAppContextProviderProps {
  core: Core;
}

export class AppContextProvider extends React.Component<IAppContextProviderProps> {
  render() {
    const { core, children } = this.props;
    return <AppContext.Provider value={{ core }}>{children}</AppContext.Provider>;
  }
}

export const AppContextConsumer = AppContext.Consumer;
