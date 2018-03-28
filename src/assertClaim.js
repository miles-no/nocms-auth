const jwt = require('jsonwebtoken');

module.exports = (tokenSecret, token, claim) => {
  return new Promise((resolve, reject) => {
    const tokenStr = token.replace('Bearer ', '');

    jwt.verify(tokenStr, tokenSecret, (err, tokenData) => {
      if (err) {
        reject({ status: 401 });
        return;
      }
      if (tokenData.claims && tokenData.claims[claim]) {
        resolve();
        return;
      }
      reject({ status: 403 });
    });
  });
};
