Update to Prisma 5.18.0 in typegraphql-prisma-nestjs

# Update to Prisma 5.18.0 in typegraphql-prisma-nestjs

Published: 2024-08-08T10:41:36.702Z
Tags: prisma, nestjs, crud, typegraphql
[Original Article](https://dev.to/endykaufman/update-to-prisma-5180-in-typegraphql-prisma-nestjs-27co)

**Description from API:**
Update to Prisma 5.18.0 in typegraphql-prisma-nestjs  Synced with latest...

Update to Prisma 5.18.0 in typegraphql-prisma-nestjs

Synced with latest https://github.com/MichalLytek/typegraphql-prisma/releases/tag/v0.28.0

```
Changelog
The Prisma dependency version has been bumped to v5.18.0 💪

Because of Prisma v5 recent changes, the ...OrderByWithRelationAndSearchRelevanceInput has been replaced by standard ...OrderByWithRelationInput. You can expect breaking changes in the generated schema because of that 🚨

The new createManyAndReturn Prisma operation is fully supported in this release 🎉

The supported Node.js version has been bumped to v20.11.1.
```

Enter fullscreen mode

Exit fullscreen mode

Updates to generated code in example:
https://github.com/EndyKaufman/typegraphql-prisma-nestjs-example/commit/29523859e0efb585fb7679bb519d588a2a09a4f9

Package:
https://www.npmjs.com/package/typegraphql-prisma-nestjs

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