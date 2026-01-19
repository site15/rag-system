Add new dictionaries with translations to NestJS application using poedit.net

# Add new dictionaries with translations to NestJS application using poedit.net

Published: 2022-03-08T21:18:06.006Z
Tags: kaufmanbot, nestjs, translates, poedit
[Original Article](https://dev.to/endykaufman/add-new-dictionaries-with-translations-to-nestjs-application-using-poeditnet-3ei2)

**Description from API:**
Links   https://poedit.net/ - desktop editor for po dictionaries...

## 

Links

https://poedit.net/ - desktop editor for po dictionaries 

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://github.com/EndyKaufman/kaufman-bot -source code

--

## 

Prepare

Add required libraries if they were not previously installed

npm i --save-dev rucken
npm i --save class-validator-multi-lang

Update scripts in package.json if not changed before

```
"scripts": {
...
"rucken": "rucken",
"generate": "npm run rucken -- prepare --locales=en,ru && npm run lint:fix"
...
},
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Using Poedit to create dictionaries with translations

Start preparing and generating the necessary files

npm run generate

Install the translation software for your operating room from https://poedit.net/

I installed for Ubuntu operating system

Run the program and select catalog manager

Add folder with project

Set name of project

Add libs and apps folders

We see all possible translations

Click on the line with a red circle where not everything is translated

Select suggestion or enter you version of translate

Update all dictionaries

Run preparing and generating the necessary files

npm run generate

Test from telegram

Switch language in telegram

In the next post I will use nestjs-custom-injector...

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