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


/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import Image from '../Image';
import buildThumborURL from '../Image/thumbor-image-url';
import Lightbox from '../Lightbox/index';
import ImageMetadata from '../ImageMetadata';
import useInterval from './setInterval';
import EventEmitter from '../EventEmitter';

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
} from './styled';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FullscreenIcon,
  PlayIcon,
  PauseIcon,
} from '../icons';

const greyFill = '#6B6B6B';

interface ImageAttribution {
  name?: string;
}

enum Direction {
  forward = 0,
  backward = 1
}

interface GalleryElement {
  _id: string;
  url: string;
  alt_text?: string;
  subtitle?: string;
  caption?: string;
  credits?: {
    by?: ImageAttribution[];
    affiliation?: ImageAttribution[];
  };
  resized_params: {
    [key: string]: string;
  };
  breakpoints: {
    small: number;
    medium: number;
    large: number;
  };
}

interface GalleryProps {
  resizerURL?: string;
  ansId?: string;
  ansHeadline?: string;
  galleryElements?: GalleryElement[];
  expandPhrase?: string;
  autoplayPhrase?: string;
  pausePhrase?: string;
  pageCountPhrase?: (current: number, total: number) => string;
  interstitialClicks?: number;
  adElement?: Function;
}

declare interface EventOptionsInterface {
  [s: string]: boolean | string | number;
}

