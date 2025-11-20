# NestJS Template

Стартовый шаблон для быстрого запуска backend-проектов на NestJS с готовой инфраструктурой.

## ✨ Возможности

- **NestJS 11** с полной типизацией TypeScript
- **TypeORM** с поддержкой миграций
- Глобальная обработка ошибок с логированием
- Валидация данных через `class-validator`
- Swagger документация
- Безопасность (Helmet, CORS)
- Unit и E2E тесты
- ESLint + Prettier

## 🚀 Быстрый старт

### Установка

```bash
npm install
```

### Конфигурация

1. Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

2. Отредактируйте переменные окружения (как минимум данные БД)

### Запуск

```bash
# Development mode (с watch)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

### Тесты

```bash
# Unit тесты
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E тесты
npm run test:e2e
```

## 📁 Структура проекта

```
src/
├── config/              # Конфигурация приложения
├── core/                # Фильтры, сервисы, константы
├── shared/              # Общие утилиты, helpers, enums
├── modules/             # Feature модули (здесь ваш код)
├── database/            # Entities, repositories
├── app.module.ts
└── main.ts

migrations/             # TypeORM миграции
```

## 🗄️ Работа с БД

### Включение TypeORM

По умолчанию TypeORM выключен. Чтобы включить:

1. В [`src/core/core.module.ts`](./src/core/core.module.ts) раскомментируйте строку:

```typescript
imports: [
    CONFIG_MODULE_PARAMS,
    TYPEORM_MODULE_PARAMS  // ← раскомментируйте
],
```

2. Установите соответствующий драйвер:

```bash
# Для MySQL
npm install mysql2

# Для PostgreSQL
npm install pg

# Для SQLite
npm install better-sqlite3
```

3. В [`src/config/type-orm-module.params.ts`](./src/config/type-orm-module.params.ts) установите тип БД:

```typescript
useFactory: (configService: ConfigService) => ({
    type: 'mysql',  // ← укажите тип ('mysql', 'postgres', 'sqlite' и т.д.)
    // ... остальные параметры
```

4. В [`data-source.ts`](./data-source.ts) установите тип БД (для CLI миграций):

```typescript
export const AppDataSource = new DataSource({
    type: 'mysql', // ← укажите тип ('mysql', 'postgres', 'sqlite' и т.д.)
    // ... остальные параметры
})
```

### Создание миграции

```bash
npm run migration:generate src/migrations/CreateUsersTable
```

### Запуск миграций

```bash
npm run migration:run
```

### Откат последней миграции

```bash
npm run migration:revert
```

## 📚 Создание нового модуля

```bash
nest g module modules/users
nest g service modules/users
nest g controller modules/users
```

Структура модуля:

```
src/modules/users/
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities/
│   └── user.entity.ts
├── users.controller.ts
├── users.service.ts
└── users.module.ts
```

## 🔍 API Documentation

Swagger доступен на `http://localhost:3000/api/docs` в режиме development.

## 🛡️ Безопасность

- Helmet для HTTP headers
- CORS настроен через переменную окружения `CORS_ORIGINS`
- Валидация входных данных
- Глобальная обработка ошибок

## 🧪 Тестирование

Пример unit теста в [`src/app.controller.spec.ts`](./src/app.controller.spec.ts). Используется Jest + Supertest для E2E тестов.

## 📝 Лицензия

[MIT License](./LICENSE) - Copyright (c) 2025 ASBS3788
