
#!/usr/bin/env bash

set -e

if [[ $# -ne 1 ]]; then
  echo "This needs a release tag. e.g. $0 v0.0.1"
  exit 1
fi

if [[ -z "$GITHUB_SUPER_TOKEN" ]]; then
  echo "This script needs a GitHub personal access token."
  exit 1
fi

ACTION_KEYBASE_NOTIFICATIONS_REPO="action-keybase-notifications"
ACTION_AUTOMATIC_RELEASES_REPO="action-automatic-releases"
ACTION_INJECT_SSM_SECRETS_REPO="action-inject-ssm-secrets"
TAG=$1
GITHUB_LOGIN="marvinpinto"
RELEASE_BODY="Details available at [marvinpinto/actions@${TAG}](https://github.com/marvinpinto/actions/releases/tag/${TAG})."

PRERELEASE="false"
if [[ "$TAG" == "latest" ]]; then
  PRERELEASE="true"
fi

if [[ "$GITHUB_REPOSITORY" != "marvinpinto/actions" ]]; then
  echo "This mirror script is only meant to be run from marvinpinto/actions, not ${GITHUB_REPOSITORY}. Nothing to do here."
  exit 0
fi

create_tagged_release() {
  REPO=$1
  pushd /tmp/${REPO}/

  # Set the local git identity
  git config user.email "${GITHUB_LOGIN}@users.noreply.github.com"
  git config user.name "$GITHUB_LOGIN"

  # Obtain the release ID for the previous release of $TAG (if present)
  local previous_release_id=$(curl --user ${GITHUB_LOGIN}:${GITHUB_SUPER_TOKEN} --request GET --silent https://api.github.com/repos/${GITHUB_LOGIN}/${REPO}/releases/tags/${TAG} | jq '.id')

  # Delete the previous release (if present)
  if [[ -n "$previous_release_id" ]]; then
    echo "Deleting previous release: ${previous_release_id}"
    curl \
      --user ${GITHUB_LOGIN}:${GITHUB_SUPER_TOKEN} \
      --request DELETE \
      --silent \
      https://api.github.com/repos/${GITHUB_LOGIN}/${REPO}/releases/${previous_release_id}
  fi

  # Delete previous identical tags, if present
  git tag -d $TAG || true
  git push origin :$TAG || true

  # Add all the changed files and push the changes upstream
  git add -f .
  git commit -m "Update release files for tag: ${TAG}" || true
  git push -f origin master:master
  git tag $TAG
  git push origin $TAG

  # Generate a skeleton release on GitHub
  curl \
    --user ${GITHUB_LOGIN}:${GITHUB_SUPER_TOKEN} \
    --request POST \
    --silent \
    --data @- \
    https://api.github.com/repos/${GITHUB_LOGIN}/${REPO}/releases <<END
  {
    "tag_name": "$TAG",
    "name": "Auto-generated release for tag $TAG",
    "body": "$RELEASE_BODY",
    "draft": false,
    "prerelease": $PRERELEASE
  }
END
  popd
}
