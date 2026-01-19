Add nestjs nx plugin, create server app and core lib

# Add nestjs nx plugin, create server app and core lib

Published: 2022-02-12T16:10:33.754Z
Tags: kaufmanbot, nx, nestjs
[Original Article](https://dev.to/endykaufman/add-nestjs-nx-plugin-create-server-app-and-core-lib-1l3o)

**Description from API:**
Install nestjs plugin to nx monorepo    npm install -D...

## 

Install nestjs plugin to nx monorepo

npm install -D @nrwl/nest

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm install -D @nrwl/nest

added 158 packages, and audited 623 packages in 18s

78 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Add nx script to package.json

```
"scripts": {
"nx": "nx",
"start": "nx serve",
"build": "nx build",
"test": "nx test"
},
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Create server

npm run -- nx g @nrwl/nest:app server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:app server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:app" "server"

UPDATE workspace.json
UPDATE nx.json
CREATE jest.config.js
CREATE jest.preset.js
UPDATE package.json
UPDATE .vscode/extensions.json
CREATE apps/server/src/app/.gitkeep
CREATE apps/server/src/assets/.gitkeep
CREATE apps/server/src/environments/environment.prod.ts
CREATE apps/server/src/environments/environment.ts
CREATE apps/server/src/main.ts
CREATE apps/server/tsconfig.app.json
CREATE apps/server/tsconfig.json
CREATE apps/server/project.json
CREATE .eslintrc.json
CREATE apps/server/.eslintrc.json
CREATE apps/server/jest.config.js
CREATE apps/server/tsconfig.spec.json
CREATE apps/server/src/app/app.controller.spec.ts
CREATE apps/server/src/app/app.controller.ts
CREATE apps/server/src/app/app.module.ts
CREATE apps/server/src/app/app.service.spec.ts
CREATE apps/server/src/app/app.service.ts

added 230 packages, removed 5 packages, changed 3 packages, and audited 848 packages in 43s

105 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities

up to date, audited 848 packages in 3s

105 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Create core library

npm run -- nx g @nrwl/nest:lib core/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib core/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "core/server"

CREATE libs/core/server/README.md
CREATE libs/core/server/.babelrc
CREATE libs/core/server/src/index.ts
CREATE libs/core/server/tsconfig.json
CREATE libs/core/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/core/server/project.json
UPDATE workspace.json
CREATE libs/core/server/.eslintrc.json
CREATE libs/core/server/jest.config.js
CREATE libs/core/server/tsconfig.spec.json
CREATE libs/core/server/src/lib/core-server.module.ts
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

Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink.

Hide child comments as well

Confirm

For further actions, you may consider blocking this person and/or reporting abuse