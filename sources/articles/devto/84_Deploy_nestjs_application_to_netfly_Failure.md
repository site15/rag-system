Deploy nestjs application to netfly (Failure)

# Deploy nestjs application to netfly (Failure)

Published: 2022-02-12T18:13:45.236Z
Tags: kaufmanbot, nx, netlify
[Original Article](https://dev.to/endykaufman/deploy-nestjs-application-to-netfly-failure-3nab)

**Description from API:**
Login in netlify with github account   https://www.netlify.com/  Import an existing project...

## 

Login in netlify with github account

https://www.netlify.com/

Import an existing project from a Git repository

Set config options

Base directory
EMPTY

Build command
npm run nx -- build server

Publish directory
/dist/apps/server/

And click Deploy site

--

## 

Check deployed files

Netlife created for store static files or run server less functions, current deploy is static nodejs files :)

curl https://inspiring-wing-dfa35d.netlify.app/main.js

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ curl https://inspiring-wing-dfa35d.netlify.app/main.js
/******/ (() => { // webpackBootstrap
/******/        "use strict";
/******/        var __webpack_modules__ = ({

/***/ "./apps/server/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/server/src/app/app.service.ts");
let AppController = class AppController {
constructor(appService) {
this.appService = appService;
}
getData() {
return this.appService.getData();
}
};
tslib_1.__decorate([
common_1.Get(),
tslib_1.__metadata("design:type", Function),
tslib_1.__metadata("design:paramtypes", []),
tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
common_1.Controller(),
tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;

/***/ }),

/***/ "./apps/server/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./apps/server/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/server/src/app/app.service.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
common_1.Module({
imports: [],
controllers: [app_controller_1.AppController],
providers: [app_service_1.AppService],
})
], AppModule);
exports.AppModule = AppModule;

/***/ }),

/***/ "./apps/server/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
getData() {
return { message: 'Welcome to server!' };
}
};
AppService = tslib_1.__decorate([
common_1.Injectable()
], AppService);
exports.AppService = AppService;

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/        });
/************************************************************************/
/******/        // The module cache
/******/        var __webpack_module_cache__ = {};
/******/
/******/        // The require function
/******/        function __webpack_require__(moduleId) {
/******/                // Check if module is in cache
/******/                var cachedModule = __webpack_module_cache__[moduleId];
/******/                if (cachedModule !== undefined) {
/******/                        return cachedModule.exports;
/******/                }
/******/                // Create a new module (and put it into the cache)
/******/                var module = __webpack_module_cache__[moduleId] = {
/******/                        // no module.id needed
/******/                        // no module.loaded needed
/******/                        exports: {}
/******/                };
/******/
/******/                // Execute the module function
/******/                __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/                // Return the exports of the module
/******/                return module.exports;
/******/        }
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
* This is not a production server yet!
* This is only a minimal backend to get started.
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/server/src/app/app.module.ts");
function bootstrap() {
return tslib_1.__awaiter(this, void 0, void 0, function* () {
const app = yield core_1.NestFactory.create(app_module_1.AppModule);
const globalPrefix = 'api';
app.setGlobalPrefix(globalPrefix);
const port = process.env.PORT || 3333;
yield app.listen(port);
common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
});
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map
```

Enter fullscreen mode

Exit fullscreen mode

It was the wrong way, I'll choose another, sorry guys :)

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