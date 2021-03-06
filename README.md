# Ambient TV

A simple react-native app to cycle background images (works great on [Chromecast with Google TV](https://store.google.com/gb/product/chromecast_google_tv))

![](https://img.shields.io/github/v/release/hmerritt/ambient-tv.svg) ![](https://img.shields.io/github/license/hmerritt/ambient-tv)

![](./screenshots/screenshot-1.png)

## Features

- Clock
- Live weather by location
- New background every 2 minutes
- Avoids using the same background twice for RSS feeds

## Development

### Env

For now, the `env.js` file is **_required_** to build.

There are two image fetch methods: `app-server` which is bundled in this repo, or a custom `RSS` feed

1. Choose a feed method
2. Duplicate `env.sample.js` as `env.js`
3. Either deploy and use the `app-server` or use an RSS feed consisting of images

```
app/env.js

export default {
    ANIMATION_LONG: 3000,
    ANIMATION_SHORT: 1000,
    APP_SERVER_URL: '',
    FETCH_METHOD: '',
    IMAGE_TIMER: 120000,
    OPENWEATHERMAP_KEY: '',
    RSS_URL: '',
    TITLE: 'Ambient TV',
};
```

```
app-server/.env

B2_BUCKET=
B2_KEY_ID=
B2_KEY_APPLICATION=
B2_ACCESS_LINK=https://f002.backblazeb2.com
```

## License

[Apache-2.0 License](LICENSE)
