#!/bin/bash
set -x


typedoc --version
typedoc --mode file --includes packages/store/src/ packages/eip1193/src/ packages/core/src/ packages/walletconnect/src/ --out typedocs/ --ignoreCompilerErrors
rm -rf docs
mv typedocs/ docs/
echo "Generated TypeDocs"
