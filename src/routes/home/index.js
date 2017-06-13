import React from 'react';
import Layout from '../../components/Layout';
import Content from '../../components/Content';
import { fetch } from '../../fetch';

export default {

  path: '/',

  async action() {
    // //with fetch
    // const resp = await fetch('/spa/get-static-page', {
    //   query: {
    //     url: `/company${this.path}`
    //   }
    // });
    // let data  = await resp.json();

    //with static md
    const data = await require.ensure([], require => require('./home.md'), 'home');
    

    return {
      title: data.title || "Home Page",
      description: data.description || "Home Page",
      chunk: 'home',
      component: <Layout><Content {...data} /></Layout>,
    };
  },
};