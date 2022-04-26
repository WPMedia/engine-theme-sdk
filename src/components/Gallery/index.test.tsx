/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import Gallery from ".";
import EventEmitter from "../EventEmitter";
import Lightbox from "../Lightbox";

jest.mock("fusion:context", () => ({
	useAppContext: jest.fn(() => ({})),
}));

jest.mock("fusion:themes", () => (): object => ({
	"primary-font-color": "white",
}));

const mockGallery = [
	// permutation with everything
	{
		_id: "aaa111",
		url: "http://www.aaa.aaa/aaa.jpg",
		alt_text: "aaa alt aaa",
		subtitle: "aaa sub aaa",
		caption: "aaa caption aaa",
		breakpoints: {
			small: 0,
			medium: 0,
			large: 0,
		},
		resized_params: { "800x0": "" },
		credits: {
			by: [
				{
					name: "aaa by name aaa",
				},
			],
			affiliation: [
				{
					name: "aaa aff name aaa",
				},
			],
		},
	},
	// permutation with no subtitle
	{
		_id: "bbb222",
		url: "http://www.bbb.bbb/bbb.jpg",
		alt_text: "bbb alt bbb",
		caption: "bbb caption bbb",
		breakpoints: {
			small: 0,
			medium: 0,
			large: 0,
		},
		resized_params: { "800x0": "" },
		credits: {
			by: [
				{
					name: "bbb by name bbb",
				},
			],
			affiliation: [
				{
					name: "bbb aff name bbb",
				},
			],
		},
	},
	// permutation with no caption
	{
		_id: "ccc333",
		url: "http://www.ccc.ccc/ccc.jpg",
		alt_text: "ccc alt ccc",
		subtitle: "ccc sub ccc",
		breakpoints: {
			small: 0,
			medium: 0,
			large: 0,
		},
		resizerURL: "",
		resized_params: { "800x0": "" },
		credits: {
			by: [
				{
					name: "ccc by name ccc",
				},
			],
			affiliation: [
				{
					name: "ccc aff name ccc",
				},
			],
		},
	},
	// permutation with no byline
	{
		_id: "ddd444",
		url: "http://www.ddd.ddd/ddd.jpg",
		alt_text: "ddd alt ddd",
		subtitle: "ddd sub ddd",
		caption: "ddd caption ddd",
		breakpoints: {
			small: 0,
			medium: 0,
			large: 0,
		},
		resizerURL: "",
		resized_params: { "800x0": "" },
		credits: {
			affiliation: [
				{
					name: "ddd aff name ddd",
				},
			],
		},
	},
	// permutation with no affiliation
	{
		_id: "eee555",
		url: "http://www.eee.eee/eee.jpg",
		alt_text: "eee alt eee",
		subtitle: "eee sub eee",
		caption: "eee caption eee",
		breakpoints: {
			small: 0,
			medium: 0,
			large: 0,
		},
		resizerURL: "",
		resized_params: { "800x0": "" },
		credits: {
			by: [
				{
					name: "eee by name eee",
				},
			],
		},
	},
	// permutation with no byline or affiliation
	{
		_id: "fff666",
		url: "http://www.fff.fff/fff.jpg",
		alt_text: "fff alt fff",
		subtitle: "fff sub fff",
		caption: "fff caption fff",
		breakpoints: {
			small: 0,
			medium: 0,
			large: 0,
		},
		resizerURL: "",
		resized_params: { "800x0": "" },
	},
];

function sleep(ms: number): Promise<void> {
	return new Promise((resolve: Function) => setTimeout(resolve, ms));
}

function createClientXY(x: number, y: number, target: EventTarget): Touch {
	return {
		clientX: x,
		clientY: y,
		identifier: 0,
		target,
		screenX: 0,
		screenY: 0,
		pageX: 0,
		pageY: 0,
		radiusX: 0,
		radiusY: 0,
		rotationAngle: 0,
		force: 0,
		touchType: "direct",
		altitudeAngle: 0,
		azimuthAngle: 0,
	};
}

function createTouchEvent({ x = 0, y = 0 }, target: EventTarget): TouchEventInit {
	return { touches: [createClientXY(x, y, target)] };
}

declare interface GalleryEventData {
	[s: string]: string;
}

