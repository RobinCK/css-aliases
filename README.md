<div align="center">

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)[![Build Status](https://img.shields.io/travis/RobinCK/css-aliases.svg?style=flat-square)](https://travis-ci.org/RobinCK/css-aliases)[![Code Climate](https://img.shields.io/codeclimate/github/RobinCK/css-aliases.svg?style=flat-square)](https://codeclimate.com/github/RobinCK/css-aliases)[![npm](https://img.shields.io/npm/dt/css-aliases.svg?style=flat-square)](https://github.com/RobinCK/css-aliases)[![Dependencies](https://david-dm.org/robinck/css-aliases.svg?style=flat-square)](https://david-dm.org/robinck/css-aliases)[![devDependencies](https://david-dm.org/robinck/css-aliases/dev-status.svg?style=flat-square)](https://david-dm.org/robinck/css-aliases#info=devDependencies&view=table)[![NPM version](https://img.shields.io/npm/v/css-aliases.svg?style=flat-square)](https://www.npmjs.com/package/css-aliases)
</div>

# css-aliases

## Install

```
$ npm install --save css-aliases
```

## Usage

```js
var cssAliasses = require('css-aliases');
var fs = require('fs');

var resourcePath = './style.less'; //or css, scss
var aliasess = {
    "@aliasName": "path/to/your/folder"
};
var css = cssAliasses(fs.readFileSync(resourcePath, 'utf8'), resourcePath, aliases)
```

A javascript file before compilation
```less
@import "@aliasName/css/user.less";

body {
  background: #9e9e9e;
}
```

will become:
```less
@import "path/to/your/folder/css/user.less";

body {
  background: #9e9e9e;
}
```
