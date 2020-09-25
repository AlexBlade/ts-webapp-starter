import React from 'react';
import { Link } from 'react-router-dom';

interface IDashboardProps {
}

interface IDashboardState {
}

class Dashboard extends React.Component<IDashboardProps, IDashboardState>{
    constructor(props: IDashboardProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div>Dashboard</div>
                <div><Link to="page">To Page</Link></div>
            </div>
        );
    }
}

export default Dashboard;