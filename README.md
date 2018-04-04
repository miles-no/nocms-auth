# nocms-auth

Auth middleware for NoCMS

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-auth.svg)](https://david-dm.org/miles-no/nocms-auth)
[![devDependencies](https://david-dm.org/miles-no/nocms-auth/dev-status.svg)](https://david-dm.org/miles-no/nocms-auth?type=dev)


## Installation

Install nocms-auth from NPM. 

```
npm install nocms-auth --save
```

## Usage

```
const { readClaims, verifyClaim } = require('nocms-auth');

app.use(cookieParser()); // Only needed if Authorization header is not set
app.use(readClaims(config.tokenSecret, logger));

app.post(['/people/*'], verifyClaim('publisher', logger));

```

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).

## API

### readClaims, (tokenSecret, logger)
Read claims from the ``nocms-authenticated`` cookie (requires cookie-parser middleware) or Authorization header. Verifies claims and sets tokenValid, claims and authorizationHeader on res.locals.

### verifyClaim, (claim, logger)
Method to use for ensuring tokenValid and given claim is true. If claim can't be verified, the middleware responds with a 403. Invalid tokens will result in a 401 response.

### assertClaim, (tokenSecret, token, claim)
Method to use for reading a token and asserting a claim. The method returns a promise which will resolve with no params or reject with an error object with a `status`. Status 401 means invalid token, whereas 403 means missing claim.

```js
assertClaim(tokenSecret, token, 'admin')
  .then(() => {
    // I am admin
  })
  .catch((err) => {
    // I am not admin
  });
```
