# Chromatic test instructions
https://www.chromatic.com/

1) Run `npm i`
2) Run `npm run chromatic` Note: The project token was added to the script via the --project-token flag.
If we run Chromatic via continuous integration, we can set
the CHROMATIC_PROJECT_TOKEN environment variable in our CI environment. Then we can remove the --project-token from the 
package.json script.  However, we decided that we want to run Chromatic on commit.  I think it might be better that we do this on 
pre-push instead as we don't want to run Chromatic if we are just saving a commit to work on another branch, for example.
Either way, that would still require the 
token in either the package.json or each dev would have to know that they have to set the environment variable.  
3) See the results here: https://www.chromatic.com/library?appId=5eed0506faad4f0022fedf95 Use you GitHub credential to 
log in.


