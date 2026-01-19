Recursive replace input value with process environment values in console

# Recursive replace input value with process environment values in console

Published: 2022-03-27T09:18:02.274Z
Tags: rucken, environment, replace, shell
[Original Article](https://dev.to/endykaufman/recursive-replace-input-value-with-process-environment-values-in-console-2mcm)

**Description from API:**
Often you need to change part of the value of an environment variable to another variable  I made a...

Often you need to change part of the value of an environment variable to another variable

I made a utility for such a replacement

--

## 

Links

https://www.npmjs.com/package/rucken - npm package

https://github.com/rucken/rucken - source code

https://github.com/rucken/rucken/blob/develop/libs/rucken/tests/e2e/env-replacer.spec.ts - e2e test

--

## 

Example of usage

Create env file
example.env

```
VAR1=var1${VAR2}
VAR2=var2$var3
var3=VAR3$NO_REPLACE
```

Enter fullscreen mode

Exit fullscreen mode

Load file to current environment

export $(cat ./example.env)

We derive the variable VAR1 in the usual way

echo $VAR1

Result

```
var1${VAR2}
```

Enter fullscreen mode

Exit fullscreen mode

And now we will display the variable through the utility

echo $(npx -y rucken env-replacer $VAR1)

Result

```
var1var2VAR3$NO_REPLACE
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