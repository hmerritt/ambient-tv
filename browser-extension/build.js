const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const APP_DIR = path.join(path.dirname(__dirname), "/app");
const BUILD_DIR = path.join(__dirname, "./build");

/*
 * Execute system command (sync)
 */
const exec = (command) => {
	try {
		const stdout = execSync(command);
	} catch (err) {
		error("Fatal error caused the script to fail");
	}
	// console.log(output.stdout);
	// return output;
};

/*
 * Log an error and exit
 */
const error = (error) => {
	console.error(`\x1b[31mERROR:
    ${error}
`);
	process.exit(1);
	return false;
};

/*
 * Is path a directory (sync)
 */
const isDirectory = (path) => {
	if (!fs.existsSync(path)) return false;
	const stats = fs.statSync(path);
	return stats.isDirectory();
};

/*
 * Is path a file (sync)
 */
const isFile = (path) => {
	if (!fs.existsSync(path)) return false;
	const stats = fs.statSync(path);
	return stats.isFile();
};

/*
 * Create directory if it does not exist (sync)
 */
const mkdir = (path) => {
	if (fs.existsSync(path)) return true;
	fs.mkdirSync(path);
};

/*
 * Create a copy of a file (sync)
 */
const fileCopy = (src, dest) => {
	if (!isFile(src)) return false;
	fs.copyFileSync(src, dest);
};

/*
 * Create a backup of a file (sync)
 */
const fileBackup = (path) => {
	fileCopy(path, `${path}.backup`);
};

/*
 * Delete file if one exists (sync)
 */
const fileDelete = (path) => {
	if (!isFile(path)) return false;
	fs.unlinkSync(path);
};

/*
 * Delete directory if one exists (sync)
 */
const directoryDelete = (dirPath) => {
	if (!isDirectory(dirPath)) return false;

	const contents = fs.readdirSync(dirPath);

	for (const item of contents) {
		const fullPath = path.join(dirPath, item);

		if (isDirectory(fullPath)) {
			directoryDelete(fullPath);
		} else {
			fileDelete(fullPath);
		}
	}

	fs.rmdirSync(dirPath);
	return true;
};

/*
 * Copy all files from a directory (sync)
 */
const fileCopyDirectory = (src, dest) => {
	if (!isDirectory(src)) return fileCopy(src, dest);
	mkdir(dest);
	fs.readdirSync(src).forEach((childItemName) => {
		fileCopyDirectory(
			path.join(src, childItemName),
			path.join(dest, childItemName)
		);
	});
};

/*
 * Main execution
 */
const main = () => {
	console.log("Building \x1b[32mAmbient TV\x1b[0m browser extension");

	// Check if app node_modules exists
	if (!isDirectory(`${APP_DIR}/node_modules`))
		return error(
			"node_modules not found in app directory - run 'yarn install' or 'npm install' to install app dependencies"
		);

	// Check if env.js exists
	if (!isFile(`./env.js`))
		return error(
			"env.js not found in current directory - use env.sample.js as a template"
		);

	// Backup env.js in app
	console.log("  * 1/7  Backup existing env.js");
	fileBackup(`${APP_DIR}/env.js`);

	// Move env.js into app
	console.log("  * 2/7  Copy env.js to app directory");
	fileCopy("./env.js", `${APP_DIR}/env.js`);

	// Build web-app
	console.log("  * 3/7  Build app for web");
	exec(`cd ${APP_DIR} && yarn web:build`);

	// Reset build directory
	console.log("  * 4/7  Reset build directory");
	directoryDelete(BUILD_DIR);
	mkdir(BUILD_DIR);

	// Copy build files to dist
	console.log("  * 5/7  Copy build files to build directory");
	fileCopyDirectory(`${APP_DIR}/dist`, `${BUILD_DIR}`);
	fileCopy(`./icon-16.png`, `${BUILD_DIR}/icon-16.png`);
	fileCopy(`./icon-32.png`, `${BUILD_DIR}/icon-32.png`);
	fileCopy(`./icon-192.png`, `${BUILD_DIR}/icon-192.png`);
	fileCopy(`./manifest.json`, `${BUILD_DIR}/manifest.json`);

	// Replace words `Ambient TV` with `New Tab`
	console.log(`  * 6/7  Replace index.html title with "New Tab"`);
	const htmlData = fs.readFileSync(`${BUILD_DIR}/index.html`, "utf8");
	fs.writeFileSync(`${BUILD_DIR}/index.html`, htmlData.replace(
		`<title>Ambient TV</title>`,
		`<title>New Tab</title>`
	), 'utf8');


	// Restore app env.js backup
	console.log("  * 7/7  Restore app env.js backup");
	fileCopy(`${APP_DIR}/env.js.backup`, `${APP_DIR}/env.js`);
	fileDelete(`${APP_DIR}/env.js.backup`);
};

// Run main
main();
