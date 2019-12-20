/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from '../Image';
import ImageMetadata from '../ImageMetadata';
import ChevronLeft from './images/ChevronLeft';
import ChevronRight from './images/ChevronRight';
import FullScreen from './images/FullScreen';
import PlayButton from './images/PlayButton';

import './gallery.scss';

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
  const [page, setPage] = useState(0);
  const [slide, setSlide] = useState({
    isSliding: false,
    delta: 0,
  });

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
    <div className="news-theme-gallery">
      <div className="controls-container">
        <div className="playback-controls">
          <button type="button">
            <FullScreen fill={greyFill} />
            <span>Full Screen</span>
          </button>
          <button type="button">
            <PlayButton fill={greyFill} />
            <span>Autoplay</span>
          </button>
        </div>
        <div className="image-change-controls">
          {page + 1}
          &nbsp;of&nbsp;
          {galleryElements.length}
          <button type="button" onClick={(): void => prevHandler()}>
            <ChevronLeft fill={greyFill} />
            <span className="sr-only">Move Left</span>
          </button>
          <button type="button" onClick={(): void => nextHandler()}>
            <ChevronRight fill={greyFill} />
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
              smallHeight={225}
              mediumWidth={600}
              mediumHeight={338}
              largeWidth={800}
              largeHeight={450}
            />
          </div>
        ))}
        <button type="button" className="prev-button" onClick={(): void => prevHandler()}>
          <ChevronLeft fill="white" />
          <span className="sr-only">Move Left</span>
        </button>
        <button type="button" className="next-button" onClick={(): void => nextHandler()}>
          <ChevronRight fill="white" />
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
    </div>
  );
};

export default Gallery;
