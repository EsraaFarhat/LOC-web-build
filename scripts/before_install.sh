#!/bin/bash

# download node and npm
# curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
# source ~/.profile 
# nvm install node


#create our working directory if it doesnt exist
DIR="/home/ubuntu/loc-web-mob-front"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi


#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

cd /home/ubuntu/loc-web-mob-front

npm install
npm install pm2 -g