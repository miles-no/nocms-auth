const jwt = require('jsonwebtoken');

module.exports = (tokenSecret, token, claim) => {
  return new Promise((resolve, reject) => {
    const tokenStr = token.replace('Bearer ', '');

    try {
      const tokenData = jwt.verify(tokenStr, tokenSecret);
      if (tokenData.claims && tokenData.claims[claim]) {
        resolve();
      }
      reject({ status: 403 });
    } catch (e) {
      reject({ status: 401 });
    }
  });
};
