import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import SoundCloudIcon from '../src/components/icons/SoundCloudIcon';

storiesOf('Soundcloud', module)
  .add('with title', () => <SoundCloudIcon title="hy" />)
  .add('with no title', () => <SoundCloudIcon />);
