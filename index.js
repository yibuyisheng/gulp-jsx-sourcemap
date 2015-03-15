var through = require('through2');
var reactTools = require('react-tools');
var assign = require('object-assign');
var gutil = require('gulp-util');

var PluginError = gutil.PluginError;

module.exports = function() {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError('gulp-jsx-sourcemap', 'Streaming not supported'));
        }

        var str = file.contents.toString();
        file.contents = new Buffer(reactTools.transformWithDetails(str, {
            sourceMap: true
        }).sourceMap.mappings);
        file.path = gutil.replaceExtension(file.path, '.map');
        cb(null, file);
    });
};