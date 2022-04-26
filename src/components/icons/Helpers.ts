const SVGAttributes = {
	image: {
		role: "img",
		focusable: false,
	},
	presentational: {
		"aria-hidden": true,
		focusable: false,
	},
};

const additionalSVGProps = (type): {} => SVGAttributes[type] || SVGAttributes.presentational;

export default additionalSVGProps;
