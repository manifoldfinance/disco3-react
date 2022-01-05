#!/bin/bash
git --no-pager log --no-merges --format="### %s%d%n>%aD%n%n>Author: %aN (%aE)%n%n>Commiter: %cN (%cE)%n%n%b%n%N%n" > CHANGELOG.md
