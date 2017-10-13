const jwt = require('jsonwebtoken');

module.exports = (tokenSecret, logger = console) => {
  return (req, res, next) => {
    const cookieName = 'nocms-authenticated';
    let token = (req.cookies && req.cookies[cookieName]) ?
      req.cookies[cookieName] : req.headers.authorization || '';

    token = token.replace('Bearer ', '');

    if (!req.locals) {
      Object.assign(req, { locals: {} });
    }
    res.locals.claims = [];

    jwt.verify(token, tokenSecret, {}, (err, decoded) => {
      if (err) {
        Object.assign(req.locals, {
          claims: [],
          authorizationHeader: `Bearer ${token}`,
          tokenValid: false,
        });
        logger.info('token invalid');
        logger.info(JSON.stringify(req.locals.claims));
        next();
        return;
      }
      Object.assign(req.locals, {
        claims: (decoded && decoded.claims) || [],
        authorizationHeader: `Bearer ${token}`,
        tokenValid: true,
      });
      logger.info('token valid');
      logger.info(JSON.stringify(req.locals.claims));
      next();
    });
  };
};
