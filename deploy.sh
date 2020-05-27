#!/bin/sh -x

heroku login

git remote |grep -e \s*heroku$

if [ "$?" != "0" ]
then
  heroku create --buildpack https://github.com/mikolaj6r/heroku-buildpack-deno.git
fi

git push heroku master

