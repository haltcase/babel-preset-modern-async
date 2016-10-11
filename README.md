# babel-preset-modern-async

Semi-opinionated preset for Babel based on `babel-preset-latest` but
using [`fast-async`](https://github.com/MatAtBread/fast-async) for `async`/`await` transpilation instead of
generators. Also includes configuration options for using Bluebird as the
Promise library, targeting Electron, and setting a stage ( ie. `stage-0` )

## Install

`npm i babel-preset-modern-async`

## Usage

Minimum configuration:

```json
{
  "presets": ["modern-async"]
}
```

You can also pass in a configuration object ( _configuration intensifies_ ):

```json
{
  "presets": [["modern-async", {
    "fast-async": {
      "env": {
        "augmentObject": false,
        "dontMapStackTraces": true,
        "dontInstallRequireHook": true
      },
      "compiler": {
        "promises": true,
        "generators": false
      },
      "runtimePattern": "directive",
      "useRuntimeModule": false
    },
    "electron": false,
    "promise": "bluebird",
    "stage": 0
  }]]
}
```

The above are the default options, the bulk of which come from
[`fast-async`](https://github.com/MatAtBread/fast-async). The rest:

- `electron`

  When set to true, many plugins will be excluded that the
  Electron environment natively supports. Similar to the `babel-preset-electron`
  preset.

- `promise`

  Determines the Promise implementation, which is left native
  (or whatever you use at runtime) when this option is anything but `'bluebird'`
  (currently the only option with any affect). When set to `'bluebird'`,
  the `bluebird` library is automatically inserted and all Promise references
  use it without further configuration.

  _NOTE: The `bluebird` library is not a dependency of this preset.
  If you intend to use this option, you must install it yourself._

- `stage`

  A number representing the ES feature stage to use in addition
  to the `latest` preset. These correspond to the Babel `-stage-*` presets.

> More advanced configuration notes are in progress.

## License

MIT © Bo Lingen / citycide

See [LICENSE](LICENSE)
