import React from "react";
import { shallow } from "enzyme";
import SourceHandler from "./SourceHandler";

describe("image source handler component", () => {
	const imageSource = "www.hey.com/ffdfdf";
	const resizerURL = "www.hey.resizer.com/";
	it("returns well-formed source tag if correct dimension image passed in", () => {
		const wrapper = shallow(
			<SourceHandler
				width={100}
				height={100}
				resizedImageOptions={{ "100x100": "correct-image.jpg" }}
				imageSourceWithoutProtocol={imageSource}
				breakpointWidth={200}
				resizerURL={resizerURL}
			/>
		);
		expect(wrapper.find("source").prop("media")).toBe("screen and (min-width: 200px)");

		expect(wrapper.html()).toBe(
			'<source srcSet="www.hey.resizer.com/correct-image.jpg=/100x100/www.hey.com/ffdfdf" media="screen and (min-width: 200px)"/>'
		);
	});
	it("returns a null render if no matching dimension found", () => {
		const wrapper = shallow(
			<SourceHandler
				width={100}
				height={100}
				// mismatched width and height
				resizedImageOptions={{ "200x100": "correct-image.jpg" }}
				imageSourceWithoutProtocol={imageSource}
				breakpointWidth={200}
				resizerURL={resizerURL}
			/>
		);

		expect(wrapper.html()).not.toBe(
			'<source srcset="www.hey.resizer.com/correct-image.jpg=/100x100/www.hey.com/ffdfdf" media="screen and (min-width: 200px)">'
		);
		expect(wrapper.html()).toBe(null);
		expect(wrapper.text()).toBe("");
		// wanted to use empty render here but not supported in this version of jest, nor on shallow
	});
});
