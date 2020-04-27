import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Card, Divider, Row, Col} from 'antd';
import API from "../API";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shows: []
        }
    }

    componentDidMount ()
    {
        this.getSearch();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.search !== this.props.search) {
            this.getSearch()
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

    render() {
        return (
            <Fragment>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
                    Horizontal
                </Divider>

                <Row gutter={[16, 16]}>
                    {
                        this.state.shows.map((item, index) => {
                            return <Col key={index} xs={24} sm={24} md={6} lg={6} >
                                <Card
                                    hoverable
                                    cover={
                                        item.show.image ?
                                            <img
                                                alt="example"
                                                src={ item.show.image.medium }
                                            />
                                            :
                                            <div
                                                className={'align-middle'}
                                                 style={
                                                     {
                                                         height: '309.75px',
                                                         textAlign: 'center',
                                                         verticalAlign: 'middle',
                                                         lineHeight: '309.75px'
                                                     }}>
                                                No Preview
                                            </div>
                                    }
                                >
                                    <Card.Meta
                                        title={ item.show.name }
                                        description={
                                            <div>
                                                <p>
                                                   Score: <strong>{ item.score.toFixed(2) }</strong>
                                                </p>
                                                {
                                                    Index.genres.length ?
                                                        <small>
                                                            ({ Index.genres(Index.genres) })
                                                        </small>
                                                        :
                                                        <small>&nbsp;</small>
                                                }
                                            </div>}
                                    />
                                </Card>
                            </Col>
                        })
                    }

                </Row>
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

