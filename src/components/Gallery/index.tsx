/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from '../Image';
import Lightbox from '../Lightbox/index';
import ImageMetadata from '../ImageMetadata';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FullscreenIcon,
  PlayIcon,
} from '../icons';

const greyFill = '#6B6B6B';

interface ImageAttribution {
  name?: string;
}

interface GalleryProps {
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
  }[];
}

const Gallery: React.FC<GalleryProps> = ({ galleryElements }) => {
  const galleryRef = useRef(null);
  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState({
    isSliding: false,
    delta: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  // const [isAutoPlay, setIsAutoPlay] = useState(false);

  const fullScreen = (): void => {
    setIsOpen(true);
  };

  const exitFullScreen = (): void => {
    setIsOpen(false);
  };

  const prevHandler = (): void => {
    if (page <= 0) {
      return;
    }

    setPage(page - 1);
  };

  const nextHandler = (): void => {
    if (page >= galleryElements.length - 1) {
      return;
    }

    setPage(page + 1);
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
    <div className="news-theme-gallery" ref={galleryRef}>
      <div className="controls-container">
        <div className="playback-controls">
          <button type="button" onClick={(): void => fullScreen()}>
            <FullscreenIcon fill={greyFill} />
            <span>Full Screen</span>
          </button>
          <button type="button">
            <PlayIcon fill={greyFill} />
            <span>Autoplay</span>
          </button>
        </div>
        <div className="image-change-controls">
          {page + 1}
          &nbsp;of&nbsp;
          {galleryElements.length}
          <button type="button" onClick={(): void => prevHandler()}>
            <ChevronLeftIcon fill={greyFill} />
            <span className="sr-only">Move Left</span>
          </button>
          <button type="button" onClick={(): void => nextHandler()}>
            <ChevronRightIcon fill={greyFill} />
            <span className="sr-only">Move Right</span>
          </button>
        </div>
      </div>
      <div className="gallery-carousel-container" {...handlers}>
        { galleryElements.map((imgContent): React.ReactElement => (
          <div
            key={`gallery-image-${imgContent._id}`}
            className="image-wrapper"
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
            />
          </div>
        ))}
        <button type="button" className="prev-button" onClick={(): void => prevHandler()}>
          <ChevronLeftIcon width="100%" height="100%" fill="white" />
          <span className="sr-only">Move Left</span>
        </button>
        <button type="button" className="next-button" onClick={(): void => nextHandler()}>
          <ChevronRightIcon width="100%" height="100%" fill="white" />
          <span className="sr-only">Move Right</span>
        </button>
      </div>
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
    </div>
  );
};

export default Gallery;
