import localizeDateHelper from "./localizeDateHelper";
import isValidDateFormatString from "./isValidDateFormatString";

const DATE_TIME_FORMAT_FALLBACK = "%B %d, %Y at %l:%M %P %Z";

const localizeDateTime = (
	date,
	dateFormat = DATE_TIME_FORMAT_FALLBACK,
	language = "en",
	timeZone = "America/New_York"
): string => {
	if (!date) return "";

	let validDateFormat = dateFormat;

	if (!isValidDateFormatString(dateFormat)) {
		validDateFormat = DATE_TIME_FORMAT_FALLBACK;
	}

	return localizeDateHelper(
		date,
		// default includes time (see dateTimeFormat property)
		validDateFormat,
		language,
		timeZone
	);
};

export default localizeDateTime;
