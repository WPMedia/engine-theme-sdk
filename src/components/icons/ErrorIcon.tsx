import React from "react";
import additionalSVGProps from "./Helpers";

type IconProps = import("./types").default;

const ErrorIcon: React.FC<IconProps> = ({
	width = "1em",
	height = "1em",
	fill = "currentColor",
	title = "Error",
	description = "",
	context = "presentational",
}) => (
	<svg
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		{...additionalSVGProps(context)}
	>
		{context === "image" ? (
			<>
				<title>{title}</title>
				<desc>{description}</desc>
			</>
		) : null}
		<path
			clipRule="evenodd"
			d="m8 0a8 8 0 010 16a8 8 0 010-16zm0 10a1 1 0 000 2a1 1 0 000-2zm-.667-5.667v4a.667.667 0 101.333 0v-4a.667.667 0 10-1.333 0z"
			fill={fill}
			fillRule="evenodd"
		/>
	</svg>
);

export default ErrorIcon;
