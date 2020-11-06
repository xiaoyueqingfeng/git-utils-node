git-utils-node
============

Get current git commit hash, commit message, latest tag, branch and so on.

## Install

`npm install git-utils-node --save`

## Example

```js
const git = require('git-utils-node')

console.log(git.shortCommitHash()) // ef89de1

console.log(git.commitHash()) // ef89de12ce1aa5cd74866bf875e015eef42906f6

console.log(git.currentBranch()) // master

console.log(git.latestTagName()) // v3.0.1

console.log(git.userName()) // tenglei

console.log(git.conflicts()) // show conflict files

console.log(git.changedFiles()) // show changed files of last commit

console.log(git.remoteBranches()) // ['dev', 'master', 'test'] (show remote branches)

console.log(git.localBranches()) // ['dev', 'master'] (show local branches)

console.log(git.localMissingBranches()) // ['test'] (compare local branches with remote)
```

You can also run all these examples via: `npm run example`
