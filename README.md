# vk-testing-api-server

## Подготовка к разработке

```bash
$ npm i
$ cp dev.env .env
$ docker-compose up -d
$ npm run migration:run
```

## CLI комманды

```bash
# Запуск приложения
$ npm run start

# Создание инициализационной миграции (удаляет существующие)
$ npm run migration:init

# Отображение разницы схемы приложения со схемой БД
$ npm run schema:diff

# Удаление БД
$ npm run schema:drop

# Синхронизация схем
$ npm run schema:sync

# Заполнение тестовыми данными
$ npm run schema:seed

# Создание пустой миграции с названием ${NAME}
$ npm run migration:create ${NAME}

# Создание миграции из разницы схемы приложения со схемой БД с названием ${NAME}
$ npm run migration:generate ${NAME}

# Отображение состояния миграций
$ npm run migration:show

# Запуск не примененных миграций
$ npm run migration:run

# Откат последних примененных миграций
$ npm run migration:revert
```

