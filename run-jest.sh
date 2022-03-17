#!/usr/bin/env bash

# cd to the root of the repo
cd "$(git rev-parse --show-toplevel)"

# avoids re-compilation during publishing of both packages
if [[ ! -v CI ]]; then
  yarn run install
fi
./node_modules/.bin/jest packages/
