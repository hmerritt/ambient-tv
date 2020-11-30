# Ambient-TV Image Server

Server to fetch available image files from a Backblaze bucket and parse file name into a useable description.

## Routes

| Route         | Description                          |
| ------------- | ------------------------------------ |
| `/`           | Base root with info about the server |
| `/images`     | Returns an array of images           |
| `/images/rss` | Returns RSS feed of image items      |

## Backblaze naming conventions

This image naming convention **must** be used for this server to work properly.

```
/images/<category>/<image-name>--<image-number>.<file-extension>
```

```
/images/wallpaper/mountains--2.jpg
```

```json
The above file path will get parsed into an object similar to this

{
    "fileName": "mountains--2.jpg",
    "category": "wallpaper",
    "description": "Mountains"
}
```

## Usage

```bash
$ npm install
$ npm start
```

The `.env` file is **_required_** to run.

| Environment Variable | Description              |
| -------------------- | ------------------------ |
| B2_BUCKET            | Name of b2 bucket to use |
| B2_KEY_ID            | B2 API key 1             |
| B2_KEY_APPLICATION   | B2 API key 2             |
| B2_ACCESS_LINK       | B2 bucket link or cdn    |

```
app-server/.env

B2_BUCKET=
B2_KEY_ID=
B2_KEY_APPLICATION=
```

<br>

## License

[Apache-2.0 License](LICENSE)
