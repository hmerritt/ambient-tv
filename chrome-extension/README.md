# Ambient TV Chrome Extension

## Setup

1. Use `expo` to build app for the web

```bash
$ cd app
$ expo build:web
```

2. Copy all build files (except the `manifest.json`) from `web-build` to `chrome-extension`

```
app/
    ...
    web-build/
        ...
        copy everything (not manifest.json)

chrome-extension/
    ...
    place build files here
```

3. `Load unpacked` extension in Chrome and you're good to go!
