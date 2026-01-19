Two updates to the rucken copy-paste utility

# Two updates to the rucken copy-paste utility

Published: 2024-03-29T07:58:48.363Z
Tags: rucken, copy, paste, console
[Original Article](https://dev.to/endykaufman/two-updates-to-the-rucken-copy-paste-utility-1enl)

**Description from API:**
1) Add support correct generate new files path names   Original files admin.ts    export...

# 

1) Add support correct generate new files path names

Original files
admin.ts

```
export class Admin {
id: string;
}
```

Enter fullscreen mode

Exit fullscreen mode

admin-repository.ts

```
import { Admin } from './admin';

export class AdminRepository {
admins: Admin[];
createOneAdmin() {
//null
}
updateOneAdmin() {
//null
}
deleteOneAdmin() {
//null
}
findManyAdmins() {
//null
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Command

```
npx -y rucken copy-paste --find=admin --replace=my-company --path=./libs/feature
```

Enter fullscreen mode

Exit fullscreen mode

New files:
my-company.ts

```
export class MyCompany {
id: string;
}
```

Enter fullscreen mode

Exit fullscreen mode

my-company-repository.ts

```
import { MyCompany } from './my-company';

export class MyCompanyRepository {
myCompanies: MyCompany[];
createOneMyCompany() {
//null
}
updateOneMyCompany() {
//null
}
deleteOneMyCompany() {
//null
}
findManyMyCompanies() {
//null
}
}
```

Enter fullscreen mode

Exit fullscreen mode

# 

2) Add support correct replace long text with two or more words, when word for find include in replace options

Original files
new.ts

```
export class New {
id: string;
}
```

Enter fullscreen mode

Exit fullscreen mode

new-repository.ts

```
import { New } from './new';

export class NewRepository {
news: New[];
createOneNew() {
//null
}
updateOneNew() {
//null
}
deleteOneNew() {
//null
}
findManyNews() {
//null
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Command

```
npx -y rucken copy-paste --find=new --replace=new-user --path=./libs/feature
```

Enter fullscreen mode

Exit fullscreen mode

New files:
new-user.ts

```
export class NewUser {
id: string;
}
```

Enter fullscreen mode

Exit fullscreen mode

new-user-repository.ts

```
import { NewUser } from './new-user';

export class NewUserRepository {
newUsers: NewUser[];
createOneNewUser() {
//null
}
updateOneNewUser() {
//null
}
deleteOneNewUser() {
//null
}
findManyNewUsers() {
//null
}
}
```

Enter fullscreen mode

Exit fullscreen mode

https://www.npmjs.com/package/rucken

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