/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const path = require("path");

module.exports = {
	process(_, filename) {
		return `module.exports = ${JSON.stringify(path.basename(filename))};`;
	},
};
