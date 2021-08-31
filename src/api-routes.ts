module.exports = {
  swagger: "2.0",
  host: "statistics-covid",
  basePath: "/v1",

  info: {
    title: "Covid-19 Statistics",
    version: "3.0.0",
  },

  definitions: {
    Error: {
      additionalProperties: true,
    },
    User: {
      properties: {
        name: {
          type: "string",
        },
      },
      required: ["name"],
    },
  },

  // paths are derived from args.routes.  These are filled in by fs-routes.
  paths: {},

  // tags is optional, and is generated / sorted by the tags defined in your path
  // docs.  This API also defines 2 tags in operations: "creating" and "fooey".
  tags: [
    // {name: 'creating'} will be inserted by ./api-routes/users.js
    // {name: 'fooey'} will be inserted by ./api-routes/users/{id}.js
    { description: "Everything users", name: "users" },
  ],
};