describe("the gallery block", () => {
	beforeEach(() => {
		document.body.innerHTML = '<div id="fusion-app"></div>';
	});
	describe("the fullscreen button", () => {
		it('should be present with the "FullScreen" svg component with the correct fill', () => {
			const wrapper = shallow(<Gallery galleryElements={mockGallery} resizerURL="" />);
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(0)
					.childAt(0)
					.name()
			).toBe("FullscreenIcon");
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(0)
					.childAt(0)
					.prop("fill")
			).toBe("#6B6B6B");
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(0)
					.childAt(1)
					.name()
			).toBe("styled__PlaybackText");
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(0)
					.childAt(1)
					.text()
			).toBe("Expand");
		});

		it("must emit events when enter/exit full screen mode", async () => {
			const wrapper = mount(
				<Gallery galleryElements={mockGallery} resizerURL="" ansId="fullScreen" />
			);
			const fullScreenBtnWrapper = wrapper.find("styled__ControlContainer").find("button").at(0);
			const ran: string[] = [];
			const eventHandler = (event: GalleryEventData, tst: string): void => {
				if (event.ansGalleryId !== "fullScreen") {
					return;
				}
				ran.push(tst);
			};

			EventEmitter.subscribe("galleryExpandEnter", (event: GalleryEventData) =>
				eventHandler(event, "start")
			);
			EventEmitter.subscribe("galleryExpandExit", (event: GalleryEventData) =>
				eventHandler(event, "stop")
			);
			fullScreenBtnWrapper.simulate("click");
			await sleep(500);
			const lightboxButton = wrapper.find(Lightbox).find("button").at(2);
			await act(async () => {
				lightboxButton.simulate("click");
				await sleep(500);
				expect(ran[0]).toEqual("start");
				expect(ran[1]).toEqual("stop");
			});
		});
	});

	describe("the autoplay button", () => {
		it('should be present with the "PlayButton" svg component with the correct fill', () => {
			const wrapper = shallow(<Gallery galleryElements={mockGallery} resizerURL="" />);
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(1)
					.childAt(0)
					.name()
			).toBe("PlayIcon");
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(1)
					.childAt(0)
					.prop("fill")
			).toBe("#6B6B6B");
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(1)
					.childAt(1)
					.name()
			).toBe("styled__PlaybackText");
			expect(
				wrapper
					.find("styled__ControlContainer")
					.find("styled__ControlsButton")
					.at(1)
					.childAt(1)
					.text()
			).toBe("Autoplay");
		});

		it("should accurately reflect the current state during autoplay", () => {
			const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" ansId="abc" />);

			expect(wrapper.find("#gallery-images-abc").at(0).prop("aria-live")).toBe("polite");
			const autoButtonWrapper = wrapper.find("styled__ControlContainer").find("button").at(1);
			expect(autoButtonWrapper.childAt(1).text()).toBe("Autoplay");
			autoButtonWrapper.simulate("click");
			expect(wrapper.find("#gallery-images-abc").at(0).prop("aria-live")).toBe("off");
			expect(autoButtonWrapper.childAt(1).text()).toMatch(/Pause\sautoplay/);
			autoButtonWrapper.simulate("click");
			expect(autoButtonWrapper.childAt(1).text()).toMatch(/Autoplay/);
		});
	});

	describe("During Autoplay", () => {
		it("clicking the fullscreen button should cancel autoplay", () => {
			const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />);
			const fullScreenBtnWrapper = wrapper.find("styled__ControlContainer").find("button").at(0);
			const autoBtnWrapper = wrapper.find("styled__ControlContainer").find("button").at(1);
			expect(autoBtnWrapper.childAt(1).text()).toBe("Autoplay");
			autoBtnWrapper.simulate("click");
			expect(autoBtnWrapper.childAt(1).text()).toMatch(/Pause\sautoplay/);
			fullScreenBtnWrapper.simulate("click");
			expect(autoBtnWrapper.childAt(1).text()).toBe("Autoplay");
		});
	});

	describe("Autoplay events", () => {
		it("must generate events at start and stop", () => {
			const ansId = "9876";
			const ansHeadline = "The Gallery";
			const wrapper = mount(
				<Gallery
					galleryElements={mockGallery}
					resizerURL=""
					ansId={ansId}
					ansHeadline={ansHeadline}
				/>
			);
			const autoBtnWrapper = wrapper.find("styled__ControlContainer").find("button").at(1);
			const ran: number[] = [];
			const eventHandler = (event: GalleryEventData, tst: number): void => {
				if (event.ansGalleryId !== ansId) {
					return;
				}
				expect(event.ansGalleryId).toEqual(ansId);
				expect(event.ansGalleryHeadline).toEqual(ansHeadline);
				expect(event.totalImages).toEqual(mockGallery.length);
				expect(event.caption).toEqual(mockGallery[0].caption);
				expect(event.orderPosition).toEqual(0);
				ran.push(tst);
			};

			EventEmitter.subscribe("galleryAutoplayStart", (event: GalleryEventData) =>
				eventHandler(event, 1)
			);
			EventEmitter.subscribe("galleryAutoplayStop", (event: GalleryEventData) =>
				eventHandler(event, 2)
			);
			autoBtnWrapper.simulate("click");
			autoBtnWrapper.simulate("click");
			EventEmitter.subscribe("galleryAutoplayStart", () => {});
			EventEmitter.subscribe("galleryAutoplayStop", () => {});
			expect(ran.length).toBe(2);
		});

		it("must stop and the end of the gallery and generate the events", () => {
			const wrapper = mount(
				<Gallery galleryElements={mockGallery} resizerURL="" ansId="cybertruck" />
			);
			const autoBtnWrapper = wrapper.find("styled__ControlContainer").find("button").at(1);
			const ran: number[] = [];

			const eventHandler = (event: GalleryEventData, tst: number): void => {
				if (event.ansGalleryId !== "cybertruck") {
					return;
				}
				ran.push(tst);
			};

			EventEmitter.subscribe("galleryAutoplayStart", (event: GalleryEventData) =>
				eventHandler(event, 1)
			);
			EventEmitter.subscribe("galleryAutoplayStop", (event: GalleryEventData) =>
				eventHandler(event, 2)
			);
			autoBtnWrapper.simulate("click");
			sleep(5000).then(() => {
				expect(ran.length).toBe(2);
			});
		});
	});

	describe("the page/image counter and nearby buttons", () => {
		it("should accurately reflect the current page and any updates", () => {
			const controlsWrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />)
				.find("styled__ControlContainer")
				.at(1);
			const nextButtonWrapper = controlsWrapper.find("styled__ControlsButton").at(1);
			const prevButtonWrapper = controlsWrapper.find("styled__ControlsButton").at(0);
			expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
			nextButtonWrapper.simulate("click");
			expect(controlsWrapper.text()).toMatch(/2\sof\s6/);
			prevButtonWrapper.simulate("click");
			expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
		});
	});

	describe("the page/image counter and overlaid buttons", () => {
		it("should accurately reflect the current page and any updates", () => {
			const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />);
			const controlsWrapper = wrapper.find("styled__ImageCountText");
			const nextButtonWrapper = wrapper.find("button.next-button").at(0);
			const prevButtonWrapper = wrapper.find("button.prev-button").at(0);
			expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
			nextButtonWrapper.simulate("click");
			expect(controlsWrapper.text()).toMatch(/2\sof\s6/);
			prevButtonWrapper.simulate("click");
			expect(controlsWrapper.text()).toMatch(/1\sof\s6/);
		});
	});

	describe("the overlaid previous image button", () => {
		it('should be present with the "ChevronLeft" svg component with the correct fill', () => {
			const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />);
			expect(wrapper.find("button.prev-button").at(0).childAt(0).name()).toBe("ChevronLeftIcon");
			expect(wrapper.find("button.prev-button").at(0).childAt(0).prop("fill")).toBe("white");
		});
	});

	describe("the overlaid next image button", () => {
		it('should be present with the "ChevronRight" svg component with the correct fill', () => {
			const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />);
			expect(wrapper.find("button.next-button").at(0).childAt(0).name()).toBe("ChevronRightIcon");
			expect(wrapper.find("button.next-button").at(0).childAt(0).prop("fill")).toBe("white");
		});
	});

	describe("the image carousel", () => {
		let outerNode;

		beforeEach(() => {
			outerNode = document.createElement("div");
			document.body.appendChild(outerNode);
		});

		afterEach(() => {
			document.body.removeChild(outerNode);
		});

		it("should have aria label and roledescription on container", () => {
			const ansHeadlineText = "Headline Text";
			const wrapper = shallow(
				<Gallery galleryElements={mockGallery} resizerURL="" ansHeadline={ansHeadlineText} />
			);

			expect(wrapper.at(0).prop("aria-label")).toBe(ansHeadlineText);
			expect(wrapper.at(0).prop("aria-roledescription")).toBe("carousel");
		});

		it("should render all the images with the correct inital x offset", () => {
			const wrapper = shallow(<Gallery galleryElements={mockGallery} resizerURL="" />);
			const imagesWrapper = wrapper.find(".image-wrapper");
			expect(
				imagesWrapper.everyWhere((wrap) => wrap.prop("style").transform === "translate(0%, 0)")
			).toBe(true);
			expect(
				imagesWrapper.everyWhere((wrap) => wrap.prop("style").transitionDuration === "1s")
			).toBe(true);
		});

		describe("when the user swipes left", () => {
			it("should update the page counter", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 10, y: 30 }, carouselNode))
						);
				});
				expect(wrapper.find("styled__ImageCountText").text()).toMatch("2 of 6");
			});

			it("should set the correct x offsets during the swipe", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
				});
				wrapper.update();
				expect(
					wrapper
						.find(".image-wrapper")
						.everyWhere((wrap) => wrap.prop("style").transform === "translate(calc(0% - 50px), 0)")
				).toBe(true);
				expect(
					wrapper
						.find(".image-wrapper")
						.everyWhere((wrap) => wrap.prop("style").transitionDuration === "0s")
				).toBe(true);
			});

			it("should set the x offsets to the correct values after the swipe", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 10, y: 30 }, carouselNode))
						);
				});
				wrapper.update();
				expect(
					wrapper
						.find(".image-wrapper")
						.everyWhere((wrap) => wrap.prop("style").transform === "translate(-100%, 0)")
				).toBe(true);
				expect(
					wrapper
						.find(".image-wrapper")
						.everyWhere((wrap) => wrap.prop("style").transitionDuration === "1s")
				).toBe(true);
			});
		});

		describe("when the user swipes right", () => {
			it("should update the page counter", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 10, y: 10 }, carouselNode))
						);
				});
				expect(wrapper.find("styled__ImageCountText").text()).toMatch("2 of 6");
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 10, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 100, y: 30 }, carouselNode))
						);
				});
				expect(wrapper.find("styled__ImageCountText").text()).toMatch("1 of 6");
			});

			it("should set the correct x offsets during the swipe", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 10, y: 30 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 10, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
				});
				wrapper.update();
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere(
							(wrap) => wrap.prop("style").transform === "translate(calc(-100% - -40px), 0)"
						)
				).toBe(true);
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transitionDuration === "0s")
				).toBe(true);
			});

			it("should set the x offsets to the correct values after the swipe", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 10, y: 30 }, carouselNode))
						);
				});
				wrapper.update();
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transform === "translate(-100%, 0)")
				).toBe(true);
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transitionDuration === "1s")
				).toBe(true);
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 10, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 100, y: 30 }, carouselNode))
						);
				});
				wrapper.update();
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transform === "translate(0%, 0)")
				).toBe(true);
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transitionDuration === "1s")
				).toBe(true);
			});
		});

		describe("when the user swipes left at the end of the gallery", () => {
			it("should not advance forward", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();

				for (let i = 1; i < 6; i += 1) {
					act(() => {
						carouselWrapper
							.getDOMNode()
							.dispatchEvent(
								new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
							);
						carouselWrapper
							.getDOMNode()
							.dispatchEvent(
								new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
							);
						carouselWrapper
							.getDOMNode()
							.dispatchEvent(
								new TouchEvent("touchend", createTouchEvent({ x: 10, y: 30 }, carouselNode))
							);
					});
					wrapper.update();
					expect(
						wrapper
							.find("styled__ImageWrapper")
							.everyWhere((wrap) => wrap.prop("style").transform === `translate(${i * -100}%, 0)`)
					).toBe(true);
					expect(
						wrapper
							.find("styled__ImageWrapper")
							.everyWhere((wrap) => wrap.prop("style").transitionDuration === "1s")
					).toBe(true);
					expect(wrapper.find("styled__ImageCountText").text()).toMatch(`${i + 1} of 6`);
				}

				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 100, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 10, y: 30 }, carouselNode))
						);
				});
				wrapper.update();
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transform === "translate(-500%, 0)")
				).toBe(true);
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transitionDuration === "1s")
				).toBe(true);
				expect(wrapper.find("styled__ImageCountText").text()).toMatch("6 of 6");
			});
		});

		describe("when the user swipes right at the beginning of the gallery", () => {
			it("should not advance backward", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />, {
					attachTo: outerNode,
				});
				const carouselWrapper = wrapper.find("styled__CarouselContainer").first();
				const carouselNode = carouselWrapper.getDOMNode();
				act(() => {
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchstart", createTouchEvent({ x: 10, y: 10 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchmove", createTouchEvent({ x: 50, y: 20 }, carouselNode))
						);
					carouselWrapper
						.getDOMNode()
						.dispatchEvent(
							new TouchEvent("touchend", createTouchEvent({ x: 100, y: 30 }, carouselNode))
						);
				});
				wrapper.update();
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transform === "translate(0%, 0)")
				).toBe(true);
				expect(
					wrapper
						.find("styled__ImageWrapper")
						.everyWhere((wrap) => wrap.prop("style").transitionDuration === "1s")
				).toBe(true);
				expect(wrapper.find("styled__ImageCountText").text()).toMatch("1 of 6");
			});
		});
	});

	describe("the Image child components", () => {
		it("should pass the image _id to the wrapper element", () => {
			const wrapper = shallow(<Gallery galleryElements={mockGallery} resizerURL="" />);
			wrapper.find("styled__ImageWrapper").forEach((imageWrapper, index) => {
				expect(imageWrapper.prop("data-image-id")).toBe(mockGallery[index]._id);
			});
		});

		it("should pass the correct dimensions", () => {
			const wrapper = shallow(<Gallery galleryElements={mockGallery} resizerURL="" />);
			wrapper.find("styled__ImageWrapper").forEach((imageWrapper) => {
				expect(imageWrapper.find("Image").first().prop("smallWidth")).toBe(400);
				expect(imageWrapper.find("Image").first().prop("smallHeight")).toBe(0);
				expect(imageWrapper.find("Image").first().prop("mediumWidth")).toBe(600);
				expect(imageWrapper.find("Image").first().prop("mediumHeight")).toBe(0);
				expect(imageWrapper.find("Image").first().prop("largeWidth")).toBe(800);
				expect(imageWrapper.find("Image").first().prop("largeHeight")).toBe(0);
			});
		});

		it("should pass the correct url", () => {
			const wrapper = shallow(<Gallery galleryElements={mockGallery} resizerURL="" />);
			wrapper.find("styled__ImageWrapper").forEach((imageWrapper, index) => {
				expect(imageWrapper.find("Image").first().prop("url")).toStrictEqual(
					mockGallery[index].url
				);
			});
		});

		it("should pass the correct alt text", () => {
			const wrapper = shallow(<Gallery galleryElements={mockGallery} resizerURL="" />);
			wrapper.find("styled__ImageWrapper").forEach((imageWrapper, index) => {
				expect(imageWrapper.find("Image").first().prop("alt")).toStrictEqual(
					mockGallery[index].alt_text
				);
			});
		});
	});

	describe("the ImageMetadata child component", () => {
		it("should pass the current image meta values to the child component", () => {
			const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />);
			expect(wrapper.find("ImageMetadata").first().props()).toStrictEqual({
				subtitle: "aaa sub aaa",
				caption: "aaa caption aaa",
				credits: {
					by: [
						{
							name: "aaa by name aaa",
						},
					],
					affiliation: [
						{
							name: "aaa aff name aaa",
						},
					],
				},
			});
			wrapper.find("button.next-button").at(0).simulate("click");
		});

		it("should update with the current image when the page changes", () => {
			const wrapper = mount(<Gallery galleryElements={mockGallery} resizerURL="" />);
			wrapper.find("button.next-button").at(0).simulate("click");
			expect(wrapper.find("ImageMetadata").first().props()).toStrictEqual({
				subtitle: undefined,
				caption: "bbb caption bbb",
				credits: {
					by: [
						{
							name: "bbb by name bbb",
						},
					],
					affiliation: [
						{
							name: "bbb aff name bbb",
						},
					],
				},
			});
		});
	});

	describe('the "expandPhrase" prop', () => {
		describe("when the prop is provided", () => {
			it("should set the phrase text to the passed in string", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} expandPhrase="Förstora" />);
				expect(
					wrapper.find("styled__ControlsButton").at(0).find("styled__PlaybackText").text()
				).toEqual("Förstora");
			});
		});

		describe("when the prop is NOT provided", () => {
			it("should set the phrase text to the default string", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} />);
				expect(
					wrapper.find("styled__ControlsButton").at(0).find("styled__PlaybackText").text()
				).toEqual("Expand");
			});
		});
	});

	describe('the "autoplayPhrase" prop', () => {
		describe("when the prop is provided", () => {
			it("should set the phrase text to the passed in string", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} autoplayPhrase="Spela upp" />);
				expect(
					wrapper.find("styled__ControlsButton").at(1).find("styled__PlaybackText").text()
				).toEqual("Spela upp");
			});
		});

		describe("when the prop is NOT provided", () => {
			it("should set the phrase text to the default string", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} />);
				expect(
					wrapper.find("styled__ControlsButton").at(1).find("styled__PlaybackText").text()
				).toEqual("Autoplay");
			});
		});
	});

	describe('the "pausePhrase" prop', () => {
		describe("when the prop is provided", () => {
			it("should set the phrase text to the passed in string", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} pausePhrase="Pausa" />);
				const autoButtonWrapper = wrapper.find("styled__ControlContainer").find("button").at(1);
				autoButtonWrapper.simulate("click");
				expect(
					wrapper.find("styled__ControlsButton").at(1).find("styled__PlaybackText").text()
				).toEqual("Pausa");
			});
		});

		describe("when the prop is NOT provided", () => {
			it("should set the phrase text to the default string", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} />);
				const autoButtonWrapper = wrapper.find("styled__ControlContainer").find("button").at(1);
				autoButtonWrapper.simulate("click");
				expect(
					wrapper.find("styled__ControlsButton").at(1).find("styled__PlaybackText").text()
				).toEqual("Pause autoplay");
			});
		});
	});

	describe('the "pageCountPhrase" prop', () => {
		describe("when the prop is provided", () => {
			it("should use the function to set the gallery page counter", () => {
				const wrapper = mount(
					<Gallery
						galleryElements={mockGallery}
						pageCountPhrase={(current, total): string => `${current} av ${total}`}
					/>
				);
				expect(wrapper.find("styled__ImageCountText").text()).toMatch("1 av 6");
			});
		});

		describe("when the prop is NOT provided", () => {
			it("should use the default template string to set the gallery page counter", () => {
				const wrapper = mount(<Gallery galleryElements={mockGallery} />);
				expect(wrapper.find("styled__ImageCountText").text()).toMatch("1 of 6");
			});
		});
	});

	describe("the interstitialClicks prop", () => {
		const AdBlock = (): React.ReactElement => (
			<div className="ad-block">
				<p>AdBlock</p>
			</div>
		);

		it("should render an Ad at 2nd position when interstitialClick match", async () => {
			const wrapper = mount(
				<Gallery galleryElements={mockGallery} interstitialClicks={2} adElement={AdBlock} />
			);
			expect(wrapper.find(".ad-block").length).toBe(0);
			const fowardButton = wrapper.find("button.next-button").at(0);
			act(() => {
				fowardButton.simulate("click");
			});
			act(() => {
				fowardButton.simulate("click");
			});
			wrapper.setProps({});
			await sleep(1000);
			expect(wrapper.find("#gallery-pos-2 .ad-block").length).toBe(1);
		});

		it("should render an Ad at 1st position when interstitialClick match on any direction", async () => {
			const wrapper = mount(
				<Gallery galleryElements={mockGallery} interstitialClicks={3} adElement={AdBlock} />
			);
			expect(wrapper.find(".ad-block").length).toBe(0);
			const fowardButton = wrapper.find("button.next-button").at(0);
			const backwardButton = wrapper.find("button.prev-button").at(0);
			act(() => {
				fowardButton.simulate("click");
			});
			act(() => {
				fowardButton.simulate("click");
			});
			act(() => {
				backwardButton.simulate("click");
			});
			wrapper.setProps({});
			await sleep(1000);
			expect(wrapper.find("#gallery-pos-1 .ad-block").length).toBe(1);
		});
	});
});
