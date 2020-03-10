#!/usr/bin/env bash

deploy(){
  if [ "$environment" = "devops" ]; then
    PROJECT_FOLDER="/public_html/brainlitz-web-multi"
  fi

  if [ "$environment" = "dev" ]; then
    # on STAGING server
    PROJECT_FOLDER="/public_html/dev-brainlitz-web"
  fi

  if [ "$environment" = "staging" ]; then
    # IP - 13.229.235.46
    PROJECT_FOLDER="/public_html/brainlitz-web"
  fi

  if [ "$environment" = "production" ]; then
    # IP - 54.255.192.117
    PROJECT_FOLDER="/public_html/brainlitz-web-multi"
  fi

  if [ -d "$PROJECT_FOLDER" ]; then
      cd $PROJECT_FOLDER
      echo "Remove and Create new folder"
      rm -rf $PROJECT_FOLDER/old_version && mkdir $PROJECT_FOLDER/old_version

      echo "Move old files into 'old_version'"
      # mv !\(dist.zip|old_version|brainlitz_web_deploy.sh\) $PROJECT_FOLDER/old_version/
      mv !\('dist.zip'|'old_version'|'brainlitz_web_deploy.sh'\) $PROJECT_FOLDER/old_version/

      echo "Unzipping ..."
      unzip $PROJECT_FOLDER/dist.zip -d $PROJECT_FOLDER/

      echo "UPDATING file permissions ..."
      chgrp -R development $PROJECT_FOLDER

      echo "REMOVING unnecessary folder & files ..."
      rm -rf $PROJECT_FOLDER/dist.zip $PROJECT_FOLDER/brainlitz_web_deploy.sh $PROJECT_FOLDER/old_version/

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
  else
    echo 'Project folder DOES NOT EXIST -> '$PROJECT_FOLDER
  fi
}

main(){
  environment=$1
  deploy $environment
}

main $*;
