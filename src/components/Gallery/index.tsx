/**
 * Gallery
 * --------------
 * Note on Events:
 * The prevHandler, nextHandler and autoplay callbacks use the EventEmitter object
 * to send off events that the next or previous image in the gallery has been accessed.
 * For next image access events, the event "galleryImageNext" is emitted and for previous,
 * the event "galleryImagePrevious" is emitted.
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
import React, { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import Image from '../Image';
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

interface GalleryProps {
  resizerURL?: string;
  ansId?: string;
  ansHeadline?: string;
  galleryElements?: {
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
  }[];
  expandPhrase?: string;
  autoplayPhrase?: string;
  pausePhrase?: string;
  pageCountPhrase?: (current: number, total: number) => string;
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
}) => {
  const galleryRef = useRef(null);
  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState({
    isSliding: false,
    delta: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [autoDuration, setAutoDuration] = useState(null);

  const fullScreen = (): void => {
    setAutoDuration(null);
    setIsOpen(true);
  };

  const exitFullScreen = (): void => {
    setIsOpen(false);
  };

  const prevHandler = (): void => {
    if (page <= 0) {
      return;
    }
    const pg = page - 1;
    EventEmitter.dispatch('galleryImagePrevious', {
      eventName: 'galleryImagePrevious',
      ansGalleryId: ansId,
      ansGalleryHeadline: ansHeadline,
      ansImageId: galleryElements[pg]._id,
      caption: galleryElements[pg].caption,
      orderPosition: pg + 1,
      totalImages: galleryElements.length,
      autoplay: false,
    });
    setPage(pg);
  };

  const nextHandler = (): void => {
    if (page >= galleryElements.length - 1) {
      return;
    }
    const pg = page + 1;
    EventEmitter.dispatch('galleryImageNext', {
      eventName: 'galleryImageNext',
      ansGalleryId: ansId,
      ansGalleryHeadline: ansHeadline,
      ansImageId: galleryElements[pg]._id,
      caption: galleryElements[pg].caption,
      orderPosition: pg + 1,
      totalImages: galleryElements.length,
      autoplay: false,
    });
    setPage(pg);
  };

  useInterval(() => {
    if (page >= galleryElements.length - 1) {
      setAutoDuration(null);
    } else {
      const pg = page + 1;
      EventEmitter.dispatch('galleryImageNext', {
        eventName: 'galleryImageNext',
        ansGalleryId: ansId,
        ansGalleryHeadline: ansHeadline,
        ansImageId: galleryElements[pg]._id,
        caption: galleryElements[pg].caption,
        orderPosition: pg + 1,
        totalImages: galleryElements.length,
        autoplay: true,
      });
      setPage(pg);
    }
  }, autoDuration);

  const onPlayHandler = (): void => {
    if (autoDuration) {
      setAutoDuration(null);
    } else {
      if (page >= galleryElements.length - 1) {
        const pg = 0;
        EventEmitter.dispatch('galleryImagePrevious', {
          eventName: 'galleryImagePrevious',
          ansGalleryId: ansId,
          ansGalleryHeadline: ansHeadline,
          ansImageId: galleryElements[pg]._id,
          caption: galleryElements[pg].caption,
          orderPosition: pg + 1,
          totalImages: galleryElements.length,
          autoplay: true,
        });
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
      return array[pageNo].dataset.lightbox;
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
        { galleryElements.map((imgContent): React.ReactElement => (
          <ImageWrapper
            key={`gallery-image-${imgContent._id}`}
            data-image-id={imgContent._id}
            style={{
              transform: slide.isSliding
                ? `translate(calc(${-100 * page}% - ${slide.delta}px), 0)`
                : `translate(${-100 * page}%, 0)`,
              transitionDuration: slide.isSliding ? '0s' : '1s',
            }}
          >
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
  /** Globally Unique ID trait */
  galleryElements: PropTypes.arrayOf(PropTypes.shape({
    /** Gallery ANS elements */
    _id: PropTypes.string,
    url: PropTypes.string,
    alt_text: PropTypes.string,
    subtitle: PropTypes.string,
    caption: PropTypes.string,
    credits: PropTypes.shape({
      by: PropTypes.array,
      affiliation: PropTypes.array,
    }),
    resized_params: PropTypes.object,
    breakpoints: PropTypes.shape({
      small: PropTypes.number,
      medium: PropTypes.number,
      large: PropTypes.number,
    }),
  })),
  /** Expand phrase text for internationalization */
  expandPhrase: PropTypes.string,
  /** Autoplay phrase text for internationalization */
  autoplayPhrase: PropTypes.string,
  /** Pause phrase text for internationalization */
  pausePhrase: PropTypes.string,
  /** Page count phrase text for internationalization */
  pageCountPhrase: PropTypes.string
};

export default Gallery;
