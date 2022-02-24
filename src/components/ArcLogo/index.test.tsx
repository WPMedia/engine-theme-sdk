import React from "react";
import { shallow } from "enzyme";
import ArcLogo from ".";

describe("the ArcLogo component", () => {
	it("should render an SVG", () => {
		const wrapper = shallow(<ArcLogo />);
		expect(wrapper.name()).toEqual("svg");
	});

	describe("the title prop", () => {
		it("should set the title of the svg element", () => {
			const wrapper = shallow(<ArcLogo title="an icon!" />);
			expect(wrapper.find("title").text()).toEqual("an icon!");
		});

		it("should default to an empty string", () => {
			const wrapper = shallow(<ArcLogo />);
			expect(wrapper.find("title").text()).toEqual("Arc Publishing logo");
		});
	});

	describe("the description prop", () => {
		it("should set the description of the svg element", () => {
			const wrapper = shallow(<ArcLogo description="this is an icon!" />);
			expect(wrapper.find("desc").text()).toEqual("this is an icon!");
		});

		it("should default to an empty string", () => {
			const wrapper = shallow(<ArcLogo />);
			expect(wrapper.find("desc").text()).toEqual("");
		});
	});
});
