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
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/components/index.ts",
        templateFile: "templates/domains/components/index.ts.hbs",
      },
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
        templateFile: "templates/domains/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/sections/index.ts",
        templateFile: "templates/domains/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/queries/index.ts",
        templateFile: "templates/domains/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/screens/index.ts",
        templateFile: "templates/domains/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/api/index.ts",
        templateFile: "templates/domains/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/domains/{{kebabCase name}}/index.ts",
        templateFile: "templates/domains/index.ts.hbs",
      },
    ],
  });
}
