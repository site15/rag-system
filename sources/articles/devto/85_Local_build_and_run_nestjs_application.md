Local build and run nestjs application

# Local build and run nestjs application

Published: 2022-02-12T18:07:17.773Z
Tags: kaufmanbot, nx, nestjs, deploy
[Original Article](https://dev.to/endykaufman/local-build-and-run-nestjs-application-56m4)

**Description from API:**
Update nx   The current version of nx contains bugs, need update it   npx nx migrate...

## 

Update nx

The current version of nx contains bugs, need update it

npx nx migrate @nrwl/workspace

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npx nx migrate @nrwl/workspace
Fetching meta data about packages.
It may take a few minutes.
Fetching @nrwl/workspace@latest
Fetching prettier@^2.5.1
Fetching @nrwl/cli@13.8.1
Fetching @nrwl/eslint-plugin-nx@13.8.1
Fetching @nrwl/jest@13.8.1
Fetching @nrwl/linter@13.8.1
Fetching @nrwl/nest@13.8.1
Fetching @nrwl/node@13.8.1
Fetching @nrwl/tao@13.8.1
Fetching @nrwl/workspace@13.8.1
Fetching prettier@2.5.1

>  NX  The migrate command has run successfully.

- package.json has been updated
- migrations.json has been generated

>  NX  Next steps:

- Make sure package.json changes make sense and then run 'npm install'
- Run 'nx migrate --run-migrations'
- To learn more go to https://nx.dev/using-nx/updating-nx
- You may run "nx connect-to-nx-cloud" to get faster builds, GitHub integration, and more. Check out https://nx.app
```

Enter fullscreen mode

Exit fullscreen mode

npm i

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i

added 1 package, removed 103 packages, changed 7 packages, and audited 746 packages in 4s

76 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

npm run nx -- migrate --run-migrations

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- migrate --run-migrations

> kaufman-bot@0.0.0 nx
> nx "migrate" "--run-migrations"

>  NX  Running 'npm install' to make sure necessary packages are installed

up to date, audited 746 packages in 3s

76 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities

>  NX  Running migrations from 'migrations.json'

Running migration set-default-base-if-not-set
Successfully finished set-default-base-if-not-set
---------------------------------------------------------
Running migration 13-0-0-config-locations
Successfully finished 13-0-0-config-locations
---------------------------------------------------------
Running migration set-parallel-default
Successfully finished set-parallel-default
---------------------------------------------------------
Running migration 13-3-0-tsc-location
Successfully finished 13-3-0-tsc-location
---------------------------------------------------------
Running migration 13-6-0-remove-old-task-runner-options
Successfully finished 13-6-0-remove-old-task-runner-options
---------------------------------------------------------

>  NX  Successfully finished running migrations from 'migrations.json'
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Build sources

npm run nx -- build server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- build server

> kaufman-bot@0.0.0 nx
> nx "build" "server"

> nx run server:build

chunk (runtime: main) main.js (main) 2.76 KiB [entry] [rendered]
webpack compiled successfully (ba0f882f8a8c0d5f)

———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  NX   Successfully ran target build for project server (4s)
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Start built application

node ./dist/apps/server/main.js

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ node ./dist/apps/server/main.js
[Nest] 1439017  - 02/12/2022, 9:14:11 PM     LOG [NestFactory] Starting Nest application...
[Nest] 1439017  - 02/12/2022, 9:14:11 PM     LOG [InstanceLoader] AppModule dependencies initialized +31ms
[Nest] 1439017  - 02/12/2022, 9:14:11 PM     LOG [RoutesResolver] AppController {/api}: +6ms
[Nest] 1439017  - 02/12/2022, 9:14:11 PM     LOG [RouterExplorer] Mapped {/api, GET} route +3ms
[Nest] 1439017  - 02/12/2022, 9:14:11 PM     LOG [NestApplication] Nest application successfully started +3ms
[Nest] 1439017  - 02/12/2022, 9:14:11 PM     LOG 🚀 Application is running on: http://localhost:3333/api
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Check applications

curl http://localhost:3333/api

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ curl http://localhost:3333/api
{"message":"Welcome to server!"}endy@endy-virtual-machine:~/Projects/current/kaufman-bot$
```

Enter fullscreen mode

Exit fullscreen mode

![pic](https://media2.dev.to/dynamic/image/width=256,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png)

[
Create template
](/settings/response-templates)
Templates let you quickly answer FAQs or store snippets for re-use.

Submit
Preview
[Dismiss](/404.html)

Collapse

Expand

[&nbsp;](undefined)

[

](https://dev.to/sixtyfivekolev)

[

Petar Kolev

](https://dev.to/sixtyfivekolev)

Petar Kolev

[

Petar Kolev

](/sixtyfivekolev)

Follow

- 

Joined

Jul 21, 2022

•

[

May 11 '23

](https://dev.to/endykaufman/local-build-and-run-nestjs-application-56m4#comment-26hn3)

Dropdown menu

- [Copy link](https://dev.to/endykaufman/local-build-and-run-nestjs-application-56m4#comment-26hn3)

- 

- 

Hide

- 

- 

- 

But using NestJS like this means every time we make a change in our code we need to stop the server, build the app and then start the server again, right?
Isn't there a way to configure some listener or something to do this job for us?

Collapse

Expand

[&nbsp;](undefined)

[

](https://dev.to/endykaufman)

[

ILshat Khamitov

](https://dev.to/endykaufman)

ILshat Khamitov

[

ILshat Khamitov

](/endykaufman)

Follow

Principal Engineer · Backend Architecture · NestJS

- 

Email

[admin@site15.ru](mailto:admin@site15.ru)

- 

Location

Ufa, Russia

- 

Education

Tomsk State University of Control Systems and Radioelectronics

- 

Work

Software Developer

- 

Joined

Jul 1, 2019

•

[

May 12 '23

](https://dev.to/endykaufman/local-build-and-run-nestjs-application-56m4#comment-26ihd)

Dropdown menu

- [Copy link](https://dev.to/endykaufman/local-build-and-run-nestjs-application-56m4#comment-26ihd)

- 

- 

Hide

- 

- 

- 

Hello! This post is from a cycle of posts and this post describes an example of exactly the build and launch

Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink.

Hide child comments as well

Confirm

For further actions, you may consider blocking this person and/or reporting abuse