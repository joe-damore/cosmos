const configSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    db: {
      type: 'object',
      description: 'Configuration details for Cosmos database',
      additionalProperties: false,
      properties: {
        path: {
          type: 'string',
          description: 'Path to Cosmos database file',
        },
      },
    },
  },
};

export default configSchema;
