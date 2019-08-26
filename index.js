'use strict';

var path = require('path');
var namedRegexp = require('named-js-regexp');

module.exports = function (css, resourcePath, aliases) {
  var IMPORT_REGEX = namedRegexp(/^(:<import>@import\s+)(:<less_import_options>\((reference|inline|less|css|once|multiple|optional)\)\s)?\s*(:<url_tag_open>url\()?\s*(:<quote_open>"|')(:<url>.+)\s*(:<quote_close>"|')(:<url_tag_close>\))?(:<context>.*);$/gm);
  var URL_REGEX = namedRegexp(/(:<url_tag_open>url\()\s*(:<quote_open>"|')?(:<url>.+?)\s*(:<quote_close>"|')?(:<url_tag_close>\))/gm);
  css = parse(css, IMPORT_REGEX);
  css = parse(css, URL_REGEX);

  return css;

  function resolve(url, resourcePath) {

    for (var aliasName in aliases) {
      var regExp = new RegExp('^' + aliasName + '(.*)');

      if (regExp.test(url)) {
        return path.relative(path.dirname(resourcePath), path.resolve(aliases[aliasName] + url.replace(regExp, '$1'))).replace(/\\/g, '/');
      }
    }

    return url;
  }

  function parse(css, regex) {
    var m, importOriginal, importReplace, replace = [];

    while ((m = regex.exec(css)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      replace.push(m);
    }

    for (var item in replace) {
      m = replace[item];

      importOriginal = '';
      importReplace = '';
      var mathGroups = m.groups();

      for (var groupName in mathGroups) {
        var match = mathGroups[groupName];
        importOriginal += typeof match !== 'undefined' ? match : '';

        if (groupName !== 'url') {
          importReplace += typeof match !== 'undefined' ? match : '';
        } else {
          importReplace += resolve(match, resourcePath);
        }
      }

      if (importOriginal !== importReplace) {
        css = css.replace(importOriginal, importReplace);
      }
    }

    return css;
  }
};
