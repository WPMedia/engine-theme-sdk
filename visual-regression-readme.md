# Chromatic POC test instructions
https://www.chromatic.com/

1) Run `npm i`
2) Run `npm run chromatic` Note: The project token was added to the script via the --project-token flag.
If we run Chromatic via continuous integration, we can set
the CHROMATIC_PROJECT_TOKEN environment variable in your CI environment. Then we can remove the --project-token from your package.json script.
3) See the results here: https://www.chromatic.com/library?appId=5eed0506faad4f0022fedf95 Use you GitHub credential to 
log in.

## Observations
This is a great product.  Very easy to set up and in addition you can also see the entire Storybook UI and not just the diffs.
Because of this, Chromatic has a slight edge over Applitools...unless Applitools has a better price point.  Both are
very easy to setup.

