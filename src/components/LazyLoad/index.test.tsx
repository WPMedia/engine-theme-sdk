/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from "react";
import { mount } from "enzyme";
import LazyLoad from "./index";

const TestComponent = (): ReactElement => <div id="test-component">TEST</div>;

describe("LazyLoad Block", () => {
	it("renders only child components when no props provided", () => {
		const wrapper = mount(
			<LazyLoad>
				<TestComponent />
			</LazyLoad>
		);
		expect(wrapper).toBeDefined();
		expect(wrapper.prop("enabled")).not.toBeDefined();
		expect(wrapper.find("LazyLoad")).toHaveLength(1);
		const testEl = wrapper.find("div#test-component");
		expect(testEl).toHaveLength(1);
		expect(testEl.text()).toEqual("TEST");
	});

	it("renders only child components when disabled", () => {
		const wrapper = mount(
			<LazyLoad enabled={false}>
				<TestComponent />
			</LazyLoad>
		);
		expect(wrapper).toBeDefined();
		expect(wrapper.prop("enabled")).toBe(false);
		expect(wrapper.find("LazyLoad > TestComponent")).toHaveLength(1);
		const testEl = wrapper.find("div#test-component");
		expect(testEl).toHaveLength(1);
		expect(testEl.text()).toEqual("TEST");
	});

	it("renders child components when enabled with default config", () => {
		const wrapper = mount(
			<LazyLoad enabled>
				<TestComponent />
			</LazyLoad>
		);
		expect(wrapper).toBeDefined();
		expect(wrapper.prop("enabled")).toBe(true);
		const lazyChildInstance = wrapper.find("LazyLoad > *:not(TestComponent)");
		expect(lazyChildInstance).toHaveLength(1);
		expect(lazyChildInstance.prop("offsetTop")).toEqual(300);
		expect(lazyChildInstance.prop("offsetBottom")).toEqual(300);
		expect(lazyChildInstance.prop("offsetLeft")).toEqual(0);
		expect(lazyChildInstance.prop("offsetRight")).toEqual(0);
		expect(lazyChildInstance.prop("throttle")).toEqual(100);
		expect(typeof lazyChildInstance.prop("renderPlaceholder")).toEqual("function");
	});

	it("renders child components when enabled with custom config", () => {
		const config = {
			offsetTop: 400,
			offsetBottom: 200,
			offsetLeft: 20,
			offsetRight: 30,
			throttle: 50,
			renderPlaceholder: (ref: React.Ref<any>): ReactElement => <div ref={ref} />,
		};
		const wrapper = mount(
			<LazyLoad enabled {...config}>
				<TestComponent />
			</LazyLoad>
		);
		expect(wrapper).toBeDefined();
		expect(wrapper.prop("enabled")).toBe(true);
		const lazyChildInstance = wrapper.find("LazyLoad > *:not(TestComponent)");
		expect(lazyChildInstance).toHaveLength(1);
		expect(lazyChildInstance.prop("offsetTop")).toEqual(config.offsetTop);
		expect(lazyChildInstance.prop("offsetBottom")).toEqual(config.offsetBottom);
		expect(lazyChildInstance.prop("offsetLeft")).toEqual(config.offsetLeft);
		expect(lazyChildInstance.prop("offsetRight")).toEqual(config.offsetRight);
		expect(lazyChildInstance.prop("throttle")).toEqual(config.throttle);
		expect(lazyChildInstance.prop("renderPlaceholder")).toEqual(config.renderPlaceholder);
	});
});
