Deploy nestjs project to VPS with dokku

# Deploy nestjs project to VPS with dokku

Published: 2022-02-21T04:44:19.992Z
Tags: kaufmanbot, nestjs, dokku, vps
[Original Article](https://dev.to/endykaufman/deploy-nestjs-project-to-vps-with-dokku-31c5)

**Description from API:**
Buy VPS   Search VPS or VDS in google  https://www.google.com/search?q=vps+vds+server  I...

## 

Buy VPS

Search VPS or VDS in google

https://www.google.com/search?q=vps+vds+server

I choice this https://ztv.su/aff.php?aff=526 for Russia

Go to https://ztv.su/register.php?language=english

After login

Click to create new server

Open menu

Select SSD type of VPS

Select type of server

Select OS Ubuntu as OS for this server

Order confirmation after pay

Go to main dashboard https://ztv.su/clientarea.php

Wait 20 minuts...

--

## 

Tune remote access

Click to new your server

Copy ip and password

Open vscode and install ms-vscode-remote.vscode-remote-extensionpack

Add your local SSH key to new VPS from Windows PC

```
PS C:\Users\Admin> cat ~/.ssh/id_rsa.pub | ssh root@enter-server-ip-address "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"
The authenticity of host 'enter-server-ip-address (enter-server-ip-address)' can't be established.
ECDSA key fingerprint is SHA256:ShA-KeyY.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'enter-server-ip-address' (ECDSA) to the list of known hosts.
root@enter-server-ip-address's password:
```

Enter fullscreen mode

Exit fullscreen mode

Connect to remote server with vscode

Click to PLUS and add new connection to ssh server

Select Linux platform

After connect you can see remote console and ip of server in left buttom panel

--

## 

Tune server

Install all needed software

Update OS

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo apt autoremove
sudo apt install -f
```

Enter fullscreen mode

Exit fullscreen mode

Install dokku to server

wget https://raw.githubusercontent.com/dokku/dokku/v0.26.8/bootstrap.sh
sudo DOKKU_TAG=v0.26.8 bash bootstrap.sh

Wait...

--

## 

Create application and add deploy script from github

Create application

dokku apps:create kaufman-bot

```
root@vpsXXXX:~# dokku apps:create kaufman-bot
-----> Creating kaufman-bot...
```

Enter fullscreen mode

Exit fullscreen mode

Create ssh key for github in VPS

mkdir github
ssh-keygen -C "github" -f github/id_rsa

```
root@vpsXXXX:~# mkdir github
root@vpsXXXX:~# ssh-keygen -C "github" -f github/id_rsa
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in github/id_rsa
Your public key has been saved in github/id_rsa.pub
The key fingerprint is:
SHA256:HASH github
The key's randomart image is:
+---[RSA 3072]----+
|  .o*oo.         |
+----[SHA256]-----+
```

Enter fullscreen mode

Exit fullscreen mode

Add created public key to VPS authorized_keys

cat github/id_rsa.pub &gt;&gt; ~/.ssh/authorized_keys

Add created public key to dokku

dokku ssh-keys:add github ./github/id_rsa.pub

Show and copy private key
cat github/id_rsa

Create environment in github

Add created key to github

Add server address to secret env in github

Add ci config for github .github/workflows/develop.deploy.yml

```
name: 'deploy'

# yamllint disable-line rule:truthy
on:
push:
branches:
- feature/73

jobs:
deploy:
runs-on: ubuntu-latest
environment: dev
steps:
- name: Cloning repo
uses: actions/checkout@v2
with:
fetch-depth: 0

- name: Push to dokku
uses: dokku/github-action@master
with:
branch: 'feature/73'
git_remote_url: 'ssh://dokku@${{secrets.HOST}}:22/kaufman-bot'
ssh_private_key: ${{secrets.SSH_PRIVATE_KEY}}
```

Enter fullscreen mode

Exit fullscreen mode

Add environment values in dokku server

dokku config:set kaufman-bot TELEGRAM_BOT_TOKEN=........................

```
root@vpsXXXX:~# dokku config:set kaufman-bot TELEGRAM_BOT_TOKEN=........................
-----> Setting config vars
TELEGRAM_BOT_TOKEN:  ........................
-----> Restarting app kaufman-bot
!     App image (dokku/kaufman-bot:latest) not found
```

Enter fullscreen mode

Exit fullscreen mode

Run redeploy failed pipeline in github

After correct deploy, pipeline mark as green badge

Disable bot in heroku

Test from telegram

https://telegram.me/DevelopKaufmanBot

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