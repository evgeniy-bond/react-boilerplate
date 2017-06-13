import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';

const title = 'Страница не найдена';

export default {

  path: '*',

  action() {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404,
    };
  },
};
