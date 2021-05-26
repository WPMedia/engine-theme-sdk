import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useEditableContent } from 'fusion:content';

import { formatURL } from '../..';
import ThemeStyle, { ThemeStyleProps } from '../ThemeStyle';

// import './overline.scss';

interface OverlineProps {
  className?: string;
  customText?: string;
  customUrl?: string;
  editable?: boolean;
  story?: {
    _id?: string;
    owner?: {
      sponsored: boolean;
    };
    label?: {
      basic?: {
        text?: string;
      };
    };
  };
  websites?: {
    [key: string]: {
      website_section: {
        _id?: string;
        name?: string;
      };
    };
  };
  translations?: {
    sponsoredContent?: string;
  };
}

const Overline: React.FC<OverlineProps> = ({
  className = '',
  customText,
  customUrl,
  editable,
  story,
  translations: { sponsoredContent = 'Sponsored Content' } = {},
}) => {
  const { globalContent, arcSite } = useFusionContext();
  const { editableContent } = useEditableContent();

  const sourceContent = story || globalContent || {};

  const {
    display: labelDisplay,
    url: labelUrl,
    text: labelText,
  } = (sourceContent.label && sourceContent.label.basic) || {};
  const shouldUseLabel = !!(labelDisplay);

  const {
    _id: sectionUrl,
    name: sectionText,
  } = (sourceContent.websites
    && sourceContent.websites[arcSite]
    && sourceContent.websites[arcSite].website_section) || {};

  const shouldUseProps = !!(customText || customUrl);
  const editableContentPath = shouldUseLabel ? 'headlines.basic' : `websites.${arcSite}.website_section.name`;

  // Default to websites object data
  let [text, url] = [sectionText, sectionUrl];

  if (sourceContent?.owner?.sponsored) {
    text = sourceContent?.label?.basic.text || sponsoredContent;
    url = null;
  } else if (shouldUseProps) {
    text = customText;
    url = customUrl;
  } else if (shouldUseLabel) {
    [text, url] = [labelText, labelUrl];
  }

  let edit = {};
  if (editable) {
    if (sourceContent._id) {
      edit = { ...editableContent(sourceContent, editableContentPath) };
    }
  }

  const classNames = ['overline'];
  const itemProps: ThemeStyleProps = {
    ...edit,
    element: 'span',
  };

  if (url) {
    itemProps.href = formatURL(url);
    itemProps.element = 'a';
    classNames.push('overline--link');
  }

  if (className) {
    classNames.push(className);
  }

  itemProps.className = classNames.join(' ');

  return (url || text) ? (
    <ThemeStyle {...itemProps}>
      {text}
    </ThemeStyle>
  ) : null;
};

Overline.propTypes = {
  className: PropTypes.string,
  customText: PropTypes.string,
  customUrl: PropTypes.string,
  editable: PropTypes.bool,
  translations: PropTypes.shape({
    sponsoredContent: PropTypes.string,
  }),
};

export default Overline;
