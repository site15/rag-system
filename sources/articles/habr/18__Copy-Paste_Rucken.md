Добавил возможность замены переменных окружения при запуске команды «Copy-Paste» в утилите «Rucken»

# Добавил возможность замены переменных окружения при запуске команды «Copy-Paste» в утилите «Rucken»

Дата публикации: Thu, 12 Sep 2024 08:11:49 GMT
[Оригинал статьи](https://habr.com/ru/articles/842722/?utm_campaign=842722&amp;utm_source=habrahabr&amp;utm_medium=rss)

**Описание из RSS:**
![undefined](https://habrastorage.org/getpro/habr/upload_files/0b1/a50/569/0b1a505693ff8ce442757d85ab0feeeb.png)Я часто пользуюсь своей утилитой "rucken" по копированию файлов и директорий с кодом, но для генерации конфигураций деплоя по шаблонам я использовал баш скрипты, в которых помимо различных условий происходит копирование через команду "cp" и замена переменных через команду "sed". На днях подумал и решил что часть с копированием и заменой можно убрать в утилиту "rucken" и тем самым оставить в баш скриптах только логики с условиями.

[Читать далее](https://habr.com/ru/articles/842722/?utm_campaign=842722&amp;utm_source=habrahabr&amp;utm_medium=rss#habracut)

[](/ru/users/kaufmanendy/)[kaufmanendy](/ru/users/kaufmanendy/)12  сен  2024 в 08:11# Добавил возможность замены переменных окружения при запуске команды «Copy-Paste» в утилите «Rucken»

Время на прочтение2 минОхват и читатели172[Программирование * ](/ru/hubs/programming/)[PostgreSQL * ](/ru/hubs/postgresql/)[Nx * ](/ru/hubs/nx/)### Об утилите:

Очень давно я параллельно писал 4 проекта и замучался переносить код между проектами и создал в Github организацию с общим кодом (https://github.com/rucken), куда вынес все общее из разных проектов, но помимо кода были также различные девопс скрипты.

Для скриптов я написал небольшую утилиту (https://github.com/rucken/rucken) и вынес в нее общие между проектами девопс скрипты и оформил их отдельными командами.

В данный момент там есть такие команды:

- make-ts-list - создание списков ts-файлов для всех nx - библиотек;

- version-updater - обновление версий зависимостей использующихся в nx - библиотеках до версии этих зависимостей в рутовом package.json;

- translate - извлечение перевода из исходного кода с последующим формированием словарей для перевода ("pot", "po");

- postgres - создание баз данных на сервере баз данных Postgres;

- env-replacer - рекурсивная замена вложенных значений переменных окружения в переданной переменной;

- copy-paste - копирование и вставка файлов и директорий с параллельной заменой одной строки, при этом происходит замена не только по полному совпадению, но и в различных вариантах регистра, а также происходит замена и множественного варианта этого слова.

Все команды утилиты использовались в личных и рабочих проектах, а для упрощения процесса подключения, утилита публикуется в npm - регистр.

Сама организация и общий код между проектами уже кучу лет не развивается, так как нет на него времени, а вот консольная утилита периодически расширяется.

В этом посте я хотел описать новое небольшое изменение и по пути описал суть проекта.

--

### Новые изменения:

Я часто пользуюсь своей утилитой по копированию файлов и директорий с кодом, но для генерации конфигураций деплоя по шаблонам я использовал баш скрипты, в которых помимо различных условий происходит копирование через команду "cp" и замена переменных через команду "sed".

На днях подумал и решил что часть с копированием и заменой можно убрать в утилиту "rucken" и тем самым оставить в баш скриптах только логики с условиями.

В некоторых моих проектах логик вообще нет, только копирование с заменой переменных окружения, для таких проектов это прям очень нужная штука.

Вот и добавил поддержку замены переменных окружения, ниже будет пример использования утилиты.

Пример использования:

- Создаем папку cat-dog

```
mkdir cat-dog
```
- Создаем текстовый файл cat-dog/cat_dog.txt

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
- Запускаем утилиту

```
export START_ENV_VARIABLE="examples:"
npx rucken@latest copy-paste --find=cat-dog --replace=human-ufo --path=./cat-dog --replace-envs=true
```
- Проверяем содержимое нового файла

```
cat ./human-ufo/human_ufo.txt
```
Результат:

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
P.S. Разрабатывается и проверяется только на Ubuntu

--

### Ссылки:

https://www.npmjs.com/package/rucken - опубликованная утилита https://github.com/rucken/rucken - код проекта https://github.com/rucken/rucken/blob/master/libs/rucken/src/lib/copy-paste/copy-paste.service.ts - код команды в которой произошли изменения

Теги:- [console](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[console])
- [tools](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[tools])
- [shell](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[shell])
- [rucken](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[rucken])
- [copy-paste](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[copy-paste])
- [generators](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[generators])
- [postgres](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[postgres])

Хабы:- [Программирование](/ru/hubs/programming/)
- [PostgreSQL](/ru/hubs/postgresql/)
- [Nx](/ru/hubs/nx/)