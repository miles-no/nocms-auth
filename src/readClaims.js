const jwt = require('jsonwebtoken');

module.exports = (tokenSecret, logger = console) => {
  return (req, res, next) => {
    const cookieName = 'nocms-authenticated';
    let token = (req.cookies && req.cookies[cookieName]) ?
      req.cookies[cookieName] : req.headers.authorization || '';

    token = token.replace('Bearer ', '');

    if (!res.locals) {
      Object.assign(res, { locals: {} });
    }

    jwt.verify(token, tokenSecret, {}, (err, decoded) => {
      if (err) {
        Object.assign(res.locals, {
          claims: {},
          authorizationHeader: `Bearer ${token}`,
          tokenValid: false,
        });
        logger.warn('Token invalid', { req, res }, 'express');
        next();
        return;
      }
      Object.assign(res.locals, {
        claims: (decoded && decoded.claims) || {},
        authorizationHeader: `Bearer ${token}`,
        tokenValid: true,
      });
      logger.info('Token valid', { req, res }, 'express');
      next();
    });
  };
};
