---
template: default.ejs
theme: dark
title: Unexpected-require
repository: https://github.com/unexpectedjs/unexpected-require
---

Easily mock out `require`d modules using [Unexpected](http://unexpected.js.org)
and [mock-require](https://github.com/boblauer/mock-require).

**NOTE:** This only works with modules that are required at run time!

[![NPM version](https://badge.fury.io/js/unexpected-require.svg)](http://badge.fury.io/js/unexpected-require)
[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-require.svg?branch=master)](https://travis-ci.org/unexpectedjs/unexpected-require)
[![Coverage Status](https://coveralls.io/repos/unexpectedjs/unexpected-require/badge.svg)](https://coveralls.io/r/unexpectedjs/unexpected-require)
[![Dependency Status](https://david-dm.org/unexpectedjs/unexpected-require.svg)](https://david-dm.org/unexpectedjs/unexpected-require)

Read [the documentation](http://unexpected.js.org/unexpected-require/).

```js
expect(function () {
    require('./some-module');
}, 'with require mocked out', {
    './some-module': {}
}, 'not to throw');
```