const Gallery: React.FC<GalleryProps> = ({
  galleryElements,
  resizerURL = '',
  ansId = '',
  ansHeadline = '',
  expandPhrase,
  autoplayPhrase,
  pausePhrase,
  pageCountPhrase,
  interstitialClicks,
  adElement: AdElement,
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

  const isAdsEnabled = (): boolean => (
    (!!interstitialClicks && !!AdElement)
  );

  const isAdActive = (): boolean => {
    if (!isAdsEnabled() || adClicks === 0) {
      return false;
    }
    if (adDone) {
      return false;
    }
    return adClicks % interstitialClicks === 0;
  };

  const isAdInPage = (index: number): boolean => (
    index === page
  );

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
    emitEvent('galleryExpandEnter', page, page);
  };

  const exitFullScreen = (): void => {
    setIsOpen(false);
    emitEvent('galleryExpandExit', page, page);
  };

  const prevHandler = (): void => {
    if (page <= 0) {
      return;
    }
    const pg = page - 1;
    emitEvent('galleryImagePrevious', pg, pg + 1, { autoplay: false });
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
      return;
    }
    const pg = page + 1;
    emitEvent('galleryImageNext', pg, pg + 1, { autoplay: false });
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
      emitEvent('galleryAutoplayStop', page, page);
    } else {
      const pg = page + 1;
      emitEvent('galleryImageNext', pg, pg + 1, { autoplay: true });
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
      emitEvent('galleryAutoplayStop', page, page);
    } else {
      emitEvent('galleryAutoplayStart', page, page);
      if (page >= galleryElements.length - 1) {
        const pg = 0;
        emitEvent('galleryImagePrevious', pg, pg + 1, { autoplay: true });
        setPage(pg);
      }
      setAutoDuration(4000);
    }
  };

  const lightboxHandler = (pageNo, operation): string => {
    const nodeList = galleryRef.current.querySelectorAll('img');
    if (nodeList && nodeList.length) {
      const array = [...nodeList];
      if (operation === 'next') {
        return array[(pageNo + 1) % array.length].dataset.lightbox;
      } if (operation === 'prev') {
        return array[(pageNo + array.length - 1) % array.length].dataset.lightbox;
      }
      // main operation
      if (array[pageNo] && array[pageNo].dataset) {
        return array[pageNo].dataset.lightbox;
      }
    }

    // querySelectorAll looks like not rendered next image 
    // and we getting empty data for lightBox
    if(galleryElements[pageNo]){
      const galleryElement = galleryElements[pageNo];
      const imageSourceWithoutProtocol = galleryElement.url.replace('https://', '');
      const imageSrc = buildThumborURL(galleryElement.resized_params[`${1600}x${0}`], `${1600}x${0}`
        , imageSourceWithoutProtocol
        , resizerURL);
      return imageSrc;
    }

    return '';
  };

  const handlers = useSwipeable({
    onSwiped: (event) => {
      setSlide({
        isSliding: false,
        delta: 0,
      });

      if (event.dir === 'Left') {
        nextHandler();
      }

      if (event.dir === 'Right') {
        prevHandler();
      }
    },
    onSwiping: (event) => {
      setSlide({
        isSliding: true,
        delta: event.deltaX,
      });
    },
    preventDefaultTouchmoveEvent: false,
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
          transitionDuration: slide.isSliding ? '0s' : '1s',
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
  ): React.ReactElement => (
    <ImageWrapper
      key={`gallery-image-${imgContent._id}`}
      id={`gallery-pos-${index}`}
      data-image-id={imgContent._id}
      style={{
        transform: slide.isSliding
          ? `translate(calc(${-100 * page}% - ${slide.delta}px), 0)`
          : `translate(${-100 * page}%, 0)`,
        transitionDuration: slide.isSliding ? '0s' : '1s',
      }}
    >
      { showAd && renderAd() }
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
      />
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

    const handler = (): void => {
      setAdHidding(false);
      setAdDone(true);
    };

    carousel.addEventListener('transitionend', handler);
    return (): void => {
      carousel.removeEventListener('transitionend', handler);
    };
  });

  return (
    <GalleryDiv ref={galleryRef}>
      <ControlsDiv>
        <ControlContainer>
          <ControlsButton type="button" onClick={(): void => fullScreen()}>
            <FullscreenIcon fill={greyFill} />
            <PlaybackText>{expandPhrase || 'Expand'}</PlaybackText>
          </ControlsButton>
          <ControlsButton type="button" onClick={(): void => onPlayHandler()}>
            {autoDuration ? (
              <>
                <PauseIcon fill={greyFill} />
                <PlaybackText>{pausePhrase || 'Pause autoplay'}</PlaybackText>
              </>
            ) : (
              <>
                <PlayIcon fill={greyFill} />
                <PlaybackText>{autoplayPhrase || 'Autoplay'}</PlaybackText>
              </>
            )}
          </ControlsButton>
        </ControlContainer>
        <ControlContainer>
          <ImageCountText>
            {
              pageCountPhrase
                ? pageCountPhrase(page + 1, galleryElements.length)
                : `${page + 1} of ${galleryElements.length}`
            }
          </ImageCountText>
          <ControlsButton type="button" onClick={(): void => prevHandler()}>
            <ChevronLeftIcon fill={greyFill} />
            <span className="sr-only">Move Left</span>
          </ControlsButton>
          <ControlsButton type="button" onClick={(): void => nextHandler()}>
            <ChevronRightIcon fill={greyFill} />
            <span className="sr-only">Move Right</span>
          </ControlsButton>
        </ControlContainer>
      </ControlsDiv>
      <CarouselContainer {...handlers}>
        { galleryElements.map((imgContent, index): React.ReactElement => (
          renderImage(imgContent, index, isAdActive() && isAdInPage(index))
        ))}
        <CarouselButton type="button" className="prev-button" onClick={(): void => prevHandler()}>
          <ChevronLeftIcon width="100%" height="100%" fill="white" />
          <span className="sr-only">Move Left</span>
        </CarouselButton>
        <CarouselButton type="button" className="next-button" onClick={(): void => nextHandler()}>
          <ChevronRightIcon width="100%" height="100%" fill="white" />
          <span className="sr-only">Move Right</span>
        </CarouselButton>
      </CarouselContainer>
      {
        galleryElements[page] && (
          <ImageMetadata
            subtitle={galleryElements[page].subtitle}
            caption={galleryElements[page].caption}
            credits={galleryElements[page].credits}
          />
        )
      }

      {isOpen && (
      <Lightbox
        mainSrc={lightboxHandler(page, 'main')}
        nextSrc={lightboxHandler(page, 'next')}
        prevSrc={lightboxHandler(page, 'prev')}
        onCloseRequest={(): void => exitFullScreen()}
        onMovePrevRequest={(): void => prevHandler()}
        onMoveNextRequest={(): void => nextHandler()}
        imagePadding={32}
        showImageCaption
      >
        {
        galleryElements[page] && (
          <ImageMetadata
            subtitle={galleryElements[page].subtitle}
            caption={galleryElements[page].caption}
            credits={galleryElements[page].credits}
          />
        )
      }
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
  /** Pause phrase text for internationalization */
  pausePhrase: PropTypes.string,
  /** Page count phrase text for internationalization */
  pageCountPhrase: PropTypes.func,
  /** Number of clicks between Ads (clicks can be in any direction) */
  interstitialClicks: PropTypes.number,
  /** Function element to be rendered as an Ad */
  adElement: PropTypes.func,
};

export default Gallery;
