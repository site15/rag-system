Handling nodejs errors in a NestJS application using a telegram bot as an example

# Handling nodejs errors in a NestJS application using a telegram bot as an example

Published: 2022-02-26T08:04:46.793Z
Tags: kaufmanbot, node, nestjs, errors
[Original Article](https://dev.to/endykaufman/handling-nodejs-errors-in-a-nestjs-application-using-a-telegram-bot-as-an-example-4akg)

**Description from API:**
Update file apps/server/src/main.ts    import { Logger } from '@nestjs/common';  const logger = new...

Update file apps/server/src/main.ts

```
import { Logger } from '@nestjs/common';

const logger = new Logger('Application');

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

import { NestFactory } from '@nestjs/core';
import env from 'env-var';
import { AppModule } from './app/app.module';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

const globalPrefix = 'api';
app.setGlobalPrefix(globalPrefix);

const port = env.get('PORT').default(3333).asPortNumber();
await app.listen(port);
logger.log(
`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
);
}

try {
bootstrap().catch((err) => {
logger.error(err, err.stack);
});
} catch (err) {
logger.error(err, err.stack);
}

function exitHandler(options, exitCode) {
if (options.cleanup) {
logger.log('exit: clean');
}
if (exitCode || exitCode === 0) {
if (exitCode !== 0) {
logger.error(exitCode, exitCode.stack);
} else {
logger.log(`exit: code - ${exitCode}`);
}
}
if (options.exit) {
process.exit();
}
}

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