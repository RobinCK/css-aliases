'use strict';

var path = require('path');
var rework = require('rework');
var url = require('rework-plugin-url');
var reworkCss = require('css');

module.exports = function (css, resourcePath, aliases) {
    var obj = reworkCss.parse(css);
    var resolve = function(url, resourcePath) {
        for (var aliasName in aliases) {
            var regExp = new RegExp('^' + aliasName + '(.*)')

            if (regExp.test(url)) {
                return path.relative(path.dirname(resourcePath), path.resolve(aliases[aliasName] + url.replace(regExp, '$1')));
            }
        }

        return url;
    }

    for (var style in obj.stylesheet.rules) {
        if (obj.stylesheet.rules[style].type === 'import') {
            obj.stylesheet.rules[style].import = '"' + resolve(obj.stylesheet.rules[style].import.toString().replace (/(^"|')(.+?)("|'$)/, '$2'), resourcePath, aliases) + '"';
        }
    }

    css = reworkCss.stringify(obj);

    return rework(css)
        .use(url(function(url) {
            return resolve(url, resourcePath, aliases);
        }))
        .toString()
    ;
}
