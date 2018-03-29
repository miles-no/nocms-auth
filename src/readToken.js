module.exports = (token) => {
  const parts = token.split('.');
  return JSON.parse(Buffer.from(parts[1], 'base64'));
};
