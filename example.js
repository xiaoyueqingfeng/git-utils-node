const git = require('./index')

console.log(git.shortCommitHash())

console.log(git.commitHash())

console.log(git.currentBranch())

console.log(git.latestTagName())

console.log(git.userName())

console.log(git.conflicts())

console.log(git.changedFiles())

console.log(git.remoteBranches())

console.log(git.localBranches())

console.log(git.localMissingBranches()) 