import React from "react";
import additionalSVGProps from "./Helpers";

type IconProps = import("./types").default;

const YoutubeAltIcon: React.FC<IconProps> = ({
	width = 24,
	height = 24,
	fill = "#000",
	title = "YouTube",
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
			d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"
		/>
	</svg>
);

export default YoutubeAltIcon;
