#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ubuntu/loc-web-mob-front


export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)



#navigate into our working directory where we have all our github files
cd /home/ubuntu/loc-web-mob-front

npm install pm2 -g
npm install -g serve

npm run build 

pm2 delete all

pm2 serve build 3000 --spa


cd ..
cd /home/ubuntu/loc-web-mob

pm2 start index.js




