import React, { Component } from 'react';
import s from './footer.scss';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';

class Footer extends Component {
    render() {
        return (
            <div className={s.footer}>
                <h3>Footer</h3>
            </div>
        );
    }
}

export default withStyles(s)(Footer);