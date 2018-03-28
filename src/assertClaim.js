const jwt = require('jsonwebtoken');

module.exports = (tokenSecret, token, claim) => {
  const tokenStr = token.replace('Bearer ', '');

  try {
    const tokenData = jwt.verify(tokenStr, tokenSecret);
    if (tokenData.claims && tokenData.claims[claim]) {
      return true;
    }
    return { status: 403 };
  } catch (e) {
    return { status: 401 };
  }
};
