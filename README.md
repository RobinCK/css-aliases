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
