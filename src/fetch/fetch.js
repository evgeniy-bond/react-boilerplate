import fetch from 'isomorphic-fetch';

const apiUrl = process.env.API_CLIENT_URL || window.App.apiUrl;

export default (url, options = {}) => {
    options = {
        redirect: 'error',
        ...options,
    };

    if (options.query) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.query);
        delete options.query;
    }

    return fetch(apiUrl + url, options);
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}