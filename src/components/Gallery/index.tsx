/* eslint-disable @typescript-eslint/camelcase */
/**
 * Gallery
 * --------------
 * Note on Events:
 * The prevHandler, nextHandler and autoplay callbacks use the EventEmitter object
 * to send off events that the next or previous image in the gallery has been accessed.
 *
 * This is the list of events actually reported by Gallery component:
 *  galleryImageNext: when the next button is pressed.
 *  galleryImagePrevious: when the next button is pressed.
 *  galleryExpandEnter: when the expand button is pressed
 *  galleryExpandExit: when the close button on the lightbox is pressed
 *
 * To listen to these events, import the EventEmitter in your code:
 * @example
 * import { EventEmitter } from '@wpmedia/engine-theme-sdk';
 * Then create a callback function such as:
 * @example
 * const galleryImageNext = (event) => {console.log('Here is the event: ', event);}
 * Then use you use your callback in subscribing to the event:
 * @example
 * EventEmitter.subscribe('galleryImageNext', (event) => galleryImageNext(event));
 */

/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";
import Image from "../Image";
import buildThumborURL from "../Image/thumbor-image-url";
import Lightbox from "../Lightbox/index";
import ImageMetadata from "../ImageMetadata";
import useInterval from "./setInterval";
import EventEmitter from "../EventEmitter";

import {
	GalleryDiv,
	ControlContainer,
	ControlsDiv,
	ControlsButton,
	PlaybackText,
	ImageCountText,
	CarouselContainer,
	CarouselButton,
	ImageWrapper,
	AdWrapper,
} from "./styled";
import { ChevronLeftIcon, ChevronRightIcon, FullscreenIcon, PlayIcon, PauseIcon } from "../icons";
import { CreditOptions, CreditData } from "../../../types/shared";

const greyFill = "#6B6B6B";
const PREVIOUS_IMAGE_TEXT = "Switch to the previous image";
const NEXT_IMAGE_TEXT = "Switch to the next image";

enum Direction {
	forward = 0,
	backward = 1,
}

interface GalleryElement extends CreditData {
	_id: string;
	url: string;
	alt_text?: string;
	height?: number;
	resized_params: {
		[key: string]: string;
	};
	breakpoints: {
		small: number;
		medium: number;
		large: number;
	};
	width?: number;
}

interface GalleryProps extends CreditOptions {
	resizerURL?: string;
	ansId?: string;
	ansHeadline?: string;
	galleryElements?: GalleryElement[];
	expandPhrase?: string;
	autoplayPhraseLabels?: {
		start?: string;
		stop?: string;
	};
	autoplayPhrase?: string;
	pausePhrase?: string;
	pageCountPhrase?: (current: number, total: number) => string;
	interstitialClicks?: number;
	adElement?: any;
	previousImagePhrase?: string;
	nextImagePhrase?: string;
	controlsFont?: string;
	eagerLoadFirstImage?: boolean;
}

declare interface EventOptionsInterface {
	[s: string]: boolean | string | number;
}

