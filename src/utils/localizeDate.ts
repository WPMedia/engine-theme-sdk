import localizeDateHelper from "./localizeDateHelper";
import isValidDateFormatString from "./isValidDateFormatString";

const DATE_FORMAT_FALLBACK = "%B %d, %Y";

// date comes in Thu Mar 11 2021 17:27:24 GMT-0600 (Central Standard Time)
const localizeDate = (
	date,
	dateFormat = DATE_FORMAT_FALLBACK,
	language = "en",
	timeZone = "America/New_York"
): string => {
	if (!date) return "";

	let validDateFormat = dateFormat;

	if (!isValidDateFormatString(dateFormat)) {
		validDateFormat = DATE_FORMAT_FALLBACK;
	}

	return localizeDateHelper(date, validDateFormat, language, timeZone);
};

export default localizeDate;
