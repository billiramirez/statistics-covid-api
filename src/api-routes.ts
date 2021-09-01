module.exports = {
  swagger: "2.0",
  host: "localhost:4000",
  basePath: "/v1",
  info: {
    title: "Covid-19 Statistics",
    version: "3.0.0",
  },
  schemes: ["http", "https"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {
    Error: {
      additionalProperties: true,
    },
    User: {
      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
      },
      required: ["name"],
    },
    Statistics: {
      type: "object",
      required: [
        "cases",
        "deaths",
        "tests",
        "continent",
        "country",
        "population",
        "day",
        "time",
      ],
      properties: {
        cases: {
          type: "object",
          required: ["active", "recovered", "total"],
          properties: {
            active: { type: "number" },
            recovered: { type: "number" },
            total: { type: "number" },
          },
        },
        deaths: {
          type: "object",
        },
        tests: {
          type: "object",
        },
        continent: { type: "string" },
        country: { type: "string" },
        population: { type: "number" },
        day: { type: "string" },
        time: { type: "string" },
      },
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