const Gallery: React.FC<GalleryProps> = ({
	galleryElements,
	resizerURL = "",
	ansId = "",
	ansHeadline = "",
	expandPhrase,
	autoplayPhrase,
	autoplayPhraseLabels = {},
	pausePhrase,
	pageCountPhrase,
	interstitialClicks,
	adElement: AdElement,
	previousImagePhrase = PREVIOUS_IMAGE_TEXT,
	nextImagePhrase = NEXT_IMAGE_TEXT,
	controlsFont = null,
	displayTitle = true,
	displayCaption = true,
	displayCredits = true,
	eagerLoadFirstImage = false,
}) => {
	const galleryRef = useRef(null);
	const carouselRef = useRef(null);
	const [page, setPage] = useState(0);
	const [direction, setDirection] = useState(Direction.forward);
	const [adClicks, setAdClicks] = useState(0);
	const [slide, setSlide] = useState({
		isSliding: false,
		delta: 0,
	});
	const [isOpen, setIsOpen] = useState(false);
	const [autoDuration, setAutoDuration] = useState(null);
	const [adHidding, setAdHidding] = useState(false);
	const [adDone, setAdDone] = useState(false);

	const isAdsEnabled = (): boolean => !!interstitialClicks && !!AdElement;

	const isAdActive = (): boolean => {
		if (!isAdsEnabled() || adClicks === 0) {
			return false;
		}
		if (adDone) {
			return false;
		}
		return adClicks % interstitialClicks === 0;
	};

	const isAdInPage = (index: number): boolean => index === page;

	const emitEvent = (
		eventName: string,
		pg: number,
		ord: number,
		options: EventOptionsInterface = {},
	): void => {
		EventEmitter.dispatch(eventName, {
			eventName,
			ansGalleryId: ansId,
			ansGalleryHeadline: ansHeadline,
			ansImageId: galleryElements[pg]._id,
			caption: galleryElements[pg].caption,
			orderPosition: ord,
			totalImages: galleryElements.length,
			...options,
		});
	};

	const fullScreen = (): void => {
		setAutoDuration(null);
		setIsOpen(true);
		emitEvent("galleryExpandEnter", page, page);
	};

	const exitFullScreen = (): void => {
		setIsOpen(false);
		emitEvent("galleryExpandExit", page, page);
	};

	const prevHandler = (): void => {
		if (page <= 0) {
			if (isAdActive()) {
				setAdDone(true);
			}
			return;
		}
		const pg = page - 1;
		emitEvent("galleryImagePrevious", pg, pg + 1, { autoplay: false });
		setDirection(Direction.backward);
		if (isAdActive() && !isOpen) {
			setAdHidding(true);
		} else {
			setPage(pg);
			setAdClicks(adClicks + 1);
			setAdDone(false);
		}
	};

	const nextHandler = (): void => {
		if (page >= galleryElements.length - 1) {
			if (isAdActive()) {
				setAdDone(true);
			}
			return;
		}
		const pg = page + 1;
		emitEvent("galleryImageNext", pg, pg + 1, { autoplay: false });
		setDirection(Direction.forward);
		if (isAdActive() && !isOpen) {
			setAdHidding(true);
		} else {
			setPage(pg);
			setAdClicks(adClicks + 1);
			setAdDone(false);
		}
	};

	useInterval(() => {
		if (page >= galleryElements.length - 1) {
			setAutoDuration(null);
			emitEvent("galleryAutoplayStop", page, page);
		} else {
			const pg = page + 1;
			emitEvent("galleryImageNext", pg, pg + 1, { autoplay: true });
			setDirection(Direction.forward);
			if (isAdActive() && !isOpen) {
				setAdHidding(true);
			} else {
				setPage(pg);
				setAdClicks(adClicks + 1);
				setAdDone(false);
			}
		}
	}, autoDuration);

	const onPlayHandler = (): void => {
		if (autoDuration) {
			setAutoDuration(null);
			emitEvent("galleryAutoplayStop", page, page);
		} else {
			emitEvent("galleryAutoplayStart", page, page);
			if (page >= galleryElements.length - 1) {
				const pg = 0;
				emitEvent("galleryImagePrevious", pg, pg + 1, { autoplay: true });
				setPage(pg);
			}
			setAutoDuration(4000);
		}
	};

	// see error handling in lightbox for empty string
	// empty string means that the image is invalid
	const lightboxHandler = (pageNo, operation): string => {
		const nodeList = galleryRef.current.querySelectorAll("img");
		if (nodeList && nodeList.length) {
			const array = [...nodeList];
			if (operation === "next") {
				return array[(pageNo + 1) % array.length].dataset.lightbox;
			}
			if (operation === "prev") {
				return array[(pageNo + array.length - 1) % array.length].dataset.lightbox;
			}
			// main operation
			if (array[pageNo] && array[pageNo].dataset) {
				return array[pageNo].dataset.lightbox;
			}
		}

		// querySelectorAll looks like not rendered next image
		// and we getting empty data for lightBox

		// all lightbox images are that size 1600 wide, native whatever height (0)
		const targetLightboxDimensions = `${1600}x${0}`;

		const lightboxHashString = galleryElements[pageNo]?.resized_params[targetLightboxDimensions];

		// should be a non-empty string
		if (lightboxHashString) {
			const galleryElement = galleryElements[pageNo];

			// if invalid image then we wouldn't want to try to resize at all
			const imageSourceWithoutProtocol = galleryElement.url.replace("https://", "");

			// reconstructs valid image url just for target dimensions
			const imageSrc = buildThumborURL(
				lightboxHashString,
				targetLightboxDimensions,
				imageSourceWithoutProtocol,
				resizerURL,
			);
			return imageSrc;
		}

		// will return an empty string if no image found
		// if empty string, then lightbox will show error string
		// shows "Image not found" by default, see Lightbox
		return "";
	};

	const handlers = useSwipeable({
		onSwiped: (event) => {
			setSlide({
				isSliding: false,
				delta: 0,
			});

			if (event.dir === "Left") {
				nextHandler();
			}

			if (event.dir === "Right") {
				prevHandler();
			}
		},
		onSwiping: (event) => {
			setSlide({
				isSliding: true,
				delta: -event.deltaX,
			});
		},
	});

	const renderAd = (): React.ReactElement => {
		let dirFlag = 0;
		if (adHidding) {
			dirFlag = direction === Direction.forward ? -100 : 100;
		}
		return (
			<AdWrapper
				className="gallery-ad-wrapper"
				ref={carouselRef}
				style={{
					transform: slide.isSliding
						? `translate(calc(${dirFlag}% - ${slide.delta}px), 0)`
						: `translate(${dirFlag}%, 0)`,
					transitionDuration: slide.isSliding ? "0s" : "1s",
				}}
			>
				<AdElement />
			</AdWrapper>
		);
	};

	const renderImage = (
		imgContent: GalleryElement,
		index: number,
		showAd: boolean,
		totalImages: number,
	): React.ReactElement => (
		<ImageWrapper
			key={`gallery-image-${imgContent._id}`}
			id={`gallery-pos-${index}`}
			data-image-id={imgContent._id}
			style={{
				transform: slide.isSliding
					? `translate(calc(${-100 * page}% - ${slide.delta}px), 0)`
					: `translate(${-100 * page}%, 0)`,
				transitionDuration: slide.isSliding ? "0s" : "1s",
				visibility: index !== page && !slide.isSliding ? "hidden" : null,
			}}
			aspectRatio={imgContent.width / imgContent.height}
			role="group"
			aria-roledescription="slide"
			aria-label={`${index + 1} of ${totalImages}`}
			aria-hidden={index !== page}
		>
			{showAd ? (
				renderAd()
			) : (
				<Image
					url={imgContent.url}
					alt={imgContent.alt_text}
					smallWidth={400}
					smallHeight={0}
					mediumWidth={600}
					mediumHeight={0}
					largeWidth={800}
					largeHeight={0}
					lightBoxWidth={1600}
					lightBoxHeight={0}
					resizedImageOptions={imgContent.resized_params}
					breakpoints={imgContent.breakpoints || {}}
					resizerURL={resizerURL}
					loading={eagerLoadFirstImage && index === 0 ? "eager" : "lazy"}
				/>
			)}
		</ImageWrapper>
	);

	useEffect(() => {
		if (!isAdsEnabled()) {
			return undefined;
		}
		const carousel = carouselRef.current;
		if (!carousel) {
			return undefined;
		}

		const handler = (event): void => {
			if (event.propertyName === "transform") {
				setAdHidding(false);
				setAdDone(true);
			}
		};

		carousel.addEventListener("transitionend", handler);
		return (): void => {
			carousel.removeEventListener("transitionend", handler);
		};
	});

	const ImageCountTextOutput = {
		__html: pageCountPhrase
			? pageCountPhrase(page + 1, galleryElements.length)
			: `<span>Image</span> ${page + 1} of ${galleryElements.length}`,
	};

	return (
		<GalleryDiv ref={galleryRef} aria-roledescription="carousel" aria-label={ansHeadline}>
			<ControlsDiv>
				<ControlContainer>
					<ControlsButton type="button" onClick={(): void => fullScreen()}>
						<FullscreenIcon fill={greyFill} />
						<PlaybackText primaryFont={controlsFont}>{expandPhrase || "Expand"}</PlaybackText>
					</ControlsButton>
					<ControlsButton type="button" onClick={(): void => onPlayHandler()}>
						{autoDuration ? (
							<>
								<PauseIcon fill={greyFill} />
								<PlaybackText
									primaryFont={controlsFont}
									aria-label={autoplayPhraseLabels.stop || "Stop automatic slide show"}
								>
									{pausePhrase || "Pause autoplay"}
								</PlaybackText>
							</>
						) : (
							<>
								<PlayIcon fill={greyFill} />
								<PlaybackText
									primaryFont={controlsFont}
									aria-label={autoplayPhraseLabels.start || "Start automatic slide show"}
								>
									{autoplayPhrase || "Autoplay"}
								</PlaybackText>
							</>
						)}
					</ControlsButton>
				</ControlContainer>
				<ControlContainer>
					<ImageCountText
						primaryFont={controlsFont}
						dangerouslySetInnerHTML={ImageCountTextOutput}
					/>
					<ControlsButton
						aria-label={previousImagePhrase}
						className="gallery--top-control-button"
						onClick={(): void => prevHandler()}
						type="button"
					>
						<ChevronLeftIcon fill={greyFill} />
					</ControlsButton>
					<ControlsButton
						aria-label={nextImagePhrase}
						className="gallery--top-control-button"
						onClick={(): void => nextHandler()}
						type="button"
					>
						<ChevronRightIcon fill={greyFill} />
					</ControlsButton>
				</ControlContainer>
			</ControlsDiv>
			<CarouselContainer
				id={`gallery-images-${ansId}`}
				{...handlers}
				aria-live={autoDuration ? "off" : "polite"}
			>
				{galleryElements.map(
					(imgContent, index): React.ReactElement =>
						renderImage(
							imgContent,
							index,
							isAdActive() && isAdInPage(index),
							galleryElements.length,
						),
				)}
				<CarouselButton
					type="button"
					aria-label={previousImagePhrase}
					className="prev-button"
					onClick={(): void => prevHandler()}
				>
					<ChevronLeftIcon width="100%" height="100%" fill="white" />
				</CarouselButton>
				<CarouselButton
					type="button"
					aria-label={nextImagePhrase}
					className="next-button"
					onClick={(): void => nextHandler()}
				>
					<ChevronRightIcon width="100%" height="100%" fill="white" />
				</CarouselButton>
			</CarouselContainer>
			{galleryElements[page] && (
				<ImageMetadata
					subtitle={displayTitle ? galleryElements[page].subtitle : null}
					caption={displayCaption ? galleryElements[page].caption : null}
					credits={displayCredits ? galleryElements[page].credits : null}
				/>
			)}

			{isOpen && (
				<Lightbox
					mainSrc={lightboxHandler(page, "main")}
					nextSrc={lightboxHandler(page, "next")}
					prevSrc={lightboxHandler(page, "prev")}
					onCloseRequest={(): void => exitFullScreen()}
					onMovePrevRequest={(): void => prevHandler()}
					onMoveNextRequest={(): void => nextHandler()}
					imagePadding={32}
					showImageCaption
				>
					{galleryElements[page] && (
						<ImageMetadata
							subtitle={displayTitle ? galleryElements[page].subtitle : null}
							caption={displayCaption ? galleryElements[page].caption : null}
							credits={displayCredits ? galleryElements[page].credits : null}
						/>
					)}
				</Lightbox>
			)}
		</GalleryDiv>
	);
};

