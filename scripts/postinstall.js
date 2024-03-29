/* eslint-disable @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/

const fs = require("fs");
const rimraf = require("rimraf");

// get blocks json allowed strings

let themesLocaleList = [];

let targetTimeZones = [];

const packageName = "@wpmedia/timezone";

// in this case, wherever npm i was called
// init cwd is the filepath of the initiating command
const dirPath = `${process.env.INIT_CWD}/node_modules/${packageName}/`;

let targetBlockValues = {};
try {
	// eslint-disable-next-line global-require,import/no-dynamic-require
	targetBlockValues = require(`${process.env.INIT_CWD}/src/blocks.json`).values;

	const defaultLocalizationObject = targetBlockValues.default.siteProperties.dateLocalization;

	// must have a default language and timezone
	// redefining locale list over the defaults
	themesLocaleList = [defaultLocalizationObject.language];
	targetTimeZones = [defaultLocalizationObject.timeZone];
	/*
    "sites": {
      "arc-demo-1": {
      "siteProperties": {
        "dateLocalization": {
          "language": "es",
          "timeZone": "Europe/Madrid"
        },
      }
    }
  */

	// if sites exists
	if (targetBlockValues.sites) {
		// obj with key is truthy if sites property exists
		Object.values(targetBlockValues.sites).forEach(({ siteProperties: sitePropertyObject }) => {
			// if site has no date localization obj
			if (sitePropertyObject.dateLocalization) {
				if (typeof sitePropertyObject.dateLocalization.language === "string") {
					themesLocaleList.push(sitePropertyObject.dateLocalization.language);
				}
				if (typeof sitePropertyObject.dateLocalization.timeZone === "string") {
					targetTimeZones.push(sitePropertyObject.dateLocalization.timeZone);
				}
			}
		});
	}

	// dedupe languages and timezones if any added
	themesLocaleList = [...new Set(themesLocaleList)];
	targetTimeZones = [...new Set(targetTimeZones)];
} catch (err) {
	// set themes locale list default if target blocks.json file not found
	themesLocaleList = ["en", "sv", "no", "fr", "de", "es", "ja", "ko"];

	// set timezones default if target blocks.json file not found
	targetTimeZones = [
		"Europe/Paris",
		"Europe/Oslo",
		"Europe/Stockholm",
		"America/New_York",
		"America/Chicago",
		"America/Los_Angeles",
		"America/Mexico_City",
		"Pacific/Auckland",
	];

	// if debugging file paths locally this could be helpful
	// nested dependency postinstall logging doesn't bubble up sadly in compiler
	// installed here https://github.com/WPMedia/fusion/blob/927f59d2723551f3f381363ca74ecaae8dd1ef87/compiler/src/compile.js#L63
	// console.log(`${process.env.INIT_CWD}/src/blocks.json`, 'not found');
}

function unlinkSyncWithErrorLogging(targetPath) {
	try {
		fs.unlinkSync(targetPath);
	} catch (err) {
		// if debugging locally, this logging can be helpful
		// in the fusion compiler, this logging would not bubble up
		// as far as I understand, nested dependency postinstall scripts don't log
		// also interestingly, if you run `rm -rf node_modules && npm i && npm i`
		// you would see this log because the double install
		// only installs once but the postinstall script runs twice
		// https://docs.npmjs.com/cli/v7/using-npm/scripts
		// console.log(targetPath, 'not deleted');
	}
}

// input: themes locale
// output: timezone-compatible locale
function mapThemesLocales(themesLocaleString) {
	let locale = "";

	// via localizeDateHelper
	switch (themesLocaleString) {
		case "sv":
			locale = "sv_SE";
			break;
		case "fr":
			locale = "fr_FR";
			break;
		case "no":
			locale = "nb_NO";
			break;
		case "de":
			locale = "de_DE";
			break;
		case "es":
			locale = "es_ES";
			break;
		case "ja":
			locale = "ja_JP";
			break;
		case "ko":
			locale = "ko_KR";
			break;
		case "pt":
			locale = "pt_PT";
			break;
		case "en":
			locale = "en_US";
			break;
		default:
			locale = themesLocaleString;
	}
	return locale;
}

const DELETABLE_FILES = [
	"CHANGELOG",
	"README.md",

	"synopsis.js", // used for tutorial purposes
	"loaded.js", // loads everything, we're only using zones.js and locales.js
];

// the timezones require these base timezone files
const TIMEZONE_CODES = [
	"CET.js",
	"CST6CDT.js",
	"EET.js",
	"EST.js",
	"EST5EDT.js",
	"HST.js",
	"MET.js",
	"MST.js",
	"MST7MDT.js",
	"PST8PDT.js",
	"WET.js",
];

