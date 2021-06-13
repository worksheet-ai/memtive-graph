#!/usr/bin/env bash

rm -rf docs
cd example/
yarn build
cd ..
cp -R example/build ./
mv build docs
rm -rf example/build
