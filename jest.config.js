module.exports = {
	transform: {
		"^.+\\.[t|j]sx?$": "babel-jest",
	},
	setupFilesAfterEnv: ["./jest/testSetupFile.js", "./node_modules/jest-enzyme/lib/index.js"],
	moduleNameMapper: {
		"^.+\\.(css|less|scss)$": "identity-obj-proxy",
	},
	testPathIgnorePatterns: ["/node_modules/", "<rootDir>/dist"],
	collectCoverageFrom: ["src/**"],
	coverageThreshold: {
		global: {
			statements: 52,
			branches: 68,
			functions: 59,
			lines: 52,
		},
		"src/components/Image": {
			statements: 90,
			branches: 74,
			functions: 100,
			lines: 90,
		},
	},
};
