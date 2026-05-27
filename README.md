# 2nd-hand Market

A responsive single-page eCommerce application built with React, React Router, Redux Toolkit, RTK Query, Webpack, and native CSS. The project is based on an eCommerce-style Figma design and uses DummyJSON for authentication, product listing, product details, categories, search, and simulated admin CRUD flows.[1][2]

## Functionality

The application is planned as a marketplace/admin hybrid with a public catalog and protected admin views.[1][2]

Planned core features:
- User login with DummyJSON auth.[1]
- Product catalog page with filters, search, sorting, and grid/list presentation.[2]
- Product details page based on a selected catalog item.[2]
- Protected admin inventory page with table view for products.[2]
- Add new product form using DummyJSON simulated create endpoint.[2]
- Responsive native CSS layout for mobile, tablet, and desktop.

## Tech Stack

### Core
- React
- React Router
- Redux Toolkit
- RTK Query
- Webpack 5
- Babel
- Native CSS

### API
- [DummyJSON](https://dummyjson.com/) for auth and product data.[3][2]

### Tooling
- ESLint
- Prettier

## Planned Routes

| Route | Purpose |
|------|---------|
| `/login` | User authentication |
| `/products` | Product catalog page |
| `/products/:productId` | Product details page |
| `/admin/products` | Protected admin products table |
| `/admin/products/new` | Protected add product form |

## Project Structure

```text
src/
  app/
    providers.jsx
    router.jsx
    store.js
  api/
    dummyApi.js
  features/
    auth/
      authSlice.js
      ProtectedRoute.jsx
    products/
      pages/
      components/
    ui/
      uiSlice.js
  layouts/
    MainLayout.jsx
    AdminLayout.jsx
  pages/
    LoginPage.jsx
    NotFoundPage.jsx
  shared/
    components/
    styles/
  App.jsx
  index.jsx
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd 2nd-hand-market
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The development server runs on:
- `http://localhost:3000`

### 4. Build for production

```bash
npm run build
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Starts webpack dev server |
| `npm run build` | Creates production build |
| `npm run lint` | Runs ESLint |
| `npm run lint:fix` | Fixes lint issues where possible |
| `npm run format` | Formats the project with Prettier |

## DummyJSON Notes

This project uses DummyJSON as a fake REST API. Product data, categories, product details, and authentication come from DummyJSON endpoints, while create, update, and delete operations are simulated rather than permanently persisted.[1][2]

Because some Figma content does not map one-to-one to DummyJSON fields, certain UI labels, statuses, and filter controls may be adapted while keeping the visual design as close as possible to the original layout.[2]

## Design Notes

The chosen implementation direction is the eCommerce design option. The project aims to stay visually close to the selected layout, especially for:
- catalog grid and list presentation,
- admin product table,
- add/edit form layout,
- spacing, colors, and component structure.

## Deployment

Planned deployment target:
- Vercel or Netlify

Live demo link will be added here after deployment.

## Repository Notes

Recommended commit style:
- `feat:` for new functionality
- `fix:` for bug fixes
- `refactor:` for code cleanup
- `docs:` for README and documentation updates
- `style:` for formatting-only changes

## Status

This repository is currently in initial setup stage. The architecture, route plan, Redux store, RTK Query service, and design-to-data mapping have been defined, and implementation starts from the project foundation.