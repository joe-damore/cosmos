//const configSchema = {
//  library: {
//    doc: 'Media library configuration',
//    format: 'source-array',
//    default: [],
//    children: {
//      doc: 'A collection of media sources',
//      format: 'object',
//      paths: {
//        media: {
//          doc: 'Path to media files',
//          format: 'string',
//        },
//        metadata: {
//          doc: 'Path to metadata files',
//          format: 'string',
//        },
//        art: {
//          doc: 'Path to art files',
//          format: 'string',
//        },
//        saves: {
//          doc: 'Path to save files',
//          format: 'string',
//        },
//      },
//    },
//  },
//};
const configSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    a: {
      type: 'string',
      description: 'The letter A',
    },
  },
};

export default configSchema;
