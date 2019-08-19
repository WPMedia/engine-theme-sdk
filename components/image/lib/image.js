import React, { Component } from 'react';
import Static from 'fusion:static';
import buildThumborURL from './thumbor-image-url';


class Image extends Component {
    static DEFAULT_IMAGE = 'resources/images/default_feed_image.jpg';

    constructor(props) {
        super(props);
        this.defaultImage = this.props.defaultImage || Image.DEFAULT_IMAGE;
    }

    addDefaultSrc(elm) {
        elm.target.src = `${Fusion.contextPath}/${this.defaultImage}`; // eslint-disable-line no-param-reassign
    }

    render() {
        const {
            url,
            alt,
            smallWidth,
            smallHeight,
            mediumWidth,
            mediumHeight,
            largeWidth,
            largeHeight,
        } = this.props;

        return (
            <Static id={url}>
            <img
        className="lazy"
        onError={this.addDefaultSrc}
        src={this.addDefaultSrc}
        data-src={buildThumborURL(url, smallWidth,
                                 smallHeight)}
        data-srcset={`
          ${buildThumborURL(url, mediumWidth,
            mediumHeight)} 1000w, 
          ${buildThumborURL(url, largeWidth,
            largeHeight)} 2000w
          `}
        alt={alt}
        />
        </Static>
    );
    }
}

export default Image;
