import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './notfound.scss';
import Link from '../../components/Link';
import cx from 'classnames';

class NotFound extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    let {title} = this.props;
    return (
      <div className={s.page}>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
