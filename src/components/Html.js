import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../core/config';

class Html extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        styles: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            cssText: PropTypes.string.isRequired,
        }).isRequired),
        scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
        children: PropTypes.string.isRequired,
    };

    static defaultProps = {
        styles: [],
        scripts: [],
    };

    render() {
        const { title, description, styles, scripts, app, children, query} = this.props;

        return (
            <html className="no-js" lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                    {styles.map(style =>
                        <style
                            key={style.id}
                            id={style.id}
                            dangerouslySetInnerHTML={{ __html: style.cssText }}
                        />,
                    )}
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                    {(!query||query.nojs==undefined)&&scripts.map(script => <script key={script} src={script} />)}
                </body>
            </html>
        );
    }
}

export default Html;
