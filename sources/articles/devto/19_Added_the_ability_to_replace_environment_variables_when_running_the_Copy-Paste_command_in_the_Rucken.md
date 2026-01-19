Added the ability to replace environment variables when running the "Copy-Paste" command in the "Rucken" utility

# Added the ability to replace environment variables when running the "Copy-Paste" command in the "Rucken" utility

Published: 2024-09-12T10:38:56.972Z
Tags: console, tools, shell, rucken
[Original Article](https://dev.to/endykaufman/added-the-ability-to-replace-environment-variables-when-running-the-copy-paste-command-in-the-rucken-utility-2mcj)

**Description from API:**
About the utility:   A long time ago, I wrote 4 projects in parallel and got tired of...

## 

About the utility:

A long time ago, I wrote 4 projects in parallel and got tired of transferring code between projects and created an organization with shared code in Github (https://github.com/rucken ), where he took out everything in common from different projects, but in addition to the code there were also various devops scripts.

I wrote a small utility for scripts (https://github.com/rucken/rucken ) and brought out the devops scripts common between the projects and designed them in separate teams.

At the moment there are such commands:

- make-ts-list - create lists of ts files for all nx libraries;

- version-updater - updating versions of dependencies used in nx libraries to the version of these dependencies in the root package.json;

- translate - extract the translation from the source text, followed by the formation of dictionaries for translation ("pot", "po");

- postgres - creating databases on the Postgres database server;

- env-replacer - recursive replacement of nested environment variable values in the passed variable;

- copy-paste - copying and pasting files and directories with parallel replacement of one line, while replacing not only by complete coincidence, but also in different case variants, as well as replacing the plural version of this word.

All the commands of the utility were used in personal and work projects, and to simplify the connection process, the utility is published in the npm register.

The organization itself and the common code between projects have not been developed for a lot of years, since there is no time for it, but the console utility is periodically expanded.

In this post, I wanted to describe a new small change and described the essence of the project along the way.

--

## 

New changes:

I often use my "rucken" utility to copy files and code directories, but to generate deployment configurations based on templates, I used bash scripts, in which, in addition to various conditions, copying occurs via the "cp" command and replacing variables via the "sed" command.

The other day I thought and decided that the part with copying and replacing can be removed in the "rucken" utility and thus leave only logic with conditions in the bash scripts.

In some of my projects, there is no logic at all, only copying and replacing environment variables, for such projects this is a very necessary thing.

So I added a support for replacing environment variables, below will be an example of using the utility.

Usage example:

- Create the folder *cat-dog*

```
mkdir cat-dog
```

Enter fullscreen mode

Exit fullscreen mode

- Create a text file *cat-dog/cat_dog.txt*

```
echo "%START_ENV_VARIABLE%
catDog
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

- Launch the utility

```
export START_ENV_VARIABLE="examples:"
npx rucken@latest copy-paste --find=cat-dog --replace=human-ufo --path=./cat-dog --replace-envs=true
```

Enter fullscreen mode

Exit fullscreen mode

- Check the contents of the new file

```
cat ./human-ufo/human_ufo.txt
```

Enter fullscreen mode

Exit fullscreen mode

Result:

```
$ cat ./human-ufo/human_ufo.txt
examples:
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

P.S. It is developed and tested only on Ubuntu

--

## 

Links:

https://www.npmjs.com/package/rucken - published utility
https://github.com/rucken/rucken - project code
https://github.com/rucken/rucken/blob/master/libs/rucken/src/lib/copy-paste/copy-paste.service.ts - the code of the command in which the changes occurred

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