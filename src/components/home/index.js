import React, {Component, Fragment} from 'react';
import './home.scss';
import { Input } from 'antd';

export default class Home extends Component {

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
                                onSearch={value => console.log(value)}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
