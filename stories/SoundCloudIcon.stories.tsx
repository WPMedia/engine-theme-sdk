import React from 'react';
import { storiesOf } from '@storybook/react';
import SoundCloudIcon from '../src/components/icons/SoundCloudIcon';

/*
As a custom block dev,
I can extrapolate how other icons will work similarly
*/
storiesOf('Sample Icon Interaction', module)
  .add('with title designated `SoundCloud music service logo` (try hovering over)', () => <SoundCloudIcon title="SoundCloud music service logo" />)
  .add('with no title designated, using default will show empty string (try hovering over)', () => <SoundCloudIcon />)
  .add('with description `Service is a great place to find indie artists and free downloads`', () => <SoundCloudIcon description="Service is a great place to find indie artists and free downloads" />);
