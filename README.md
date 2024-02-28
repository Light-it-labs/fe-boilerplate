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

**DISCLAIMERS**:

- React's error boundaries, including Sentry's integration, do not catch exceptions in event handlers. This limitation is inherent to React's error handling and not specific to Sentry. For errors in event handlers, manual error logging or alternative methods are required.

- If you see this in your network tab, it may be due to the browser you're using. This screenshot was taken from the Arc browser, which made it seem as if something was missing, while on the Google browser the request is successful.

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

## Infra and deployment

This project is by default configured to be deployed to AWS as a static site, using S3 and cloudfront. The bundle is built using `npm run build-{ENV}`, where `{ENV}` is by default either `staging` or `production`. This command will use the `.env.{ENV}` file to build the bundle to the `./dist/` folder. This folder is then synced to the S3 bucket, which is configured to serve the content as a static site.

The cloudfront distribution is configured to use the S3 bucket as its origin, and to use the `index.html` file as the default root object. A Cloudfront function will also rewrite all requests to be `/index.html` so the SPA works. The only requests that are not rewritten are the ones that the URI starts with `/assets/`, which are the static assets that are served from the S3 bucket.

A domain is required for https. A certificate must be created in the AWS Certificate Manager, and then the cloudfront distribution must be configured to use that certificate. A dns record must also be created to point to the domain to the cloudfront distribution.

### Infra

Infrastructure can easily be created by running the terraform scripts. The `./terra-local` script runs terraform on the `deployment` folder using the `local.tfvars` file.

The `local.tfvars` file is not committed to the repository, and must be created manually. The following `example.tfvars` is provided as a template, and must be updated if new variables are added to the terraform scripts.

```
project_name = "YOUR_PROJECT_NAME"
profile = "YOUR_AWS_CLI_PROFILE"
domain_name = "THE_DOMAIN_YOU_WANT_THE_SITE_TO_BE_HOSTED_AT"
certificate_arn = "THE_ARN_OF_THE_CERTIFICATE_OF_THE_DOMAIN_FOR_HTTPS"

```

For the project name, you can use any name you want. It is used to name the resources created by terraform. The profile is the name of the AWS CLI profile that will be used to create the infrastructure. This means that you must have previously configured this AWS CLI profile to use the account where you want the infrastructure to be created. The domain name is the domain that will be used to host the site, which can be configured in Route 53 or in any DNS provider. The certificate arn is the arn of the certificate created in the AWS Certificate Manager for the given domain, which must be created manually (not via terraform) before running the terraform scripts.

The infrastructure can be easily created by running `./terra-local init` and then `./terra-local apply`. The `./terra-local destroy` command can be used to destroy the infrastructure.

Infrastructure should be created once when the project is created, and shouldn't, in theory, require any updates. The `deployment/backend.tf` file contains the backend configuration for terraform. This is the place where the current state of the infrastructure is saved. By default, it is set to use the `local` backend, but it should be changed to use a remote backend, such as S3, so that the state is saved in a remote location. This is important so that the state is not lost if the local machine is lost.

S3 backend documentation:
https://developer.hashicorp.com/terraform/language/settings/backends/s3

### Deployment

After the infrastructure is created, the flow to deploy a new version of the site is as follows:

1. Run `npm run build-{ENV}` to build the bundle to the `./dist/` folder

2. Copy the `./dist/` folder to the S3 bucket using the `aws s3 sync` command.

3. Invalidate the cloudfront distribution.

These are the steps run by both github actions. Some configuration is however required for the github actions to work.

First, some env variables must be set in each github action:

```
CLOUDFRONT_DISTRIBUTION_ID
BUCKET_NAME
```

1. `CLOUDFRONT_DISTRIBUTION_ID` must be set to the cloudfront distribution id of the environment.

2. `BUCKET_NAME` must be set to the name of the bucket of the environment.

Additionally, for the aws commands to work, the github actions must have access to the aws account. This is done by creating an IAM user with the required permissions, and then creating an access key for that user. The access key must then be added to the github repository secrets with the following names:

For the staging environment:

```
STAGING_AWS_ACCESS_KEY_ID
STAGING_AWS_SECRET_ACCESS_KEY
```

For the production environment:

```
PRODUCTION_AWS_ACCESS_KEY_ID
PRODUCTION_AWS_SECRET_ACCESS_KEY
```

Both staging and production actions are configured to run only manually. This can be changed as needed.
