/* eslint-disable @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/

const fs = require('fs');

// input: themes locale
// output: timezone-compatible locale
function mapThemesLocales(themesLocaleString) {
  let locale = '';

  // via localizeDateHelper
  switch (themesLocaleString) {
    case 'sv':
      locale = 'sv_SE';
      break;
    case 'fr':
      locale = 'fr_FR';
      break;
    case 'no':
      locale = 'nb_NO';
      break;
    case 'de':
      locale = 'de_DE';
      break;
    case 'es':
      locale = 'es_ES';
      break;
    case 'ja':
      locale = 'ja_JP';
      break;
    case 'ko':
      locale = 'ko_KR';
      break;
    case 'en':
    default:
      locale = 'en_US';
  }
  return locale;
}

const DELETABLE_FILES = [
  'CHANGELOG',
  'README.md',

  'synopsis.js', // used for tutorial purposes

  // unavailable locales
  'af_ZA.js',
  'am_ET.js',
  'ast_ES.js',
  'bg_BG.js',
  'bn_BD.js',
  'bn_IN.js',
  'ca_ES.js',
  'cs_CZ.js',
  'de_AT.js',
  'de_CH.js',
  'el_GR.js',
  'en_AU.js',
  'en_CA.js',
  'en_GB.js',
  'en_HK.js',
  'en_NZ.js',
  'es_AR.js',
  'es_CL.js',
  'es_CO.js',
  'es_CR.js',
  'es_DO.js',
  'es_EC.js',
  'es_GT.js',
  'es_HN.js',
  'es_MX.js',
  'es_NI.js',
  'es_PA.js',
  'es_PE.js',
  'es_PR.js',
  'es_SV.js',
  'es_UY.js',
  'es_VE.js',
  'eu_ES.js',
  'fi_FI.js',
  'fr_BE.js',
  'fr_CA.js',
  'fr_CH.js',
  'gl_ES.js',
  'he_IL.js',
  'hi_IN.js',
  'hr_HR.js',
  'hu_HU.js',
  'id_ID.js',
  'it_CH.js',
  'it_IT.js',
  'lt_LT.js',
  'lv_LV.js',
  'ms_MY.js',
  'nds_DE.js',
  'nl_BE.js',
  'nl_NL.js',
  'pl_PL.js',
  'pt_BR.js',
  'pt_PT.js',
  'ru_RU.js',
  'si_LK.js',
  'sl_SI.js',
  'sq_AL.js',
  'sr_RS.js',
  'ta_IN.js',
  'uk_UA.js',
  'ur_PK.js',
  'vi_VN.js',
  'zh_CN.js',
  'zh_HK.js',
  'zh_TW.js',
];

const themesLocaleList = [
  'en',
  'sv',
  'no',
  'fr',
  'de',
  'es',
  'ja',
  'ko',
];

const targetTimeZones = [
  'Europe/Paris',
  'Europe/Oslo',
  'Europe/Stockholm',
  'America/New_York',
  'America/Chicago',
  'America/Los_Angeles',
  'America/Mexico_City',
  'Pacific/Auckland',
];

// the timezones require these base timezone files
const TIMEZONE_CODES = [
  'CET.js',
  'CST6CDT.js',
  'EET.js',
  'EST.js',
  'EST5EDT.js',
  'HST.js',
  'MET.js',
  'MST.js',
  'MST7MDT.js',
  'PST8PDT.js',
  'WET.js',
];

// all keeping js
const packageKeepLocaleList = themesLocaleList.map((themeLocale) => `${mapThemesLocales(themeLocale)}.js`);

const packageName = 'timezone';

const dirPath = `node_modules/${packageName}/`;

function outputExportsString(targetFileNamesArray, fileExtension = '') {
  let requireStatements = '';

  targetFileNamesArray.forEach((targetFileNameWithExtension) => {
    requireStatements += `require("./${targetFileNameWithExtension}${fileExtension}"),`;
  });

  return `module.exports = [${requireStatements}]`;
}

// many files have no chance of being picked in blocks.json
function deleteUnnecessaryFiles() {
  DELETABLE_FILES.forEach((unnecessaryFileString) => fs.unlinkSync(`${dirPath}${unnecessaryFileString}`));
}

function deleteUnusedFiles() {
  // take in locale list

  const TIMEZONE_ALLOW_LIST = [
    'index.js', // entry
    'package.json',
    'rfc822.js',
    'locales.js', // requires all locales
    'loaded.js', // loads everything
    'zones.js', // loads all timezones
  ];

  fs.readdirSync(dirPath).forEach((fileName) => {
    if (
      !packageKeepLocaleList.includes(fileName)
        && fs.lstatSync(`${dirPath}${fileName}`).isFile()
        && !TIMEZONE_ALLOW_LIST.includes(fileName)
        && !TIMEZONE_CODES.includes(fileName)
    ) {
      fs.unlinkSync(`${dirPath}${fileName}`);
    }
  });
}

// incoming ['Pacific/Auckland',]

function loopAndSetTimezoneContinents(incomeTargetTimezones) {
  const incomingTimezonesObject = incomeTargetTimezones.reduce((outputObject, currentItem) => {
    const [topLevelTimezone, nestedTimezone] = currentItem.split('/');
    const newOutputObject = outputObject;
    newOutputObject[topLevelTimezone] = [...(outputObject[topLevelTimezone] || []), nestedTimezone];

    return newOutputObject;
  }, {});

  const incomingTimezonesArray = Object.keys(incomingTimezonesObject);

  incomingTimezonesArray.forEach((topLevelTimezoneFolder) => {
    const targetNestedTimezones = incomingTimezonesObject[topLevelTimezoneFolder];
    fs.readdirSync(`${dirPath}${topLevelTimezoneFolder}`).forEach((nestedFile) => {
      const fileNameWithoutExtension = nestedFile.split('.')[0];
      // want to keep index files
      const targetFilePath = `${dirPath}${topLevelTimezoneFolder}/${nestedFile}`;

      if (!targetNestedTimezones.includes(fileNameWithoutExtension) && fileNameWithoutExtension !== 'index') {
        if (fs.lstatSync(targetFilePath).isFile()) {
          fs.unlinkSync(targetFilePath);
        } else {
          // else
          // could be nested america's obj like kentucky or argentina
          // via https://attacomsian.com/blog/nodejs-delete-directory
          // need node 12 for https://stackoverflow.com/questions/65931745/node-fs-rmdir-typeerror-callback-must-be-a-function
          fs.rmdir(targetFilePath, { recursive: true }, (err) => {
            if (err) {
              throw err;
            }
          });
        }
      }

      if (fileNameWithoutExtension === 'index') {
        fs.writeFileSync(targetFilePath, outputExportsString(targetNestedTimezones, '.js'));
      }
    });
  });
  const allRequireStatementsArray = [...TIMEZONE_CODES, ...incomingTimezonesArray];
  return outputExportsString(allRequireStatementsArray);
}

function updateEntryFileRequiredFiles() {
  // only add back the the locales used

  const startingLocaleString = outputExportsString(packageKeepLocaleList);
  const startingOutputString = loopAndSetTimezoneContinents(targetTimeZones);
  fs.writeFileSync('node_modules/timezone/zones.js', startingOutputString);
  fs.writeFileSync('node_modules/timezone/locales.js', startingLocaleString);
}

// delete files that are never used
deleteUnnecessaryFiles();

// delete files that may be needed
deleteUnusedFiles();

updateEntryFileRequiredFiles();