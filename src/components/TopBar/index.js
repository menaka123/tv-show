import React, {Component, Fragment} from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

export default class Index extends Component {

    render() {
        return (
            <Fragment>
                <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <h4 className="my-0 mr-md-auto font-weight-bold text-primary">Find TV</h4>
                        </a>
                        <Input.Search
                            placeholder="Search here..."
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                    </div>
                </nav>
            </Fragment>
        );
    }
}
