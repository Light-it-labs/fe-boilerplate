# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, four official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [@sentry/react](https://docs.sentry.io/platforms/javascript/guides/react/) providing React-specific error boundaries and hooks for monitoring exceptions and performance issues.
- [@sentry/vite-plugin](https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/uploading/vite/) automates source map uploading for Vite-based projects, enhancing Sentry's debugging capabilities with meaningful error information.

## Sentry

Sentry is a developer-first error tracking and performance monitoring platform. Errors are logged both from the frontend and backend. In order to get it up and running, you need to follow these steps:

1. Create an account [here](https://sentry.io)
2. Create a project within an organization
3. Copy the DSN provided below "Configure SDK" and paste it in your `.env`'s `SENTRY_LARAVEL_DSN`
4. Run `npx @sentry/wizard@latest -i sourcemaps` in order to get the key for the `VITE_SENTRY_AUTH_TOKEN` `.env` variable. You can learn more about the purpose of this command [here](https://docs.sentry.io/platforms/javascript/guides/react/#add-readable-stack-traces-to-errors)
5. To confirm that everything is correctly configured, you can implement a button in your application to manually trigger an error when clicking on it. To view and address the recorded error, log into your account and open your project (which represents your service and enables scoping of events to a specific application)

**DISCLAIMER**: If you see this in your network tab, it may be due to the browser you're using. This screenshot was taken from the Arc browser, which made it seem as if something was missing, while on the Google browser the request is successful.

![Sentry request error](https://github.com/Light-it-labs/fe-boilerplate/assets/68563891/25412a77-f34d-4f00-8477-5f9fce0ee09d)


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
