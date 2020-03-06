#!/usr/bin/env bash

deploy(){
  if [ "$environment" = "dev" ]; then
    # IP - 13.229.235.46
    # Same IP as Staging but different folder
    PROJECT_FOLDER="/public_html/brainlitz-web-multi"
  fi

  if [ "$environment" = "staging" ]; then
    # IP - 13.229.235.46
    PROJECT_FOLDER="/public_html/brainlitz-web"
  fi

  if [ "$environment" = "production" ]; then
    # IP - 54.255.192.117
    PROJECT_FOLDER="/public_html/brainlitz-web-multi"
  fi

  cd $PROJECT_FOLDER
  echo "Make new folder"
  mkdir old_version

  echo "Move old files into 'old_version'"
  mv !(dist.zip|old_version) old_version/

  echo "Unzip"
  unzip dist.zip

  echo "Move files from dist folder"
  cd dist/ && mv {} ..;

  echo "Update file permissions"
  chown -R heinlinaung:development $PROJECT_FOLDER

  echo "REMOVE"
  rm -rf $PROJECT_FOLDER/dist.zip $PROJECT_FOLDER/dist/ $PROJECT_FOLDER/old_version/

cat << "EOF"
                      /^--^\     /^--^\     /^--^\
                      \____/     \____/     \____/
                     /      \   /      \   /      \
                    |        | |        | |        |
                     \__  __/   \__  __/   \__  __/             D O N E !
|^|^|^|^|^|^|^|^|^|^|^|^\ \^|^|^|^/ /^|^|^|^|^\ \^|^|^|^|^|^|^|^|^|^|^|^|
| | | | | | | | | | | | |\ \| | |/ /| | | | | | \ \ | | | | | | | | | | |
########################/ /######\ \###########/ /#######################
| | | | | | | | | | | | \/| | | | \/| | | | | |\/ | | | | | | | | | | | |
|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
EOF

}

main(){
  environment=$1
  deploy $environment
}

main $*;
