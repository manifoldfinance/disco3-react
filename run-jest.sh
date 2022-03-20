#!/usr/bin/env bash

# cd to the root of the repo
cd "$(git rev-parse --show-toplevel)"

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

set -x

yarn install
yarn run build
node --expose-gc node_modules/.bin/jest --coverage --globals "{\"coverage\":true}" packages/

if [ -n "$CI" ]; then
  jestArgs="${jestArgs} --maxWorkers=4 --ci"
fi

$node "$(yarn bin jest)" $jestArgs
