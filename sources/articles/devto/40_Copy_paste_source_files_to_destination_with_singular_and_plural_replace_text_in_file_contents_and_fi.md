Copy paste source files to destination with singular and plural replace text in file contents and file paths

# Copy paste source files to destination with singular and plural replace text in file contents and file paths

Published: 2022-10-16T13:03:28.996Z
Tags: rucken, copy, paste, shell
[Original Article](https://dev.to/endykaufman/copy-paste-source-files-to-destination-with-singular-and-plural-replace-text-in-file-contents-and-file-paths-1ncp)

**Description from API:**
I often have to copy a large number of files and folders with the base code and replace various lines...

I often have to copy a large number of files and folders with the base code and replace various lines inside the files, as well as in the names of files and folders, and this takes a lot of time 😢.

To solve this problem, I wrote a utility that can do it for me 😎.

--

## 

Links

https://www.npmjs.com/package/rucken - npm package

https://github.com/rucken/rucken/blob/develop/libs/rucken/src/lib/copy-paste/copy-paste.service.ts - source code

https://www.npmjs.com/package/case-anything - main library used

--

## 

Example of usage

1) Create folder cat-dog

```
mkdir cat-dog
```

Enter fullscreen mode

Exit fullscreen mode

2) Create txt file cat-dog/cat_dog.txt

```
echo "catDog
CatDog
cat-dog
cat_dog
CAT_DOG
Cat-Dog
Cat_Dog
CAT-DOG
cat Dog
Cat Dog
cat dog
CAT DOG
catDogs
CatDogs
cat-dogs
cat_dogs
CAT_DOGS
Cat-Dogs
Cat_Dogs
CAT-DOGS
cat Dogs
Cat Dogs
cat dogs
CAT DOGS" > cat-dog/cat_dog.txt
```

Enter fullscreen mode

Exit fullscreen mode

3) Run the utility

```
npx rucken copy-paste --find=cat-dog --replace=human-ufo --path=./cat-dog
```

Enter fullscreen mode

Exit fullscreen mode

4) Check new file

```
echo ./human-ufo/human_ufo.txt
```

Enter fullscreen mode

Exit fullscreen mode

Result

```
humanUfo
HumanUfo
human-ufo
human_ufo
HUMAN_UFO
Human-Ufo
Human_Ufo
HUMAN-UFO
human Ufo
Human Ufo
human ufo
HUMAN UFO
humanUfos
HumanUfos
human-ufos
human_ufos
HUMAN_UFOS
Human-Ufos
Human_Ufos
HUMAN-UFOS
human Ufos
Human Ufos
human ufos
HUMAN UFOS

```

Enter fullscreen mode

Exit fullscreen mode

--

## 

If you can’t run it through npx, then you need to install the utility globally

Install

```
npm i -g rucken
```

Enter fullscreen mode

Exit fullscreen mode

Usage

```
rucken copy-paste --find=cat-dog --replace=human-ufo --path=./cat-dog
```

Enter fullscreen mode

Exit fullscreen mode

I hope this utility will help developers save time 😉

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