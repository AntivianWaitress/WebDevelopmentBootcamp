# passport-oauth1

[![Build Status](https://travis-ci.org/passport-next/passport-oauth1.svg?branch=master)](https://travis-ci.org/passport-next/passport-oauth1)
[![Coverage Status](https://coveralls.io/repos/github/passport-next/passport-oauth1/badge.svg?branch=master)](https://coveralls.io/github/passport-next/passport-oauth1?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/d85da13ecfc1e1b31f38/maintainability)](https://codeclimate.com/github/passport-next/passport-oauth1/maintainability)
[![Dependencies](https://david-dm.org/passport-next/passport-oauth1.png)](https://david-dm.org/passport-next/passport-oauth1)
<!--[![SAST](https://gitlab.com/passport-next/passport-oauth1/badges/master/build.svg)](https://gitlab.com/passport-next/passport-oauth1/badges/master/build.svg)-->


General-purpose OAuth 1.0 authentication strategy for [Passport](http://passportjs.org/).

This module lets you authenticate using OAuth in your Node.js applications.
By plugging into Passport, OAuth authentication can be easily and unobtrusively
integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

Note that this strategy provides generic OAuth support.  In many cases, a
provider-specific strategy can be used instead, which cuts down on unnecessary
configuration, and accommodates any provider-specific quirks.  See the
[list](https://github.com/jaredhanson/passport/wiki/Strategies) for supported
providers.

Developers who need to implement authentication against an OAuth provider that
is not already supported are encouraged to sub-class this strategy.  If you
choose to open source the new provider-specific strategy, please add it to the
list so other people can find it.

## Install

    $ npm install @passport-next/passport-oauth1

## Usage

#### Configure Strategy

The OAuth authentication strategy authenticates users using a third-party
account and OAuth tokens.  The provider's OAuth endpoints, as well as the
consumer key and secret, are specified as options.  The strategy requires a
`verify` callback, which receives a token and profile, and calls `cb`
providing a user.

    passport.use(new OAuth1Strategy({
        requestTokenURL: 'https://www.example.com/oauth/request_token',
        accessTokenURL: 'https://www.example.com/oauth/access_token',
        userAuthorizationURL: 'https://www.example.com/oauth/authorize',
        consumerKey: EXAMPLE_CONSUMER_KEY,
        consumerSecret: EXAMPLE_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/example/callback",
        signatureMethod: "RSA-SHA1"
      },
      function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ exampleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'oauth'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/example',
      passport.authenticate('oauth'));
    
    app.get('/auth/example/callback', 
      passport.authenticate('oauth', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Contributing

#### Tests

The test suite is located in the `test/` directory.  All new features are
expected to have corresponding test cases.  Ensure that the complete test suite
passes by executing:

```bash
$ make test
```

#### Coverage

All new feature development is expected to have test coverage.  Patches that
increse test coverage are happily accepted.  Coverage reports can be viewed by
executing:

```bash
$ make test-cov
$ make view-cov
```
