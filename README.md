# Ambient TV

A simple react-native app to cycle background images (works great on [Chromecast with Google TV](https://store.google.com/gb/product/chromecast_google_tv))

![](./screenshots/screenshot-1.png)

## Features

- Clock
- Live weather by location
- New background every 2 minutes
- Avoids using the same background twice for RSS feeds

## Development

### Env

For now, the `.env` file is **_required_** to build.

There are two image fetch methods: `app-server` which is bundled in this repo, or a custom `RSS` feed

1. Choose a feed method
2. Duplicate `.env.sample` as `.env`
3. Either deploy and use the `app-server` or use an RSS feed consisting of images

```
app/.env

RSS_URL=
APP_SERVER_URL=
FETCH_METHOD=rss/app-server
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
