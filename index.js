var assign = require('merge-options')
var modify = require('modify-babel-preset')

module.exports = function preset (ctx, opt) {
  var obj = assign({}, {
    'fast-async': {
      runtimePattern: 'directive'
    },
    electron: false,
    promise: 'bluebird',
    stage: 0
  }, opt)

  var es2015transforms = {
    'transform-regenerator': false
  }

  var es2017transforms = {
    'transform-async-to-generator': false
  }

  var electron2015 = {
    'transform-es2015-template-literals': false,
    'transform-es2015-literals': false,
    'transform-es2015-function-name': false,
    'transform-es2015-arrow-functions': false,
    'transform-es2015-block-scoped-functions': false,
    'transform-es2015-classes': false,
    'transform-es2015-object-super': false,
    'transform-es2015-shorthand-properties': false,
    'transform-es2015-duplicate-keys': false,
    'transform-es2015-computed-properties': false,
    'transform-es2015-for-of': false,
    'transform-es2015-sticky-regex': false,
    'transform-es2015-unicode-regex': false,
    'check-es2015-constants': false,
    'transform-es2015-spread': false,
    'transform-es2015-parameters': false,
    'transform-es2015-block-scoping': false,
    'transform-es2015-typeof-symbol': false
  }

  if (!obj.electron) assign(es2015transforms, electron2015)

  var es2015 = modify('es2015', es2015transforms).plugins
  var es2016 = modify('es2016').plugins
  var es2017 = modify('es2017', es2017transforms).plugins

  var stage = (function () {
    switch (obj.stage) {
      case 0: return [
        require('babel-plugin-transform-do-expressions'),
        require('babel-plugin-transform-function-bind'),
        require('babel-plugin-transform-export-extensions'),
        require('babel-plugin-transform-object-rest-spread'),
        require('babel-plugin-transform-class-properties')
      ]
      case 1: return [
        require('babel-plugin-transform-export-extensions'),
        require('babel-plugin-transform-object-rest-spread'),
        require('babel-plugin-transform-class-properties')
      ]
      case 2: return [
        require('babel-plugin-transform-object-rest-spread'),
        require('babel-plugin-transform-class-properties')
      ]
      case 3: return [
        // stage-3 only contains plugins also in es2016/7
        // they will be removed in the next major version
      ]
    }
  })()

  var plugins = [].concat([
    [require('fast-async'), obj['fast-async']],
    obj.promise === 'bluebird' && require('babel-plugin-transform-promise-to-bluebird').default
  ], es2015, es2016, es2017, stage).filter(Boolean)

  return {
    plugins: plugins
  }
}
