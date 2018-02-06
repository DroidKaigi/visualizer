#!/bin/bash

set -xeu

intlVC="oc"

# chdir
cd ./gh-pages

# remove sourcemap cuz production is not needed
set +e
rm ./app.js.map
set -e

# copy all to android internal codename
mkdir $intlVC
mv * $intlVC
git add -f .

treeObjId=$(git write-tree --prefix=gh-pages)
git reset -- .

# create commit
commitId=$(git commit-tree -p gh-pages -m "autodeploy" $treeObjId)

# update ref gh-pages branch
git update-ref refs/heads/gh-pages $commitId

# revert chdir
cd -
