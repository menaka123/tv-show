import React, {Component, Fragment} from 'react';
import './home.scss';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";

class Index extends Component {

    redirect (val)
    {
        if (val.length)
        {
            this.props.searched(val);
            this.props
                .history
                .push('/results');
        }
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center">
                            <img
                                alt={'logo'}
                                className={'img-thumbnail banner-img'}
                                src={ require('../../img/tv.png') }/>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col'}>
                        <div className="d-flex justify-content-center">
                            <Input.Search
                                placeholder="Type in your Tv show"
                                enterButton="Search"
                                size="large"
                                style={{ maxWidth: 400 }}
                                onSearch={value => this.redirect(value)}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Index);

Index.propTypes =
    {
        searched: PropTypes.func
    };
