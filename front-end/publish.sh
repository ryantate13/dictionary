#!/bin/bash
set -e
rm -rf build
yarn build
cd build
git init
git remote add origin https://github.com/ryantate13/dictionary.git
git add -A
git commit -m "github pages build"
git push -f origin master:gh-pages