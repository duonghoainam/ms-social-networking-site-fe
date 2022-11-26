# MS social networking site

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About project
### Build with
* React

### Installation

_Following below step to install._

1. Switch node version
   ```sh
   nvm use
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

5. Start local app
   ```sh
   npm run start
   ```

<!-- Folder structure -->
## Folder structure
```
├── public (public assets)
├── src
│   ├── components (common components)
│   │   ├── **/*.css (Additional style)
|   |   ├── hook/*.ts (Custom hook to handle logic for that component (may not can be reuse))
|   |   ├── *.ts (Component only contain UI state)
|   |   ├── index.ts
│   ├── api
│   │   ├── apiModel (related to one model)
|   |   |   ├── *.ts (define service call api to BE)
|   |   |   ├── typings.d.ts (api params type)
│   ├── hooks (custom hook handle common logic (not related to one component))
|   |   ├── use*.ts
│   ├── features (page)
|   |   |   ├── featureName (folder contain feature source code)
|   |   |   |   ├── pages (Container all component use in specific page)
|   |   |   |   |   ├── page
|   |   |   |   |   |   |-- page.tsx (page component)
|   |   |   |   |   |   |-- page.scss
|   |   |   |   ├── components (Container all component use in specific page)
|   |   |   |   |   ├── Component
|   |   |   |   |   |   ├── hook/*.ts (Custom hook to handle logic for component (may not can be reuse))
|   |   |   |   |   |   ├── Component.ts
|   |   |   |   |   |   ├── Component.scss
|   |   |   |   |   |   ├── index.ts
|   |   |   |   ├── slice.ts (state management)
|   |   |   |   ├── index.tsx (routing)
|   |   |   |   ├── typings.d.ts (state, model, params type)
|   |   ├── index.ts (Homepage)
|   |   ├── 404.ts (404 error page)
│   ├── types (general type config .d.ts file)
|   |   ├── images.d.ts (image module)
│   ├── styles (general styling)
|   |   ├── globals.css (Declare global css here)
├── public
├── package.json
├── package-lock.json
└── tsconfig.json (Config path, import and export for Next)
```
