rm -rf ./dist/*;
rm -rf ../Visitorkit-Region/app/static/sdk/*;
npm run build;
cp -r ./dist/* ../Visitorkit-Region/app/static/sdk/.
