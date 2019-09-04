cd /public_html/.../
rm -rf assets/
cd dist
find . -maxdepth 1 -exec mv {} .. \; 
cd ..