export default basicAuth = (req, res, next) => {

    let authHeader = req.headers.authorization,
        realm = 'Your site';

    if (!authHeader) {
       unauthorized(res);
    } else {
        let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        auth = {
            user: auth[0],
            pass: auth[1]
        };

        if (auth.user == 'word' && auth.pass == 'press') {
            next();
        } else {
            unauthorized(res);
        }
    }
};

function unauthorized(res, realm) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="' + realm + '"');
    res.end('Unauthorized');
}
