#!/bin/bash
forever stopall
forever start -o /home/ubuntu/bottenanna/out.log -e /home/ubuntu/bottenanna/err.log /home/ubuntu/bottenanna/index.js