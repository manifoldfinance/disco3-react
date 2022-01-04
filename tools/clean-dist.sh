#!/bin/bash
set -x

echo "Cleaning build output..."
node clean.js packages/**/dist
