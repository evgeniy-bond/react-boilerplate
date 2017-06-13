import React from 'react';
import Layout from '../../components/Layout';
import ErrorPage from './ErrorPage';

export default {

  path: '/error',

  action({ error }) {
    return {
      title: error.name,
      description: error.message,
      component: <Layout><ErrorPage error={error}  /></Layout>,
      status: error.status || 500,
    };
  },

};
