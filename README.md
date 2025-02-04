# Crypton - Приложение для Аутентификации

React-приложение, демонстрирующее реализацию аутентификации с использованием TypeScript, React Query, React Router и компонентов Shadcn/ui.

## Возможности

- 🔐 аутентификация
- 🌓 Переключение темной/светлой темы
- 🎨 UI с компонентами Shadcn/ui
- ⚡ производительность с React Query
- 🔄 Защищенные маршруты
- ⌨️ Поддержка TypeScript

## Технологии

- React 18
- TypeScript
- React Query
- React Router v7
- Shadcn/ui
- Tailwind CSS
- Vite
- Zod
- Axios

## Установка

### Требования

- Node.js 18+
- npm или yarn

### Инструкция по установке

1. Клонируйте репозиторий:

````bash
git clone https://github.com/Dclassicgenius/crypton.git
cd crypton

2. Установите зависимости:
```bash
npm install
# или
yarn install
````

3. Создайте файл `.env` в корневой директории проекта со следующим содержимым:

```bash
VITE_API_URL=your_api_url_here
```

4. Запустите приложение:

```bash
npm run dev
# или
yarn dev
```

## Структура проекта

```
src/
├── api/          # API сервисы и конфигурация axios
├── components/   # Переиспользуемые компоненты
├── context/      # React контекст провайдеры
├── hooks/        # Пользовательские хуки
├── layouts/      # Компоненты макета
├── lib/          # Вспомогательные функции
├── pages/        # Компоненты страниц
└── routes.tsx    # Определения маршрутов
```