Gallery.propTypes = {
	/** Thumbor resizer URL */
	resizerURL: PropTypes.string,
	/** Globally Unique ID trait */
	ansId: PropTypes.string,
	/** ANS Headline identifier */
	ansHeadline: PropTypes.string,
	/** Gallery ANS elements */
	// eslint-disable-next-line react/forbid-prop-types
	galleryElements: PropTypes.array,
	/** Expand phrase text for internationalization */
	expandPhrase: PropTypes.string,
	/** Autoplay phrase text for internationalization */
	autoplayPhrase: PropTypes.string,
	/** Object of phases for stop and start labels of Autoplay button */
	autoplayPhraseLabels: PropTypes.shape({
		start: PropTypes.string,
		stop: PropTypes.string,
	}),
	/** Pause phrase text for internationalization */
	pausePhrase: PropTypes.string,
	/** Page count phrase text for internationalization */
	pageCountPhrase: PropTypes.func,
	/** Number of clicks between Ads (clicks can be in any direction) */
	interstitialClicks: PropTypes.number,
	/** Function element to be rendered as an Ad */
	adElement: PropTypes.func,
	/** Primary Font */
	controlsFont: PropTypes.string,
	/** Display Title */
	displayTitle: PropTypes.bool,
	/** Display Caption */
	displayCaption: PropTypes.bool,
	/** Display Credits */
	displayCredits: PropTypes.bool,
};

export default Gallery;
