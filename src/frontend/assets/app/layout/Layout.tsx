import React from "react";
import Content from "../containers/Content";

interface ILayoutProps {
}

interface ILayoutState {
}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    public render() {
        return (
            <Content></Content>
        );
    }
}

export default Layout;