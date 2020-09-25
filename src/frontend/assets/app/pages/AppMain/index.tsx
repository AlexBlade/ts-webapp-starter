import "../../../scss/style.scss";
import React, {Component} from "react";
import {HashRouter, Switch, Route} from "react-router-dom";

interface IAppMainProps {
}

interface IAppMainState {
}

const loading = (
    <div>
        Loading...
    </div>
);

const Layout = React.lazy(() => import('../../layout/Layout'));

export class AppMain extends Component<IAppMainProps, IAppMainState> {
    public render() {
        return (
            <HashRouter>
                <React.Suspense fallback={loading}>
                    <Switch>
                        <Route path="/" render={props => <Layout {...props}/>}/>
                    </Switch>
                </React.Suspense>
            </HashRouter>
        );
    }
}

export default AppMain;