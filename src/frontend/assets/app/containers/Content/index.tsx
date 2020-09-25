import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from '../../routes';

interface IContentProps {
}

interface IContentState {
}

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"> </div>
    </div>
)

export class Content extends React.Component<IContentProps, IContentState>{
    public render() {
        return (
            <main>
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props: any) => (
                                        <route.component {...props} />
                                    )}
                                />
                            )
                        })}
                    </Switch>
                </Suspense>
            </main>
        );
    };
};
export default Content;