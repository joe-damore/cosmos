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
   * Loaded configuration object.
   */
  private data: object | null;

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
    this.data = null;
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
  public async load(validate: boolean = true) : Promise<void> {
    const serializedData = await this.loader.load();
    const deserializedData = this.serializer.toObject(serializedData);

    if (validate) {
      this.validate(deserializedData);
    }

    this.data = deserializedData;
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
  public loadSync(validate: boolean = true) : void {
    const serializedData = this.loader.loadSync();
    const deserializedData = this.serializer.toObject(serializedData);

    if (validate) {
      this.validate(deserializedData);
    }

    this.data = deserializedData;
  }

  /**
   * Gets a configuration value of any type using the given address.
   *
   * Address can be a dot-separated string or an array of dot-separated strings
   * describing the location of the data in the configuration object.
   *
   * @param {string|string[]=} address - String or array of strings describing data to retrieve.
   * @param {any} defaultData - Value to return if no data exists in configuration.
   *
   * @returns {any} Value from configuration at given address, or `defaultData`.
   */
  public getAny(address: string|Array<string>|undefined = undefined, defaultData: any = undefined) : any {
    return this.get<any>(address, defaultData);
  }

  /**
   * Gets a configuration value of a given type using the given address.
   *
   * Address can be a dot-separated string or an array of dot-separated strings
   * describing the location of the data in the configuration object.
   *
   * @template T
   * @param {T} T - Retrieved value type.
   * @param {string|string[]=} address - String or array of strings describing data to retrieve.
   * @param {T|undefined} defaultData - Value to return if no data exists in configuration.
   *
   * @returns {T} Value from configuration at given address, or `defaultData`.
   */
  public get<T>(address: string|Array<string>|undefined = undefined, defaultData: T|undefined = undefined) : T {
    if (!address) {
      return (this.data || defaultData) as T;
    }

    if (!this.data) {
      return defaultData as T;
    }

    const addressComponents = this.getAddressComponents(address);

    let current : any = this.data;
    for (const addressComponent of addressComponents) {
      if (!current.hasOwnProperty(addressComponent)) {
        return defaultData as T;
      }
      current = current[addressComponent];
    }

    return current as T;
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

  /**
   * Returns an array of property names for the given address.
   *
   * @param {string|string[]} address - Address or address components.
   *
   * @return {string[]} Array of address component strings.
   */
  private getAddressComponents(address: string|Array<string>) : Array<string> {
    const addressArray = (() : Array<string> => {
      if (!Array.isArray(address)) {
        return [address];
      }
      return address;
    })();

    const addressComponents : Array<string> = addressArray.reduce((acc: Array<string>, cur: string) => {
      const out = acc.concat(cur.split('.'));
      return out;
    }, []);

    return addressComponents;
  }
}

export default Config;
