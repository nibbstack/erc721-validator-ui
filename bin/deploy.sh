#!/bin/sh

set -e
echo "Installing node modules ..."
npm install
API_BASE_URL=https://api.erc721validator.org npm run generate
cd dist
echo 'erc721validator.org' > CNAME
git init
git add -A
git commit -m "Deploy website"
echo "Deploying to GitHub pages..."
git push -f git@github.com:nibbstack/erc721-validator-ui.git master:gh-pages
cd -
echo ''
echo '-------------------------------------------------'
echo '  Deployment complete. Keep on an awesome work!  '
echo '-------------------------------------------------'