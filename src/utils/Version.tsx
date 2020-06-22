import React from 'react';

const pkg = require('../../package.json');

const Version = () => (
  <p style={{ fontFamily: 'Helvetica' }}>{pkg.version}</p>
);

export default Version;
