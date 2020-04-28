import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import classnames from 'classnames';
import { Button } from 'antd';

export default class Modal extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state =
        {
            visible: false,
            loading: false
        }
    }
    static getDerivedStateFromProps(props, prevState)
    {
        let newState = {}

        if (props.visible != null &&
            props.visible !== prevState.visible)
            newState.visible = props.visible;
            
        if (props.loading != null &&
            props.loading !== prevState.loading)
            newState.loading = props.loading;
        
        return (Object.keys(newState).length === 0) ? null : newState;
    }

    render()
    {
        return (
            <div
                className={classnames('modal',
                            {
                                'visible': this.state.visible,
                                'large': this.props.large,
                                'animateFromBottom': this.props.animateFromBottom,
                                'autoHeight': this.props.autoHeight
                            }, this.props.className)}
                onClick={this.close.bind(this)}
            >
                <div className="card" onClick={(e) => e.stopPropagation()}>
                    <div className="header">
                        <div className="title">{ this.props.details.show && this.props.details.show.name }</div>
                    </div>
                    {
                        (this.props.details.show && this.props.details.show.genres.length) ?
                        <div className="description">
                           ( { this.props.details.show.genres.join(' ,') } )
                        </div>
                            :
                            null
                    }
                    <div className="body">
                        { this.props.children }
                    </div>
                    <div className="footer">
                        {
                            !this.state.loading &&
                            <Button
                                onClick={() => this.props.onClose()}
                                size="small">
                                Close
                            </Button>
                        }
                        {
                            this.props.actionButtonLabel && this.props.onAction &&
                            <Button
                                onClick={() => this.props.onAction()}
                                type='primary' size="small" >
                                { this.props.actionButtonLabel }
                            </Button>
                        }

                    </div>
                </div>
            </div>
        );
    }
    
    close()
    {
        this.setState({ visible: false });
        
        if (this.props.onClose != null)
        {
            this.props.onClose();
        }
    }
    onCancel()
    {
        if (this.props.onCancel != null)
        {
            this.props.onClose();
        }
    }
}

Modal.propTypes =
{
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    actionButtonLabel: PropTypes.string,
    onAction: PropTypes.func,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    large: PropTypes.bool,
    animateFromBottom: PropTypes.bool,
    className: PropTypes.string,
    details: PropTypes.object,
    autoHeight: PropTypes.bool
};