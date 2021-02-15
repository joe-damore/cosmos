import Loader from '@core/lib/system/config/loader';
import Serializer from '@core/lib/system/config/serializer';
import ValidationError from '@core/lib/system/config/validation-error';
import jsonschema from 'jsonschema';

/**
 * Manages the retrieval, deserialization, and validation of read-only config.
 */
class Config {

  /**
   * Loader implementation responsible for retrieving configuration data.
   */
  private loader: Loader;

  /**
   * Serializer implementation responsible for deserializing config data.
   */
  private serializer: Serializer;

  /**
   * Configuration JSONSchema schema.
   */
  private schema: object;

  /**
   * Constructor.
   *
   * @param {Loader} loader - Configuration loader instance.
   * @param {Serializer} serializer - Configuration serializer instance.
   * @param {object} schema - Configuration schema.
   */
  constructor(loader: Loader, serializer: Serializer, schema: object) {
    this.loader = loader;
    this.serializer = serializer;
    this.schema = schema;
  }

  /**
   * Asynchronously load and validate configuration.
   *
   * Validation can optionally be skipped by setting `validate` to `false`.
   *
   * @param {boolean=} validate - Whether or not to validate configuration.
   *
   * @returns {Object} Loaded configuration data.
   */
  public async load(validate: boolean = true) : Promise<object> {
    const serializedData = await this.loader.load();
    const deserializedData = this.serializer.toObject(serializedData);

    if (validate) {
      this.validate(deserializedData);
    }

    return deserializedData;
  }

  /**
   * Synchronously load and validate configuration.
   *
   * Validation can optionally be skipped by setting `validate` to `false`.
   *
   * @param {boolean=} validate - Whether or not to validate configuration.
   *
   * @returns {Object} Loaded configuration data.
   */
  public loadSync(validate: boolean = true) : object {
    const serializedData = this.loader.loadSync();
    const deserializedData = this.serializer.toObject(serializedData);

    if (validate) {
      this.validate(deserializedData);
    }

    return deserializedData;
  }

  // TODO Document thrown `ValidationError` exception via JSDoc.
  /**
   * Validates an object against this config instance's schema.
   *
   * A `ValidationError` is thrown if validation fails.
   *
   * @param {Object} data - Object data to validate.
   */
  private validate(data: object) {
    const results = jsonschema.validate(data, this.schema);
    if (!results.valid) {
      const error = results.errors[0];
      throw new ValidationError(`Config ${error.property} ${error.message}.`);
    }
  }
}

export default Config;
