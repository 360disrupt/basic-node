#New Projects

1. Replace projectname with your projectname (bower.json, package.json, src/, gulp/)
2. Add a mongoDB and config it in src/backend/database.coffee
3. Delete examples
  frontend/main/
  backend/models
  backend/mongo.service.coffee
  backend/mongo.service.spec.coffee


# projectname

##Coding Guidlines

..1. Use separate branches for separate problems, feel free to push to master afterwards

..2. More code is read than written, be specific in variable names

..3. Small commits, commit the smallest unit

..4. Write unit tests on critical functions

..5. No duplicate code, if code is needed twice, use classes, functions etc.

..6. Write comments, readme if something is not 100% self understandable

## Installation

bower and node package manager are required

`npm install`, installs all node packages
`bower install` installs all bower packages

## Build

use `gulp serve` for local serve
use `gulp serve:dist` to build a distilled version for deployment (copy files from dist folder to the server)

**Never upload s.th. to the server without pushing your commit to this repository.**

## Git
check this guide: `http://rogerdudler.github.io/git-guide/

### Getting the project
`git pull <url>`
set the master branch as upstream with the next commit by pushing with:
`git push -u origin master`

### How to contribute with git

#### add files
`git add --p` (adds single changes)
`git add <filename>` (adds files)

#### do a commit
`git commit -m "<your message>"`

#### upload
`git pull --rebase origin master` (get the newest version)
(maybe you need to solve merge conflicts)
`git push origin master`

add new packages for production with
`npm add --save <module>`

for development with
`npm add --save-dev <module>`

## Contributing
Enter your name and a stable email address

Andreas Geissinger geissinger@autofokus-marketing.de