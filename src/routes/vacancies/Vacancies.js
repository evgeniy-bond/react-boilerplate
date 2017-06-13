import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './vacancies.scss';
import cx from 'classnames';

class Vacancies extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired,
    };

    render() {
        const { title, html } = this.props;

        return (
            <div className={s.content}>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        );
    }
}

export default withStyles(s)(Vacancies);
