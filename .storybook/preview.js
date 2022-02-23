import { addDecorator, addParameters } from "@storybook/react";
import "@storybook/addon-console";

const parameters = {
	backgrounds: {
		default: "white",
		values: [
			{ name: "white", value: "white" },
			{ name: "black", value: "black" },
			{ name: "grey", value: "grey" },
		],
	},
};

addParameters(parameters);
