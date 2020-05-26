# Engine Theme SDK Components


## How To Publish

1. Pull the latest `staging` branch. 

`git checkout staging`

`git fetch -a`

2. Branch off the `staging` branch

`git checkout -b PEN-[jira ticket num]-[brief description of feature]`

3. Do the work (heh). Commit as you go, which will run the linter and tests.

4. Make pull request using GitHub against the `staging` branch. Get approval for your pr on your feature branch. 

5. Merge into `staging` branch. 

`npm version prerelease --preid=beta`

 `npm publish --tag beta`

6. Go to new theme feature pack's `blocks.json`. Change your engine block to the @beta release in the blocks list (eg, "@wpmedia/header-nav" -> "@wpmedia/header-nav@beta"). Make a pr against the news theme repo making that change to the `master` branch. Then publish that change using deployment strategy to the staging environment (corecomponents prod is a staging env). Alert quality assurance stakeholder that the change has been published.

7. After design qa and qa approval, make a pull request from the staging branch to the master branch. (Should we make a new pr for just your staging changes?) 

8. Once the pr has been approved, merge your feature staging branch to master. Then, in master, you can publish against what's changed. (This could be done at the end of a sprint.)

`npm publish`

[Read more](https://docs.npmjs.com/adding-dist-tags-to-packages) about dist tags via npm.

## License

TODO
