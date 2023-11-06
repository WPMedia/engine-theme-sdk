import React from "react";
import additionalSVGProps from "./Helpers";

type IconProps = import("./types").default;

const TwitterIcon: React.FC<IconProps> = ({
	width = 24,
	height = 24,
	fill = "#000",
	title = "Twitter logo",
	description = "",
	context = "presentational",
}) => (
	<svg
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
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
			d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
		/>
	</svg>
);

export default TwitterIcon;
