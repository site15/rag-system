NestJs-mod updated for work with NX v.19.5.3

# NestJs-mod updated for work with NX v.19.5.3

Published: 2024-07-29T07:52:26.181Z
Tags: nestjs, typescript, node, nestjsmod
[Original Article](https://dev.to/endykaufman/nestjs-mod-updated-for-work-with-nx-v1953-42p0)

**Description from API:**
New project      # Create empty nx project npx --yes create-nx-workspace@19.5.3...

## 

New project

```
# Create empty nx project
npx --yes create-nx-workspace@19.5.3 --name=project-name --preset=apps --interactive=false --ci=skip

# Go to created project
cd project-name

# Install all need main dev-dependencies
npm install --save-dev @nestjs-mod/schematics@latest

# Create NestJS-mod application
./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/app-name --name=app-name --projectNameAndRootFormat=as-provided --strict=true
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Update exists project:

```
npm run nx -- migrate latest
npm run nx -- migrate --run-migrations
npx -y npm-check-updates @nestjs-mod/* nestjs-mod @theunderscorer/* rucken @angular* *authorizerdev* *prisma* *redis* *nats* *minio* *pino* -u && npm i
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Links

- 
[https://github.com/nestjs-mod/nestjs-mod](https://github.com/nestjs-mod/nestjs-mod) - NestJS-mod collection of utilities for unifying NestJS applications and modules.

- 
[https://github.com/nestjs-mod/nestjs-mod-contrib](https://github.com/nestjs-mod/nestjs-mod-contrib) - Repository with various NestJS and NestJS-mod modules and wrapper modules

- 
[https://github.com/nestjs-mod/nestjs-mod-example](https://github.com/nestjs-mod/nestjs-mod-example) - Example generated via [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master%20/libs/schematics) applications

- 
[https://habr.com/ru/articles/788916](https://habr.com/ru/articles/788916) - Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS

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