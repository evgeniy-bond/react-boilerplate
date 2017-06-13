import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './content.scss';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Content extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired,
    };

    render() {
        const { title, html } = this.props;
        
        return (
            <div>
                <h1>{title}</h1>
                <div className={cx(s.content)} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        );
    }
}

export default withStyles(s)(Content);