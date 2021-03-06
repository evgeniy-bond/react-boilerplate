import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import proxy from 'http-proxy-middleware';
import favicon from 'serve-favicon';
import App from './components/App';
import Html from './components/Html';
import router from './router';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';

import assets from './assets.json';
import config from './core/config';
import { proxyConfig } from './core/proxy';
import basicAuth from './lib/basicAuth';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(favicon(__dirname + '/public/favicon.ico'));

//proxy uncomment it if you need 
// app.use('/spa', proxy(proxyConfig));

//basicAuth
// app.use('*', basicAuth);

app.get('*', async (req, res, next) => {
    try {
        const css = new Set();

        const context = {

            insertCss: (...styles) => {
                styles.forEach(style => css.add(style._getCss()));
            },
        };

        const route = await router.resolve({
            ...context,
            path: req.path,
            query: req.query
        });

        if (route.redirect) {
            res.redirect(route.status || 302, route.redirect);
            return;
        }

        const data = { ...route, path: req.path, query: req.query };
        data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
        data.styles = [
            { id: 'css', cssText: [...css].join('') },
        ];
        data.scripts = [
            assets.vendor.js,
            assets.client.js,
        ];
        if (assets[route.chunk]) {
            data.scripts.push(assets[route.chunk].js);
        }

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(route.status || 200);
        res.send(`<!doctype html>${html}`);
    } catch (err) {
        next(err);
    }
});


// Error handling
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');



app.use((err, req, res, next) => {
    console.log(pe.render(err));
    const html = ReactDOM.renderToStaticMarkup(
        <Html
            title="Internal Server Error"
            description={err.message}
            styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}
        >
            {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
        </Html>,
    );
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
});

// Launch the server
app.listen(config.port, () => {
    console.log(`The server is running at http://localhost:${config.port}/`);
});