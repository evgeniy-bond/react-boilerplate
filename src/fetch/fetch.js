import fetch from 'isomorphic-fetch';
import canUseDOM from '../lib/canUseDOM';
import { API } from '../../server-api';

let SERVER_URL;

export default (url, options = {}) => {
    options = {
        redirect: 'error',
        ...options,
    };

    if (/api/.test(url)) {
        SERVER_URL = API;
    } 

    if (options.query) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.query);
        delete options.query;
    }

    return fetch(canUseDOM() ? url : SERVER_URL + url, options)
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}