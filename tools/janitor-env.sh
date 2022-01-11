#!/bin/bash

# Use this script to only deploy production builds

echo "BUILD_ENV: $VERCEL_ENV"

if [[ "$BUILD_ENV" == "production" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
