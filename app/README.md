# Ambient TV / App

## Development

### Setup

```
npm i -g eas-cli @expo/ngrok@^4.1.0 sharp-cli@^2.1.0
```

```
yarn
```

### Start

Start Metro Bundler

```
yarn start
```

---

```
netstat -ano | findstr ":80"
taskkill /PID <PID> /F
```

## Build

Build for release `.aab`

```
yarn android:build
```

Build for development `.apk`

```
yarn android:build:development
```
