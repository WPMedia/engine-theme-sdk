import React from 'react';
import { storiesOf } from '@storybook/react';
import ArcLogo from '../src/components/ArcLogo';

storiesOf('Arc Logo Interaction', module)
  .add('with accessible title designated `SoundCloud music service logo` (try hovering over)', () => <ArcLogo title="Custom Arc Logo Messaging" />)
  .add('with no title nor description designated, using default will show default title option filled string (try hovering over)', () => <ArcLogo />)
  .add('without description, no description default -- it is empty', () => <ArcLogo />)
  .add('with description', () => <ArcLogo description="Tools for digital publishers built by The Washington Post" />)
  .add('with custom title and description', () => <ArcLogo title="Custom Arc Logo Messaging" description="Tools for digital publishers built by The Washington Post" />);
