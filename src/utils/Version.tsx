import React from 'react';
let pkg = require('../../package.json');

const Version = () => (
    <p style={{fontFamily: "Helvetica"}}>{pkg.version}</p>
)

export default Version;