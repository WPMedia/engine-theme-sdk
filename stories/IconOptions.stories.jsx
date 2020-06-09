import React from 'react';
import { storiesOf } from '@storybook/react';
import SoundCloudIcon from '../src/components/icons/SoundCloudIcon';

/*
As a custom block dev,
I can extrapolate how other icons will work similarly

As a custom block dev,
I can see how to incorporate accessibility into my implementation of the components

As a custom block dev,
I can see the options for fill and changing size available to see pitfalls and opportunities
*/

//   width = 24, height = 24, fill = '#000', title = '', description = '',
storiesOf('Sample Icon Interaction', module)
  .add('with accessible title designated `SoundCloud music service logo` (try hovering over)', () => <SoundCloudIcon title="SoundCloud music service logo" />)
  .add('with no title designated, using default will show empty string (try hovering over)', () => <SoundCloudIcon />)
  .add('with description `Service is a great place to find indie artists and free downloads`', () => <SoundCloudIcon description="Service is a great place to find indie artists and free downloads" />)
  .add('with accessible title and description', () => <SoundCloudIcon title="SoundCloud music service logo" description="Service is a great place to find indie artists and free downloads" />)
  .add('modifying the width changes container width, filling space horizontally', () => <SoundCloudIcon width={100} />)
  .add('modifying the height changes container height, filling vertically', () => <SoundCloudIcon height={100} />)
  .add('modifying the height and width changes icon height and width', () => <SoundCloudIcon height={100} width={100} />)
  .add('change fill color red generic name', () => <SoundCloudIcon fill="red" />)
  .add('change fill color with pink hex code', () => <SoundCloudIcon fill="#ffd1dc" />)
  .add('use fill none', () => <SoundCloudIcon fill="none" />);
