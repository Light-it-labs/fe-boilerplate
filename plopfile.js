export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  // Generator for creating a domain with subfolders
  plop.setGenerator("domain", {
    description: "Create a new domain",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Domain name (e.g., users):",
      },
    ],
    actions: [
      // Components
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/components/ExampleComponent/ExampleComponent.tsx",
        templateFile: "templates/domains/components/component-example.tsx.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/components/ExampleComponent/index.ts",
        templateFile: "templates/domains/components/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/components/index.ts",
        templateFile: "templates/domains/components/index.ts.hbs",
      },
      // Context
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/context/index.ts",
        templateFile: "templates/domains/context/index.ts.hbs",
      },
      // Sections
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/sections/index.ts",
        templateFile: "templates/domains/sections/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/sections/SectionExample/SectionExample.tsx",
        templateFile: "templates/domains/sections/section-example.tsx.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/sections/SectionExample/index.ts",
        templateFile: "templates/domains/sections/index.ts.hbs",
      },
      // Queries
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/queries/index.ts",
        templateFile: "templates/domains/queries/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/queries/useSomethingQueryExample.tsx",
        templateFile: "templates/domains/queries/query-example.tsx.hbs",
      },
      // Screens
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/screens/index.ts",
        templateFile: "templates/domains/screens/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/screens/ScreenExample.tsx",
        templateFile: "templates/domains/screens/screen-example.tsx.hbs",
      },
      // API
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/api/index.ts",
        templateFile: "templates/domains/api/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/api/{{kebabCase name}}.ts",
        templateFile: "templates/domains/api/example.ts.hbs",
      },
      // Domain Barrel
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/index.ts",
        templateFile: "templates/domains/domain-barrel.ts.hbs",
      },
      // Router
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/{{pascalCase name}}Router.tsx",
        templateFile: "templates/domains/router.tsx.hbs",
      },
    ],
  });
}
