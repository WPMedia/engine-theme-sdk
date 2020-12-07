import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BackwardIcon,
  BellIcon,
  CalendarIcon,
  CameraIcon,
  ChartIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  ClosedCaptioningIcon,
  CogIcon,
  CommentsIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  ExternalLinkIcon,
  FacebookAltIcon,
  FacebookIcon,
  ForwardIcon,
  FullscreenIcon,
  GiftIcon,
  GridIcon,
  GripVerticalIcon,
  HamburgerMenuIcon,
  HeadphonesIcon,
  HomeIcon,
  InstagramIcon,
  LinkIcon,
  LinkedInAltIcon,
  LinkedInIcon,
  LockIcon,
  MediumIcon,
  NextIcon,
  PageIcon,
  PauseCircleIcon,
  PauseIcon,
  PhoneIcon,
  PinterestAltIcon,
  PinterestIcon,
  PlayCircleIcon,
  PlayIcon,
  PlusIcon,
  PreviousIcon,
  PrintIcon,
  RedditIcon,
  RssIcon,
  SearchIcon,
  ShareIcon,
  SnapchatIcon,
  SoundCloudIcon,
  SoundOffIcon,
  SoundOnIcon,
  StarHalfIcon,
  StarIcon,
  TumblrIcon,
  TwitchIcon,
  TwitterAltIcon,
  TwitterIcon,
  UnlockIcon,
  UserIcon,
  WhatsAppIcon,
  YoutubeAltIcon,
  YoutubeIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '.';


type IconProps = import('./types').default;

const Icon: React.FC<IconProps> = ({
  width = 24, height = 24, fill = '#000', title = 'Instagram logo', description = '',
}) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" role="img">
    <title>{title}</title>
    <desc>{description}</desc>
    <path fill={fill} d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const Item = styled.li`
display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 15%;
  min-width: 120px;
  padding: 0px 7.5px 20px;
  svg {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
    p {
        font-size: 14px;
        color: rgb(102, 102, 102);
    }
`;

const List = styled.ul`
  display: flex;
  align-self: center;
  flex-flow: row wrap;
  list-style: none;
`;

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Icon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#000',
  title: 'Icon title',
  description: '',
};

const IconSelector = ({
  type = 'arrowdown', width = 24, height = 24, fill = '#000', title = 'Instagram logo', description = '',
}) => {
  switch (type) {
    case 'arrowdown':
      return (
        <ArrowDownIcon
          width={width}
          height={height}
          fill={fill}
          title={title}
          description={description}
        />
      );
    case 'arrowleft':
      return (
        <ArrowLeftIcon
          width={width}
          height={height}
          fill={fill}
          title={title}
          description={description}
        />
      );
    case 'arrowright':
      return (
        <ArrowRightIcon
          width={width}
          height={height}
          fill={fill}
          title={title}
          description={description}
        />
      );
    case 'arrow-up':
      return (
        <ArrowUpIcon
          width={width}
          height={height}
          fill={fill}
          title={title}
          description={description}
        />
      );
    case 'camera':
      return (
        <CameraIcon
          width={width}
          height={height}
          fill={fill}
          title={title}
          description={description}
        />
      );
    default:
      return null;
  }
};

IconSelector.propTypes = {
  type: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export {
  Icon, List, Item, IconSelector,
};
