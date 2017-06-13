import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './layout.scss';
import global from './style.scss';
import cx from 'classnames';
import { fetch } from '../../fetch';

// components
import Header from '../Header';
import Footer from '../Footer';

class Layout extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {

        return (
            <div className={cx(s.container, s.container_grey)}>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default withStyles(global, s)(Layout);
