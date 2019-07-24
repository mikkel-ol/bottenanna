#!/bin/zsh
forever stopall
forever start /home/ec2-user/bottenanna/index.js -e /home/ec2-user/bottenanna/err.log -o /home/ec2-user/bottenanna/out.log