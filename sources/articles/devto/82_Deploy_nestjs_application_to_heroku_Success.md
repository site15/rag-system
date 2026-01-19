Deploy nestjs application to heroku (Success)

# Deploy nestjs application to heroku (Success)

Published: 2022-02-12T19:44:47.448Z
Tags: kaufmanbot, nx, heroku
[Original Article](https://dev.to/endykaufman/create-new-application-in-heroku-success-783)

**Description from API:**
Login in heroku   https://www.heroku.com/           Create new application in...

## 

Login in heroku

https://www.heroku.com/

--

## 

Create new application in heroku

https://dashboard.heroku.com/new-app

--

## 

Connect exists repository from github to created application

https://dashboard.heroku.com/apps/kaufman-bot/deploy/github

--

## 

Set branch name if not main

And click to Enable Automatic Deploys

After it click to deploy 

Wait...

--

## 

Check output of site

curl https://kaufman-bot.herokuapp.com/api

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ curl https://kaufman-bot.herokuapp.com/api
{"message":"Welcome to server!"}endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ 
```

Enter fullscreen mode

Exit fullscreen mode

It was easy!!!

![pic](https://media2.dev.to/dynamic/image/width=256,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png)

[
Create template
](/settings/response-templates)
Templates let you quickly answer FAQs or store snippets for re-use.

Submit
Preview
[Dismiss](/404.html)

Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink.

Hide child comments as well

Confirm

For further actions, you may consider blocking this person and/or reporting abuse