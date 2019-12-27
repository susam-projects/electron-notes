import * as React from "react";

interface IAppLayoutProps {
    page: React.ReactElement;
}

export class AppLayout extends React.Component<IAppLayoutProps> {
    render() {
        const { page } = this.props;
        return (
            <div>
                <h1>Diary</h1>
                {page}
            </div>
        );
    }
}
