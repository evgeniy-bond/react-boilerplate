import React from 'react';
import Layout from '../../components/Layout';
import Vacancies from './Vacancies';
import { fetch } from '../../fetch';

export default {

  path: '/vacancies',

  async action() {

    // const resp = await fetch('/spa/get-static-page', {
    //   query: {
    //     url: `/company${this.path}`
    //   }
    // });
    // let serverData = await resp.json();

    let data = await require.ensure([], require => require('./vacancies.md'), 'vacancies');

    return {
      title: data.title || "Вакансии",
      description: data.description || "Вакансии",
      chunk: 'vacancies',
      component: <Layout><Vacancies {...data} /></Layout>,
    };
  },
};
