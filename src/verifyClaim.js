module.exports = (claim, logger = console) => {
  return (req, res, next) => {
    const { claims, tokenValid } = req.locals;

    if (tokenValid && claims && claims[claim]) {
      next();
      return;
    } else if (!tokenValid) {
      logger.error('invalid token');
    } else {
      logger.error(`Unauthorized. ${req.originalUrl} needs ${claim}. Client claims: ${JSON.stringify(claims)}`);
    }
    res.status(403).send('403 Forbidden').end();
  };
};
