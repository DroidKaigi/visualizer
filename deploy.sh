#!/bin/bash

set -xeu

set +e
rm ./gh-pages/app.js.map
set -e

git add -f ./gh-pages

treeObjId=$(git write-tree --prefix=gh-pages)
git reset -- ./gh-pages

commitId=$(git commit-tree -p gh-pages -m "autodeploy" $treeObjId)

git update-ref refs/heads/gh-pages $commitId
