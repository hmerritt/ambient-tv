# Ambient TV / App

## Development

### Setup

Install Node.js 22.13 or newer (Node.js 24 is recommended), then enable Corepack:

```sh
corepack enable
yarn
```

### Start

Start Metro Bundler

```sh
yarn start
```

---

```powershell
netstat -ano | findstr ":80"
taskkill /PID <PID> /F
```

## Build

Build for release `.aab`

```sh
yarn android:build
```

Build for development `.apk`

```sh
yarn android:build:development
```

Build remotely for iOS or Android:

```sh
yarn ios:build:remote
yarn android:build:remote
```

Run the local validation checks:

```sh
yarn typecheck
yarn format:check
yarn doctor
yarn web:build
```
