import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './details.scss';
import {Descriptions, Row, Col, List} from 'antd';
import API from "../API";
import ReactHtmlParser from 'react-html-parser';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: null,
            episodes: []
        }
    }


    getSearch ()
    {
        let q = this.props.search;

        if (q && q.length) {
            API.getInstance()
                .GET('search/shows', {q})
                .then(res => {
                    console.log(res)
                    this.setState({
                        shows: res
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    static genres (genres)
    {
        return genres.length > 2 ? `${genres.slice(0, 2).join(', ')}, ...` : genres.join(', ')
    }

    showDetails ()
    {

    }

    componentDidMount ()
    {
        let id = this.props.computedMatch.params.id;

        if (id) {
            API.getInstance()
                .GET(`shows/${id}`)
                .then(res => {
                    this.setState({
                        show: res
                    })
                })
                .catch(err => {
                    console.log(err)
                })

            API.getInstance()
                .GET(`shows/${id}/episodes`)
                .then(res => {
                    this.setState({
                        episodes: res
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    render() {
        return (
            <Fragment>
                {
                    this.state.show && <Fragment>
                        <Row >
                            <div className="header">
                                <div className="title">{this.state.show.name}</div>
                            </div>
                        </Row>
                        <Row>
                            <div className="description">
                                Type: {this.state.show.type}
                            </div>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                {
                                    this.state.show.image ?
                                        <img
                                            alt="example"
                                            src={this.state.show.image.original}
                                            className="img-fluid"
                                        />
                                        :
                                        <div
                                            className={'align-middle no-preview'}
                                        >
                                            No Preview
                                        </div>
                                }
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                <Descriptions column={24} title="Info">
                                    <Descriptions.Item span={24} label="Rating"><strong> { this.state.show.rating.average }</strong></Descriptions.Item>
                                    <Descriptions.Item span={24} label="Genres"> { this.state.show.genres.join(', ') } </Descriptions.Item>
                                    <Descriptions.Item span={24} label="Language">{this.state.show.language}</Descriptions.Item>
                                    <Descriptions.Item span={24} label="Status">{this.state.show.status}</Descriptions.Item>
                                    <Descriptions.Item span={24} label="Premiered">{this.state.show.premiered}</Descriptions.Item>
                                    <Descriptions.Item span={24} label="Runtime">{this.state.show.runtime} min</Descriptions.Item>
                                    <Descriptions.Item span={24} label="Summary">
                                        {
                                            ReactHtmlParser (this.state.show.summary)
                                        }
                                    </Descriptions.Item>
                                    {
                                        this.state.show.officialSite && <Descriptions.Item span={24} label="Link">
                                            <a href={this.state.show.officialSite}>here</a>
                                        </Descriptions.Item>
                                    }

                                </Descriptions>
                            </Col>
                        </Row>
                        <Row>
                            <h4>Episodes</h4>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    pageSize: 5,
                                }}
                                dataSource={this.state.episodes}
                                renderItem={item => (
                                    <List.Item
                                        key={item.name}
                                        extra={
                                            item.image &&
                                            <img
                                                width={272}
                                                alt="logo"
                                                src={item.image.medium}
                                            />
                                        }
                                    >
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.airdate}
                                        />
                                        {ReactHtmlParser (item.summary)}
                                    </List.Item>
                                )}
                            />
                        </Row>
                    </Fragment>
                }
            </Fragment>
        );
    }
}

Index.propTypes =
    {
        search: PropTypes.string
    };

Index.defaultProps =
    {
        search: ''
    };

