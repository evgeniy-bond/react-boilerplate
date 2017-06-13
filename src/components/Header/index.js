import React, { Component } from 'react';
import s from './header.scss';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';

class Header extends Component {
    render() {
        return (
            <div className={s.header}>
                <h3>Header</h3>
            </div>
        );
    }
}

export default withStyles(s)(Header);