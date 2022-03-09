import React from "react";
import { mount } from "enzyme";
import { render } from "@testing-library/react";
import VideoPlayer, { videoPlayerCustomFields } from ".";

jest.mock("fusion:context", () => ({
	useAppContext: jest.fn(() => ({})),
}));
jest.mock("fusion:themes", () => (): object => ({
	"primary-font-family": "futura",
}));
test("renders id with video tag to match with powa player", () => {
	const targetId = "matching123";
	const videoPlayer = render(<VideoPlayer embedMarkup="" id={targetId} />);

	// id not usually important in rtl but this is an exception
	const matchingVideoTargetIdDiv = videoPlayer.container.querySelector(`#video-${targetId}`);
	expect(matchingVideoTargetIdDiv.getAttribute("id")).toBe("video-matching123");
});

test("renders uuid with video tag to match with powa player", () => {
	const targetId = "matching123";
	const videoPlayer = render(<VideoPlayer embedMarkup="" uuid={targetId} />);

	// id not usually important in rtl but this is an exception
	const matchingVideoTargetIdDiv = videoPlayer.container.querySelector(`#video-${targetId}`);
	expect(matchingVideoTargetIdDiv.getAttribute("id")).toBe("video-matching123");
});

test("renders embed markup in container", () => {
	const targetId = "";
	const testEmbed =
		'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
		' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
		'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
	const videoPlayer = render(<VideoPlayer embedMarkup={testEmbed} id={targetId} />);

	// match properties not usually important in rtl but this is an exception
	const videoPlayerPowaContainer = videoPlayer.container.querySelector(".powa");
	expect(videoPlayerPowaContainer.outerHTML).toMatchInlineSnapshot(
		'"<div class=\\"powa\\" id=\\"powa-e924\\" data-org=\\"corecomponents\\" data-env=\\"prod\\" data-uuid=\\"e924e51b\\" data-aspect-ratio=\\"0.562\\" data-api=\\"prod\\"><script src=\\"//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents\\"></script></div>"'
	);
});

describe("Styling", () => {
	describe("shrinkToFit flag on Video", () => {
		it("not included, the video should still render with a default true flag passed to the wrapper", () => {
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(<VideoPlayer embedMarkup={testEmbed} id="targetId" />);
			expect(wrapper.find("styled__VideoWrap").prop("shrinkToFit")).toBe(true);
		});

		it("included, the video should still render with a false flag passed to the wrapper", () => {
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(
				<VideoPlayer embedMarkup={testEmbed} id="targetId" shrinkToFit={false} />
			);
			expect(wrapper.find("styled__VideoWrap").prop("shrinkToFit")).toBe(false);
		});
	});
	describe("PageBuilder settings", () => {
		it("should return an object with settings defined", () => {
			const result = videoPlayerCustomFields();
			expect(result).toHaveProperty("shrinkToFit");
			expect(result).toHaveProperty("viewportPercentage");
		});
	});
});

describe("MutationObserver", () => {
	beforeEach(() => {
		global.MutationObserver = class MutationObserver extends global.MutationObserver {
			// eslint-disable-next-line no-useless-constructor, class-methods-use-this
			constructor(callback) {
				super(callback);
			}

			// eslint-disable-next-line max-len
			// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
			disconnect() {}

			// eslint-disable-next-line max-len
			// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
			observe() {}
		};
	});
	describe("video aspect ratio", () => {
		it("should not be calculated given a zero dimension video", () => {
			Element.prototype.getBoundingClientRect = jest.fn(
				(): DOMRect => DOMRectReadOnly.fromRect({ width: 0, height: 0 })
			);
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(<VideoPlayer embedMarkup={testEmbed} id="targetId" />);
			expect(wrapper.find("styled__VideoWrap").prop("aspectRatio")).toBe(0.5625);
		});

		it("should be calculated given a known dimension video", () => {
			Element.prototype.getBoundingClientRect = jest.fn(
				(): DOMRect => DOMRectReadOnly.fromRect({ width: 10, height: 10 })
			);
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(<VideoPlayer embedMarkup={testEmbed} id="targetId" />);
			expect(wrapper.find("styled__VideoWrap").prop("aspectRatio")).toBe(0.5625);
		});
	});
	describe("captions", () => {
		it("takes in caption, title and credits and opts into show them", () => {
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(
				<VideoPlayer
					embedMarkup={testEmbed}
					id="targetId"
					shrinkToFit={false}
					caption="This is a caption"
					credits={{
						affiliation: [
							{
								name: "Death to Stock Photo",
							},
							{
								name: "Another Stock Photo",
							},
						],
						by: [
							{
								name: "John Doe",
							},
							{
								name: "Jane Doe",
							},
						],
					}}
					subtitle="This is a title"
					displayCredits
					displayCaption
					displayTitle
				/>
			);
			// shows caption on the page in text
			expect(wrapper.find("p").text()).toBe(
				"This is a title This is a caption (John Doe, Jane Doe/Death to Stock Photo, Another Stock Photo)"
			);
		});
		it("takes in caption, title and credits and opts into show only title", () => {
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(
				<VideoPlayer
					embedMarkup={testEmbed}
					id="targetId"
					shrinkToFit={false}
					caption="This is a caption"
					credits={{
						affiliation: [
							{
								name: "Death to Stock Photo",
							},
							{
								name: "Another Stock Photo",
							},
						],
						by: [
							{
								name: "John Doe",
							},
							{
								name: "Jane Doe",
							},
						],
					}}
					subtitle="This is a title"
					displayCredits={false}
					displayCaption={false}
					displayTitle
				/>
			);
			expect(wrapper.find("p").text()).toBe("This is a title ");
		});
		it("takes in caption, title and credits and opts into show only caption", () => {
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(
				<VideoPlayer
					embedMarkup={testEmbed}
					id="targetId"
					shrinkToFit={false}
					caption="This is a caption"
					credits={{
						affiliation: [
							{
								name: "Death to Stock Photo",
							},
							{
								name: "Another Stock Photo",
							},
						],
						by: [
							{
								name: "John Doe",
							},
							{
								name: "Jane Doe",
							},
						],
					}}
					subtitle="This is a title"
					displayCredits={false}
					displayCaption
					displayTitle={false}
				/>
			);
			expect(wrapper.find("p").text()).toBe("This is a caption ");
		});
		it("takes in caption, title and credits and opts into show nothing", () => {
			const testEmbed =
				'<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"' +
				' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script ' +
				'src="//xxx.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';
			const wrapper = mount(
				<VideoPlayer
					embedMarkup={testEmbed}
					id="targetId"
					shrinkToFit={false}
					caption="This is a caption"
					credits={{
						affiliation: [
							{
								name: "Death to Stock Photo",
							},
							{
								name: "Another Stock Photo",
							},
						],
						by: [
							{
								name: "John Doe",
							},
							{
								name: "Jane Doe",
							},
						],
					}}
					subtitle="This is a title"
					displayCredits={false}
					displayCaption={false}
					displayTitle={false}
				/>
			);
			expect(wrapper.find("p").length).toBe(0);
		});
	});
});
