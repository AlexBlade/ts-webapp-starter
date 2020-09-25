import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface IPageProps {}

interface IPageState {}

class Page extends Component<IPageProps, IPageState>{
    constructor(props: IPageProps) {
        super(props);

        this.state = {
            displayedPage: 1,
            totalPages: 1,
            searchQuery: '',
            channels: []
        }
    }

    public render() {
        return (
            <div>
                <div>Page</div>
                <div><Link to="">To Dashboard</Link></div>
            </div>
        );
    }
}

export default Page;