cd /public_html/brainlitz-web-multi/
rm -rf assets/
cd dist
find . -maxdepth 1 -exec mv {} .. \; 
cd ..