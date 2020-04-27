import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Card, Divider, Row, Col} from 'antd';
import API from "../API";
import Modal from "../Modal";
import ReactHtmlParser from 'react-html-parser';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            showModal: false,
            modalItem: {}
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

    openModal (modalItem)
    {
        this.setState({
            modalItem,
            showModal: true,
        })
    }

    showDetails ()
    {

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
                                    onClick={() => this.openModal(item)}
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
                                                    item.show.genres.length ?
                                                        <small>
                                                            ({ Index.genres(item.show.genres) })
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
                <Modal
                    visible={ this.state.showModal }
                    onClose={ () => this.setState({ showModal: false }) }
                    details={ this.state.modalItem }
                    actionButtonLabel='Info'
                    large={true}
                    onAction={ () => this.showDetails() }
                >
                    <Row>
                        <Col  xs={24} sm={24} md={12} lg={12} >
                            <img
                                src={
                                    this.state.modalItem.show && this.state.modalItem.show.image ?
                                        this.state.modalItem.show.image.medium : require('../../img/NoPhotoAvailable.jpg')
                                }
                                alt="..."
                                style={{maxWidth: '250px'}}
                                className={'img-thumbnail'}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} >
                            {
                                this.state.modalItem.show && ReactHtmlParser (this.state.modalItem.show.summary)
                            }
                        </Col>
                    </Row>
                </Modal>
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

