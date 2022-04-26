import React from "react";
import PropTypes from "prop-types";

interface LogoProps {
	title?: string;
	description?: string;
}

const ArcLogo: React.FC<LogoProps> = ({ title = "Arc Publishing logo", description = "" }) => (
	<svg
		width="40px"
		height="40px"
		viewBox="0 0 40 40"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
	>
		<title>{title}</title>
		<desc>{description}</desc>
		<defs>
			<polygon
				id="path-1"
				points="0 0.0624261168 39.9378864 0.0624261168 39.9378864 39.9312715 0 39.9312715"
			/>
		</defs>
		<g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			<g id="page-structure/navbar" transform="translate(-10.000000, -10.000000)">
				<g id="Stacked-Group">
					<g id="glyph+app-name">
						<g id="glyph">
							<rect id="container" x="0" y="0" width="60" height="60" />
							<g id="vector" transform="translate(10.000000, 10.000000)">
								<g id="Group-3" transform="translate(0.000000, 0.006323)">
									<mask id="mask-2" fill="white">
										<use xlinkHref="#path-1" />
									</mask>
									<g id="Clip-2" />
									<path
										d="M19.969074,1.15307904 C9.56033046,1.15307904 1.09251635,9.60606873 1.09251635,19.9966529 C1.09251635,30.3870997 9.56033046,38.8409141 19.969074,38.8409141 C30.3774733,38.8409141 38.8453563,30.3870997 38.8453563,19.9966529 C38.8453563,9.60606873 30.3774733,1.15307904 19.969074,1.15307904 M19.969074,39.9312921 C8.95798967,39.9312921 -1.37693632e-05,30.9888179 -1.37693632e-05,19.9966529 C-1.37693632e-05,9.00483162 8.95798967,0.0624261168 19.969074,0.0624261168 C30.9797453,0.0624261168 39.9378864,9.00483162 39.9378864,19.9966529 C39.9378864,30.9888179 30.9797453,39.9312921 19.969074,39.9312921"
										id="Fill-1"
										fill="#FEFEFE"
										mask="url(#mask-2)"
									/>
								</g>
								<polygon
									id="Fill-4"
									fill="#6BC1AE"
									points="19.034668 21.8562012 15.8003718 11.5311753 7.46274699 28.4751615 15.8003718 28.4751615"
								/>
								<polygon
									id="Fill-6"
									fill="#FEFEFE"
									points="15.8003442 11.5311684 24.1385886 11.5311684 32.4760757 28.4751546 24.1385886 28.4751546"
								/>
							</g>
						</g>
					</g>
				</g>
			</g>
		</g>
	</svg>
);

ArcLogo.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
};

export default ArcLogo;
