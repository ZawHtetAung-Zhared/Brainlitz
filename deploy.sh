#staging deploy
cd /public_html/brainlitz-web/
rm -rf assets/
cd dist
find . -maxdepth 1 -exec mv {} .. \; 
cd ..