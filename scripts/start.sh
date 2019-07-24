#!/bin/zsh
forever stopall
forever start -o /home/ec2-user/bottenanna/out.log -e /home/ec2-user/bottenanna/err.log /home/ec2-user/bottenanna/index.js