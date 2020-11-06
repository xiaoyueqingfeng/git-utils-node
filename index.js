const { execSync } = require('child_process')
const git = {
  originName: 'origin',
  _branchNamesFilter(branchesStr) {
    return branchesStr.split(/\s/).filter(str => str.replace(/^\*|->|origin\/HEAD/, ''))
  },
  merge(sourceBranch) {
    return new Promise((resolve, reject) => {
      if (execSync(`git merge ${sourceBranch}`).toString().error) {
        reject()
      } else {
        resolve()
      }
    })
  },
  pull() {
    return new Promise((resolve, reject) => {
      if (execSync('git pull').toString().error) {
        reject()
      } else {
        resolve()
      }
    })
  },
  fetch() {
    execSync('git fetch --all')
  },
  prune() {
    execSync('git fetch --prune')
  },
  setUpstream(remoteName, branchName) {
    execSync(`git push --set-upstream ${remoteName} ${branchName}`)
  },
  remoteName() {
   return this.remoteBranches()[0].split('/')[0]
  },
  userName() {
    return execSync('git config user.name').toString().trim()
  },
  /**
   * 当前分支
   */
  currentBranch() {
    return execSync('git symbolic-ref --short -q HEAD').toString().trim()
  },
  /**
   * 获取远端分支
   */
  remoteBranches() {
    this.prune()
    return this._branchNamesFilter(execSync('git branch -r').toString())
  },
  /**
   * 获取本地分支
   */
  localBranches() {
    return this._branchNamesFilter(execSync('git branch').toString())
  },
  /**
   * 本地比远程少的分支
   */
  localMissingBranches() {
    const branches = []
    const remoteBranches = this.remoteBranches()
    const localBranches = this.localBranches()
    remoteBranches.forEach(remoteBranch => {
      const _remoteBranch = remoteBranch.match(new RegExp(`${this.originName}\\/(\\w+)`))[1]
      if (!localBranches.includes(_remoteBranch)) {
        branches.push(_remoteBranch)
      }
    })
    return branches
  },
  /**
   * 当前的冲突文件
   */
  conflicts() {
    return execSync('git diff --name-only --diff-filter=U').toString().trim()
  },
  /**
   * 最新的 tag name
   */
  latestTagName() {
    // execSync('git tag -l | xargs git tag -d')
    // execSync('git fetch --all')
    execSync(`git fetch --prune ${this.originName} +refs/tags/*:refs/tags/*`)
    execSync('git fetch --prune --prune-tags')
    return execSync(
      `git for-each-ref refs/tags --sort=-taggerdate --format='%(refname:short)' --count=1`
    ).toString().trim()
  },
  /**
   * 最新的 commit hash
   */
  commitHash() {
    return execSync('git rev-parse HEAD').toString().trim()
  },
  shortCommitHash() {
    return execSync('git rev-parse --short HEAD').toString().trim()
  },
  commitMessage() {
    return execSync(`git log --pretty='%s' -n 1`).toString().trim()
  },
  changedFiles() {
    return execSync('git log -n 1 --stat').toString().trim()
  }
}

module.exports = git