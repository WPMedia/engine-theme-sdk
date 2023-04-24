# Engine Theme SDK Components

Based on V2 architecture, the repository will continue to contain the following functionality:

- MetaData
- EventEmitter

For more info on the V2 migration work, see the [V2 Migration Checklist](https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/3106243821/Converting+a+v1+block+to+v2+architecture).

## `dist-tags`

Please refer to the target manifest named tag, like `arc-themes-release-version-2.00`. For more information on tags, see [npm docs](https://docs.npmjs.com/cli/v8/commands/npm-dist-tag) and [authenticating how-to](https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/3336536144/Create+an+.npmrc+with+GitHub+Personal+Access+Token).

## Preview Components, Functionality

To see the available builds, go to the [Chromatic project builds page](https://www.chromatic.com/builds?appId=5eed0506faad4f0022fedf95).

To run locally:

`npm i`

`npm run storybook`

If you don't go to the page automatically on successful compilation, go to [http://localhost:6006/](http://localhost:6006/).

When you push to the branch and make a pull request, you will see the built storybook in the pull request checks.

For more information on Storybook and Chromatic usage, see [internal doc](https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2341536211/Arc+Themes+Blocks+Storybook).

## Install

Engine Theme SDK is installed as part of V2 compile for themes. Please use Themes Settings to deploy for V2 Themes.

### Local Development

You can test Engine SDK components locally by updating the `.env` file of the feature pack to include the absolute path to this directory.

## License

Shield: [![CC BY-NC-ND 4.0][cc-by-shield]][cc-by-nc-nd]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License][cc-by-nc-nd].

[![CC BY-NC-ND 4.0][cc-by-image]][cc-by-nc-nd]

[cc-by-nc-nd]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-image]: https://licensebuttons.net/l/by-nc-nd/3.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
