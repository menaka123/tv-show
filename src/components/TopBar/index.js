import React, {Component, Fragment} from 'react';
import { Input } from 'antd';
import {withRouter} from "react-router";
import PropTypes from 'prop-types';

class Index extends Component {

    redirect (val)
    {
        if (val.length)
        {
            this.props.searched(val);
            if (this.props.history.location.pathname !== '/results')
            {
                this.props
                    .history
                    .push('/results');
            }
        }
    }

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
                            onSearch={value => this.redirect(value)}
                            style={{ width: 200 }}
                        />
                    </div>
                </nav>
            </Fragment>
        );
    }
}

export default withRouter(Index);


Index.propTypes =
    {
        searched: PropTypes.func
    };

