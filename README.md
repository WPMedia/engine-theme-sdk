# Engine Theme SDK Components


## `dist-tags`

This package has been published with a number of dist-tags meant for different purposes:

- `stable`: Client Production environment
- `beta`: Client Sandbox environment
- `rc`: Developer environment for testing hotfixes preparing for `beta` or, worst comes to worst, `stable`
- `canary`: For developers to test on core components 

## Preview Components, Functionality
<a href="https://canary.arcpublishing.com/alc/docs/storybooks/engine-theme-sdk/" target="_blank" ><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>

Storybook allows custom block developers to see how components act individually and together. This will ensure that components work as expected and in an accessible implementation. Addons you'll see in the tray below the icon will determine its accessibility practices as well and provide suggestions for use.

The component explorer will also show the effect of different props on components. For [component-driven development](https://blog.hichroma.com/component-driven-development-ce1109d56c8e), this will hopefully make frontend developer lives easier.

`npm i`

`npm run storybook`

If you don't go to the page automatically on successful compilation, go to [http://localhost:6006/](http://localhost:6006/). 

### Image development 

Please note that the best way to debug images is to copy-paste from production environment with thumbor into the test parameters. See the stories folder images for more details.
## Contribute	
If you need to update an existing Engine SDK component, contact the Pagebuilder team. If you want to create a new component follow these instructions:	
1. Pull the latest `canary` branch	

    - `git checkout canary`	

    - `git fetch -a`	
2. Branch off the `canary` branch	
    - `git checkout -b PEN-[jira ticket num]-[brief description of feature]`	
3. Create a new folder `YourComponentName` under `src/components`.	
4. Implement your component in a `index.tsx` file. Remember to add an `interface` with your component's props and add `proptypes` for type checking.	
5. Implement unit tests for your component in a `index.test.tsx` file. Remember to use your component [locally](https://canary.arcpublishing.com/alc/docs/storybooks/engine-theme-sdk/?path=/story/intro--page#local-development) to test the changes.	
6. Document your component by creating a new story `YourComponentName.stories.mdx` under `stories/`.	
    - Run `npm run storybook` to verify your story was created	
7. When committing your changes, Chromatic will run visual regression tests and will generate a link to review any changes	
8. When your component is ready make a PR against `canary`, get approval for your PR, then follow the [publishing](https://canary.arcpublishing.com/alc/docs/storybooks/engine-theme-sdk/?path=/story/intro--page#how-to-publish) steps.

## How To Publish To Canary

- Merge into `canary` branch. You can watch the github publish action [here](https://github.com/WPMedia/engine-theme-sdk/actions?query=workflow%3A%22Canary+build%22).

## How To Publish To RC 

- Merge into `rc` branch. You can watch the github publish action [here](https://github.com/WPMedia/engine-theme-sdk/actions?query=workflow%3A%22Release+candidate+build%22).

## How To Publish To Beta 

- Changes published to beta should be tested in either `rc` branch or `canary` first. `beta` is a client environment that is not for themes developers to test in.
- Merge into `beta` branch. You can watch the github publish action [here](https://github.com/WPMedia/engine-theme-sdk/actions?query=workflow%3A%22Beta+build%22). 

### How To Publish To Production

1. After design qa and qa approval, make a pull request from the `rc` branch to the `master` branch. 

2. Version and publish as above. Make sure you're using `stable` not `latest`.

`npm version`

`git push origin rc` 

`npm publish --tag stable`

3. Your changes should be reflected in the blocks using `engine-theme-sdk`

`blocks/card-list-block/package.json`

```json
{
  "name": "@wpmedia/card-list-block",
  "dependencies": {
    "@wpmedia/engine-theme-sdk": "stable",
  }
}
```

4. Go to new theme feature pack's `blocks.json`. Change your engine block to the `@beta` release in the blocks list (eg, "@wpmedia/header-nav" -> "@wpmedia/header-nav@beta"). Make a pr against the news theme repo making that change to the `master` branch. Then publish that change using deployment strategy to the canary environment (corecomponents prod is a canary env). Alert quality assurance stakeholder that the change has been published.

`blocks.json`

```json
{
  "engineSDK": "@wpmedia/engine-theme-sdk@stable"

}
```

[Read more](https://docs.npmjs.com/adding-dist-tags-to-packages) about dist tags via npm.

## Install

Engine SDK components are written in React and Typescript, and its stories are written in [MDX Format](https://storybook.js.org/docs/formats/mdx-syntax/). It requires Storybook version 6.0.0-beta.26 and up.

Add Engine SDK to your project.

`npm install --save @wpmedia/engine-theme-sdk`

Add to your `blocks.json`.

`@wpmedia/engine-theme-sdk@version`

### Local Development

You can test Engine SDK components locally by updating the `.env` file of the feature pack to include the absolute path to the engine theme sdk directory. Please see [step-by-step](https://github.com/WPMedia/Fusion-News-Theme#how-to-do-local-themes-development) for full details.

### Arc Logo

While most SDK components are public facing, the `ArcLogo` is meant for internal use and is generally used for the navigation header block, footer block or anywhere that requires a fallback logo for branding.

Since the documentation for this cannot be available in ALC as it is meant to be a user-facing documentation source, there is internal documentation in this repo for it's use which can be found at `/stories/internal/ArcLogo.stories.mdx`

## Deploy to ALC

Engine Theme SDK automatically deploys to ALC.
Engine SDK documentation is available [here](https://canary.arcpublishing.com/alc/docs/storybooks/engine-theme-sdk/?path=/story/intro--page). To update the documentation on Arc Learning Center you have to upload it to S3 by following these steps:
1. Run `npm run build-storybook` on `engine-theme-sdk`. This will generate a static storybook build in `/storybook-static`.
2. Open the [WP-ARC AWS Console](https://console.aws.amazon.com/s3/buckets/arc-learning-center-static/docs/?region=us-east-1&tab=overview#) (you might need to authenticate with OKTA first).
3. Go to `storybooks`, then `engine-theme-sdk` and click on `Upload`.
4. Upload your files to replace the contents of `engine-theme-sdk` with your new build. Make sure to include the `sb_dll` folder generated in the build.
5. Click on `Next` and go through the uploading process with the default settings.
6. After a minute your changes will be live on [ALC](https://canary.arcpublishing.com/alc/docs/storybooks/engine-theme-sdk/?path=/story/intro--page).

## License

Shield: [![CC BY-NC-ND 4.0][cc-by-shield]][cc-by-nc-nd]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License][cc-by-nc-nd].

[![CC BY-NC-ND 4.0][cc-by-image]][cc-by-nc-nd]

[cc-by-nc-nd]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-image]: https://licensebuttons.net/l/by-nc-nd/3.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg
