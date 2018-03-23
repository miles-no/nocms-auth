module.exports = (claim, logger = console) => {
  return (req, res, next) => {
    const { claims, tokenValid, tokenExpired } = res.locals;

    if (tokenValid && claims && claims[claim]) {
      next();
      return;
    }
    if (!tokenValid) {
      logger.error('Invalid token');
      res
        .status(401)
        .append('WWW-Authenticate', tokenExpired ? 'Reauth' : 'Login')
        .send('401 Unauthorized');
      return;
    }
    logger.error(`Unauthorized. ${req.originalUrl} needs ${claim}. Client claims: ${JSON.stringify(claims)}`);
    res.status(403).send('403 Forbidden');
  };
};
