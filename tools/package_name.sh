#!/bin/sh
node -p "try { require('./package.json').name } catch(e) {}"
