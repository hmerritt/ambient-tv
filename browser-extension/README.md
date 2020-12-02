# Ambient TV Browser Extension

## Setup

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
    ...
    place build files here
```

3. `Load unpacked` extension in Chrome or Firefox and you're good to go!
