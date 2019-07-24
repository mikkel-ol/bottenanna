#!bin/bash

# Install node.js
sudo apt-get install python-software-properties -y
sudo apt-add-repository ppa:chris-lea/node.js -y
sudo apt-get update
sudo apt-get install nodejs -y

# Install nodemon
# sudo npm install nodemon -g

# Install forever module 
sudo npm install forever -g