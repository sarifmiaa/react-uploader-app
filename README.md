
# React Uploader App

A simple file uploader built with **React**, **Vite**, **TypeScript**, and styled using **Shopify Polaris**.

---

## 📦 Install dependencies

```bash
npm install
```

---

## 🚀 Available Scripts

### Start Development Server

```bash
npm run dev
```

- Runs on: [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

## ⚙ Tech Stack

- React 18
- Vite
- TypeScript
- Shopify Polaris (v13)
- ESLint

---

## 🎨 Shopify Polaris UI Components

This app uses [Shopify Polaris](https://polaris.shopify.com/components) for the UI:

```tsx
import { Card, Button } from '@shopify/polaris';
```

You can explore Polaris components here:  
https://polaris.shopify.com/components

---

## 🌐 Environment Variables

Create a `.env` file in the root:

```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

Use inside code:

```ts
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## 📂 Project Structure

```bash
src/
  components/     # Reusable UI components
  pages/          # Main pages
  hooks/          # Custom React hooks
  utils/          # Utility functions
public/           # Static assets
dist/             # Production build output
vite.config.ts    # Vite configuration
tsconfig.json     # TypeScript configuration
.eslintrc         # ESLint configuration
package.json      # Project metadata & scripts
```

---

## 🔗 Useful Links

- [Polaris Components](https://polaris.shopify.com/components)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)