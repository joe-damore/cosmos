import Serializer from '@core/lib/system/config/serializer';
import SerializationError from '@core/lib/system/config/serialization-error';

/**
 * Serialize and deserialize config data to and from JSON.
 */
class JsonSerializer implements Serializer {

  /**
   * Serialize config object into JSON string.
   *
   * @throws {SerializationError} Data must be able to be serialized.
   *
   * @param {Object} data - Object to serialize.
   *
   * @returns {string} Serialized JSON string.
   */
  public toString(data: object) : string {
    try {
      return JSON.stringify(data);
    }
    catch (err) {
      throw new SerializationError('Failed to serialize configuration data to JSON');
    }
  }

  /**
   * Deserialize JSON string into object.
   *
   * @throws {SerializationError} Data must be properly formatted for JSON parser.
   *
   * @param {string} data - JSON string to deserialize.
   *
   * @returns {Object} Deserialized object.
   */
  public toObject(data: string) : object {
    try {
      return JSON.parse(data);
    }
    catch (err) {
      throw new SerializationError('Failed to deserialize configuration data from JSON');
    }
  }
}

export default JsonSerializer;
