import YAML from 'yaml';

import { Serializer, SerializationError } from '@lib/system/serialization';

/**
 * Serializes and deserializes config data to and from YAML.
 */
export class YamlSerializer implements Serializer {

  /**
   * Serialize config object into YAML string.
   *
   * @throws {SerializationError} Data must be able to be serialized.
   *
   * @param {Object} data - Object to serialize.
   *
   * @returns {string} Serialized YAML string.
   */
  public toString(data: object) : string {
    try {
      return YAML.stringify(data);
    }
    catch (err) {
      throw new SerializationError('Failed to serialize configuration data to YAML');
    }
  }

  /**
   * Deserialize YAML string into object.
   *
   * @throws {SerializationError} Data must be properly formatted for YAML parser.
   *
   * @param {string} data - YAML string to deserialize.
   *
   * @returns {Object} Deserialized object.
   */
  public toObject(data: string) : object {
    try {
      return YAML.parse(data);
    }
    catch (err) {
      throw new SerializationError('Failed to deserialize configuration data from YAML');
    }
  }
}
