# Engine Theme SDK Components

This is the lerna-managed monorepo for the components that make up the Engine Theme SDK.

This monorepo is a collection of packages for SDK components, but they are all versioned separately for now so that they can be patched separately.

## Instructions

Lerna requires some setup and know-how, so be sure to read the instructions below to prevent any hiccups/accidents/incidents.

### Initial install

Lerna can be run with `npx` from the root repo directory once we've cloned it:

```sh
$ git clone git@github.com:WPMedia/engine-theme-sdk.git
$ cd engine-theme-sdk
$ npx lerna list
# lerna prints a list of all packages in our monorepo
```

### Creating a new package

#### New SDK Component

If we wanted to create a new component for our theme called `image` the command we'd run with lerna would look something like this.

```sh
npx lerna create @arc-test-org/image components/image
```

The CLI will go through a bunch of questions, can accept all of them for now because we're going to alter some of what it'll generate. In fact the above command can be run with a `--yes` arg to just accept the default for each prompt automatically.

From there we need to update our `package.json` for our new component. We'll want our `package.json` to look something like this:

```json
{
  "name": "@arc-test-org/image",
  "version": "0.0.0",
  "description": "Thumbor and lazy loading Image component",
  "author": "Brent Miller <brent.miller@washport.com>",
  "homepage": "https://github.com/WPMedia/engine-theme-sdk#readme",
  "license": "UNLICENSED",
  "main": "lib/image.js",
  "directories": {
    "lib": "lib"
  },
  "files": [
    "lib"
  ],
  "publishConfig": {
    "access": "restricted"
  },
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1",
    "lint": "eslint --ext js --ext jsx lib"
  }
}
```

Couple things to note here:

1. The initial version is set to `0.0.0`. This is because on your initial commit you are going to choose the first version you want to publish. Otherwise, it will default to `1.0.0` and then you'll need to bump up the package version no matter what once you publish.
3. There is a `lint` script in the `scripts`. This script is run with `npx lerna run lint` at the root although it can also be run with `npm run lint` if the package root is your working directory.

### Installing `node_modules`

Installing the dependencies for a package is slightly different in lerna, since lerna tracks what dependencies each subpackage uses (including subpackages depending on other subpackages).

When you clone or pull the monorepo, you'll want to run this:

```sh
npx lerna bootstrap
```

This command does all the installing and linking we need to have access to our dependencies.

### Adding a new dependency

Much like installing existing dependencies, we'll want to rely on lerna commands for adding new dependecies and linking subpackages together as well.

[We'll want to use lerna's 'add' command to install new dependencies.](https://github.com/lerna/lerna/tree/master/commands/add#readme) It's unlikely any of our usage will end up deviating from that doc.

### Publishing a subpackage

Knowing the quirks of publishing a subpackage of this monorepo to a registry is very important. Please, please [read the documentation for lerna's 'publish' command before trying to publish anything](https://github.com/lerna/lerna/tree/master/commands/publish#readme).

A few key things to know:

* This repo manages each package version _independently_ meaning you'll need to know the right semver choice for each version change.
* If you want to publish one of our subpackages and there's another subpackage in the repo that has committed and unpublished changes, you will be _required_ to publish a new version of those other subpackages. So do not start a `lerna publish` unless you are in a place where you can publish all of those other unpublished subpackages.
* You'll need to specify the name of the package scope in the `name` field of the `package.json` order for the package to be published for that scope.

## License

TODO
