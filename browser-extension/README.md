# Ambient TV Browser Extension

## Build

### Using build script (recommended)

1. Install app dependencies

```bash
$ cd app
$ yarn install
```

2. Create `env.js` from `env.sample.js` and fill in the desired values

```
export default {
  ANIMATION_LONG: 1500,
  ANIMATION_SHORT: 750,
  APP_SERVER_URL: "",
  FETCH_METHOD: "",
  IMAGE_TIMER: 120, //  1 = 1s // 120 = 2m
  OPENWEATHERMAP_KEY: "",
  RSS_URL: "",
  TITLE: "",
};
```

2. Run build script

```bash
$ cd browser-extension
$ node build.js
```

### Manual

Steps 1 and 2 from above +

1. Use `expo` to build app for the web

```bash
$ cd app
$ expo build:web
```

2. Copy all build files (except the `manifest.json`) from `web-build` to `browser-extension`

```
app/
    ...
    web-build/
        ...
        copy everything (not manifest.json)

browser-extension/
    build/
        place build files here
```

3. `Load unpacked` extension in Chrome or Firefox and you're good to go!
