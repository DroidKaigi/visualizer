#!/bin/bash

set -xeu

function log() {
    echo "$@" 1>&2
}

intlVC="oc"
exportDir=gh-pages/${intlVC}

set +e
rm -rf gh-pages
mkdir -p ./gh-pages
set -e

cp -R ./public ./${exportDir}

# chdir
cd ./gh-pages

# remove sourcemap cuz production is not needed
set +e
rm ./app.js.map
set -e

git add -f .
if [ -z "`git -C "." status -s .`" ]
then
  log No updates found.
  exit 0
fi

treeObjId=$(git write-tree --prefix=gh-pages)
git reset -- .

# before to commit
git fetch
git checkout gh-pages origin/gh-pages

# create commit
commitId=$(git commit-tree -p gh-pages -m "autodeploy" $treeObjId)

# update ref gh-pages branch
git update-ref refs/heads/gh-pages $commitId

git push origin gh-pages

# revert chdir
cd -
