import React from "react";
import additionalSVGProps from "./Helpers";

type IconProps = import("./types").default;

const ChevronUpIcon: React.FC<IconProps> = ({
	width = 24,
	height = 24,
	fill = "#000",
	title = "Chevron Up",
	description = "",
	context = "presentational",
}) => (
	<svg
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 448 512"
		{...additionalSVGProps(context)}
	>
		{context === "image" ? (
			<>
				<title>{title}</title>
				<desc>{description}</desc>
			</>
		) : null}
		<path
			fill={fill}
			d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
		/>
	</svg>
);

export default ChevronUpIcon;