// all keeping js
const packageKeepLocaleList = themesLocaleList.map(
	(themeLocale) => `${mapThemesLocales(themeLocale)}.js`
);

function outputExportsString(targetFileNamesArray, fileExtension = "") {
	let requireStatements = "";

	targetFileNamesArray.forEach((targetFileNameWithExtension) => {
		requireStatements += `require("./${targetFileNameWithExtension}${fileExtension}"),`;
	});

	return `module.exports = [${requireStatements}]`;
}

// many files have no chance of being picked in blocks.json
function deleteUnnecessaryFiles() {
	DELETABLE_FILES.forEach((unnecessaryFileString) =>
		unlinkSyncWithErrorLogging(`${dirPath}${unnecessaryFileString}`)
	);
}

function deleteUnusedFiles() {
	// take in locale list

	const TIMEZONE_ALLOW_LIST = [
		"index.js", // entry
		"package.json",
		"rfc822.js",
		"locales.js", // requires all locales
		"zones.js", // loads all timezones
	];

	fs.readdirSync(dirPath).forEach((fileName) => {
		if (
			!packageKeepLocaleList.includes(fileName) &&
			fs.lstatSync(`${dirPath}${fileName}`).isFile() &&
			!TIMEZONE_ALLOW_LIST.includes(fileName) &&
			!TIMEZONE_CODES.includes(fileName)
		) {
			unlinkSyncWithErrorLogging(`${dirPath}${fileName}`);
		}
	});
}

// incoming ['Pacific/Auckland',]

function loopAndSetTimezoneContinents(incomeTargetTimezones) {
	const incomingTimezonesObject = incomeTargetTimezones.reduce((outputObject, currentItem) => {
		const [topLevelTimezone, nestedTimezone] = currentItem.split("/");
		const newOutputObject = outputObject;
		newOutputObject[topLevelTimezone] = [...(outputObject[topLevelTimezone] || []), nestedTimezone];

		return newOutputObject;
	}, {});

	const incomingTimezonesArray = Object.keys(incomingTimezonesObject);

	const ALL_TOPLEVEL_TIMEZONES = [
		"Africa",
		"America",
		"Antarctica",
		"Arctic",
		"Asia",
		"Atlantic",
		"Australia",
		"Brazil",
		"Canada",
		"Chile",
		"Etc",
		"Europe",
		"Indian",
		"Mexico",
		"Pacific",
		"US",
	];

	ALL_TOPLEVEL_TIMEZONES.forEach((topLevelTimezoneFolder) => {
		if (!incomingTimezonesArray.includes(topLevelTimezoneFolder)) {
			// todo: when we upgrade to node 12 fully
			// use fs.rmdir for recursive folder deletion
			rimraf(`${dirPath}${topLevelTimezoneFolder}`, (err) => {
				if (err) {
					throw err;
				}
			});
		} else {
			const targetNestedTimezones = incomingTimezonesObject[topLevelTimezoneFolder];
			fs.readdirSync(`${dirPath}${topLevelTimezoneFolder}`).forEach((nestedFile) => {
				const fileNameWithoutExtension = nestedFile.split(".")[0];
				// want to keep index files
				const targetFilePath = `${dirPath}${topLevelTimezoneFolder}/${nestedFile}`;

				if (
					!targetNestedTimezones.includes(fileNameWithoutExtension) &&
					fileNameWithoutExtension !== "index"
				) {
					if (fs.lstatSync(targetFilePath).isFile()) {
						unlinkSyncWithErrorLogging(targetFilePath);
					} else {
						rimraf(targetFilePath, (err) => {
							if (err) {
								throw err;
							}
						});
					}
				}

				if (fileNameWithoutExtension === "index") {
					fs.writeFileSync(targetFilePath, outputExportsString(targetNestedTimezones, ".js"));
				}
			});
		}
	});
	// output what should be required
	const allRequireStatementsArray = [...TIMEZONE_CODES, ...incomingTimezonesArray];
	return outputExportsString(allRequireStatementsArray);
}

function updateEntryFileRequiredFiles() {
	// only add back the the locales used

	const startingLocaleString = outputExportsString(packageKeepLocaleList);
	const startingOutputString = loopAndSetTimezoneContinents(targetTimeZones);
	fs.writeFileSync(`${dirPath}zones.js`, startingOutputString);
	fs.writeFileSync(`${dirPath}locales.js`, startingLocaleString);
}

// delete files that are never used
deleteUnnecessaryFiles();

// delete files that may be needed
deleteUnusedFiles();

updateEntryFileRequiredFiles();
